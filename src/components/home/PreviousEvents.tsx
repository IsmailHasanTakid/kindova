
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Clock,
    MapPin,
} from "lucide-react";

type PreviousEvent = {
    _id: string;
    title: string;
    eventType: string;
    eventDate: string;
    eventTime: string;
    location: string;
    thumbnailUrl: string;
};

const API_URL = "http://localhost:5000/api/events/previous";

export default function PreviousEvents() {
    const [events, setEvents] = useState<PreviousEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreviousEvents = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data.success) {
                    setEvents(data.events);
                }
            } catch (error) {
                console.error("Failed to fetch previous events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreviousEvents();
    }, []);

    if (loading) {
        return (
            <section className="py-20 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Loading previous events...
                </p>
            </section>
        );
    }

    if (events.length === 0) return null;

    return (
        <section className="px-5 py-20 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-emerald-600 dark:text-emerald-400">
                        Our Journey
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Every Action Leaves a{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                            Lasting Impact
                        </span>
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                        Every event tells a story of kindness, compassion, and togetherness.
                        Take a look back at the moments when our community came together
                        to make a difference.
                    </p>
                </div>

                {/* Event Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Link
                            href={`/events/${event._id}`}
                            key={event._id}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/40"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={event.thumbnailUrl}
                                    alt={event.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                <span className="absolute bottom-4 left-4 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-md dark:text-emerald-300">
                                    {event.eventType}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="mb-4 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                                    {event.title}
                                </h3>

                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <p className="flex items-center gap-2">
                                        <CalendarDays
                                            size={16}
                                            className="shrink-0 text-emerald-600 dark:text-emerald-400"
                                        />
                                        {event.eventDate}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Clock
                                            size={16}
                                            className="shrink-0 text-emerald-600 dark:text-emerald-400"
                                        />
                                        {event.eventTime}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <MapPin
                                            size={16}
                                            className="shrink-0 text-emerald-600 dark:text-emerald-400"
                                        />
                                        <span className="line-clamp-1">
                                            {event.location}
                                        </span>
                                    </p>
                                </div>

                                {/* View Details */}
                                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 py-3 text-sm font-semibold text-emerald-700 transition group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400">
                                    View Details <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
