
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays, Clock, MapPin, Search, Compass, CalendarCheck, History, X,
} from "lucide-react";
type EventType = {
    _id: string;
    title: string;
    eventType: string;
    description?: string;
    eventDate: string;
    eventTime?: string;
    location: string;
    thumbnailUrl?: string;
    volunteerLimit?: number | null;
};

type FilterType = "all" | "upcoming" | "previous";

const API_URL = "http://localhost:5000/api/events";

const filters = [
    { id: "all", label: "All Events", icon: Compass },
    { id: "upcoming", label: "Upcoming", icon: CalendarCheck },
    { id: "previous", label: "Previous", icon: History },
] as const;

const getToday = () =>
    new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dhaka",
    }).format(new Date());

const formatDate = (date: string) => {
    if (!date) return "Date TBA";

    const [year, month, day] = date.split("-");

    return new Date(+year, +month - 1, +day).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "short", year: "numeric" }
    );
};

function ExplorePage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState<FilterType>("all");
    const [search, setSearch] = useState("");

    const today = getToday();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error("Failed to load events");
                }

                setEvents(data.events);
            } catch (error) {
                console.error("Events fetch error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const upcoming = events
        .filter((event) => event.eventDate >= today)
        .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

    const previous = events
        .filter((event) => event.eventDate < today)
        .sort((a, b) => b.eventDate.localeCompare(a.eventDate));

    const selected =
        filter === "upcoming"
            ? upcoming
            : filter === "previous"
                ? previous
                : [...upcoming, ...previous];

    const filteredEvents = selected.filter((event) =>
        [event.title, event.eventType, event.location, event.description]
            .some((value) => value?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <main className="min-h-screen bg-gray-50 px-5 pb-20 pt-12 dark:bg-[#080D0B] sm:px-8">

            {/* Header */}
            <section className="mx-auto mb-12 max-w-7xl rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 dark:from-[#10251E] dark:to-[#0D1915] sm:p-12">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Kindova Community
                </p>

                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    Discover Events.
                    <span className="block text-emerald-500">
                        Make An Impact.
                    </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                    Explore meaningful events, connect with people and
                    become part of something bigger.
                </p>

                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    {events.length} Total Events · {upcoming.length} Upcoming
                    · {previous.length} Completed
                </p>
            </section>

            {/* Events */}
            <section className="mx-auto max-w-7xl">

                <div className="mb-7">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Explore <span className="text-emerald-500">Events</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Find events and make a difference.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {filters.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setFilter(id)}
                                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${filter === id
                                    ? "bg-emerald-500 text-white"
                                    : "border border-gray-200 bg-white text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:max-w-sm">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search events..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-gray-900 outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                aria-label="Clear search"
                            >
                                <X size={17} />
                            </button>
                        )}
                    </div>
                </div>

                <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredEvents.length} events
                </p>

                {/* Event List */}
                {loading ? (
                    <p className="py-20 text-center text-gray-500">
                        Loading events...
                    </p>
                ) : error ? (
                    <p className="py-20 text-center text-red-500">
                        Unable to load events. Please try again.
                    </p>
                ) : filteredEvents.length === 0 ? (
                    <p className="py-20 text-center text-gray-500 dark:text-gray-400">
                        No events found.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => {
                            const isUpcoming = event.eventDate >= today;

                            return (
                                <Link
                                    key={event._id}
                                    href={`/events/${event._id}`}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-emerald-400 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="relative h-52">
                                        <img
                                            src={event.thumbnailUrl || "/images/event-placeholder.jpg"}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                                            {event.eventType}
                                        </span>

                                        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${isUpcoming
                                            ? "bg-emerald-400 text-gray-950"
                                            : "bg-gray-800 text-white"
                                            }`}>
                                            {isUpcoming ? "Upcoming" : "Previous"}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <p className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                            <CalendarDays size={15} />
                                            {formatDate(event.eventDate)}
                                        </p>

                                        <h3 className="mt-3 line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-emerald-600 dark:text-white">
                                            {event.title}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                            {event.description || "Join us and make a difference."}
                                        </p>

                                        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
                                            <p className="flex items-center gap-2">
                                                <Clock size={15} />
                                                {event.eventTime || "Time TBA"}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <MapPin size={15} />
                                                {event.location}
                                            </p>

                                            <p className="text-emerald-600 dark:text-emerald-400">
                                                Explore Event →
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

export default ExplorePage;
