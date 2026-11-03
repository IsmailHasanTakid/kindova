
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    MapPin,
    Users,
    Clock,
    Sparkles,
    MoveUpRight,
} from "lucide-react";

// Event Type
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

type EventMetaProps = {
    event: EventType;
    light?: boolean;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/events/recent`;

const taglines: Record<string, string> = {
    Environment: "Protect nature, create a greener future.",
    Education: "Empower minds and inspire future generations.",
    Health: "Make a difference in someone's life.",
    Charity: "Small acts of kindness create big changes.",
    Social: "Bring people together for a better tomorrow.",
};

export default function RecentEvents() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();

                if (data.success) {
                    const sortedEvents = [...data.events].sort(
                        (a: EventType, b: EventType) =>
                            a.eventDate.localeCompare(b.eventDate) ||
                            (a.eventTime || "").localeCompare(
                                b.eventTime || ""
                            )
                    );

                    setEvents(sortedEvents.slice(0, 6));
                }
            } catch (error) {
                console.error("Failed to load recent events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (date: string) => {
        if (!date) return "Date TBA";

        const [year, month, day] = date.split("-");

        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getTagline = (type: string) => {
        return taglines[type] || "Join us and make a positive impact.";
    };

    // Event Information
    const EventMeta = ({ event, light = false }: EventMetaProps) => (
        <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs ${light
                ? "text-white/80"
                : "text-gray-500 dark:text-gray-400"
                }`}
        >
            <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                {formatDate(event.eventDate)}
            </span>

            <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {event.eventTime || "Time TBA"}
            </span>

            <span className="flex min-w-0 items-center gap-1.5">
                <MapPin size={14} />
                <span className="line-clamp-1">{event.location}</span>
            </span>
        </div>
    );

    // Featured Event
    const FeaturedCard = ({ event }: { event: EventType }) => (
        <Link
            href={`/events/${event._id}`}
            className="group relative block min-h-[440px] overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-white/10 dark:bg-gray-900"
        >
            <img
                src={event.thumbnailUrl || "/images/event-placeholder.jpg"}
                alt={event.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />

            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                {event.eventType}
            </span>

            <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-950">
                <Sparkles size={12} />
                Featured Event
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-emerald-300">
                    {getTagline(event.eventType)}
                </p>

                <h3 className="max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {event.title}
                </h3>

                <p className="mt-4 max-w-xl line-clamp-2 text-sm leading-6 text-white/75">
                    {event.description || getTagline(event.eventType)}
                </p>

                <div className="mt-5">
                    <EventMeta event={event} light />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Users size={17} className="text-emerald-300" />
                        {event.volunteerLimit || "Unlimited"} Volunteer Slots
                    </div>

                    <span className="group/btn flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-gray-950 transition group-hover:bg-emerald-300">
                        View Event Details
                        <ArrowRight
                            size={17}
                            className="transition group-hover:translate-x-1"
                        />
                    </span>
                </div>
            </div>
        </Link>
    );

    // Side Event
    const SideCard = ({ event }: { event: EventType }) => (
        <Link
            href={`/events/${event._id}`}
            className="group flex min-h-[190px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.03]"
        >
            <div className="relative w-[38%] shrink-0 overflow-hidden">
                <img
                    src={event.thumbnailUrl || "/images/event-placeholder.jpg"}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute bottom-3 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    {event.eventType}
                </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                    {formatDate(event.eventDate)}
                </p>

                <h3 className="line-clamp-2 text-base font-bold text-gray-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {event.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin size={13} className="shrink-0 text-emerald-500" />
                    <span className="line-clamp-1">{event.location}</span>
                </p>

                <span className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 transition group-hover:gap-2 dark:text-emerald-400">
                    View Details
                    <ArrowRight size={14} />
                </span>
            </div>
        </Link>
    );

    // Bottom Event
    const BottomCard = ({ event }: { event: EventType }) => (
        <Link
            href={`/events/${event._id}`}
            className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.03]"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.thumbnailUrl || "/images/event-placeholder.jpg"}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {event.eventType}
                </span>

                <span className="absolute right-4 top-4 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-900 shadow-lg">
                    {formatDate(event.eventDate)}
                </span>
            </div>

            <div className="p-5">
                <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {event.title}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    {event.description || getTagline(event.eventType)}
                </p>

                <div className="mt-5 border-t border-gray-100 pt-4 dark:border-white/10">
                    <EventMeta event={event} />

                    <span className="mt-5 flex items-center justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        View Event Details
                        <MoveUpRight
                            size={17}
                            className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <section className="relative bg-white px-5 py-20 transition-colors duration-300 dark:bg-gray-950 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Sparkles size={16} className="text-emerald-500" />

                            <span className="text-xs font-bold uppercase tracking-[3px] text-emerald-600 dark:text-emerald-400">
                                Make An Impact
                            </span>
                        </div>

                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                            Discover{" "}
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                                Recent Events
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
                            Be part of something meaningful. Explore upcoming
                            opportunities and make a difference together.
                        </p>
                    </div>

                    <Link
                        href="/explore"
                        className="group flex w-fit items-center gap-2 rounded-xl border border-emerald-500/30 px-5 py-3 text-sm font-bold text-emerald-600 transition hover:bg-emerald-500 hover:text-white dark:border-emerald-400/30 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white"
                    >
                        Explore All Events
                        <ArrowRight
                            size={17}
                            className="transition group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid gap-5 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"
                            />
                        ))}
                    </div>
                ) : events.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 py-16 text-center dark:border-white/10">
                        <CalendarDays
                            className="mx-auto mb-4 text-emerald-500"
                            size={36}
                        />

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            No Upcoming Events
                        </h3>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            New events will appear here when available.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Featured + Side Events */}
                        <div className="grid gap-5 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <FeaturedCard event={events[0]} />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                                {events.slice(1, 3).map((event) => (
                                    <SideCard
                                        key={event._id}
                                        event={event}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom Three Events */}
                        {events.length > 3 && (
                            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {events.slice(3, 6).map((event) => (
                                    <BottomCard
                                        key={event._id}
                                        event={event}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
