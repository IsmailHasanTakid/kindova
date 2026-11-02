
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
    CalendarDays,
    MapPin,
    ArrowRight,
    Loader2,
    SearchX,
} from "lucide-react";
import EventSkeleton from "../manage-events/components/EventSkeleton";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/events`;

type Event = {
    _id: string;
    title: string;
    eventType: string;
    eventDate: string;
    eventTime: string;
    location: string;
    thumbnailUrl: string;
    status: string;
};

export default function JoinedEventsPage() {
    const { data: session, isPending } = authClient.useSession();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        const email = session?.user?.email;

        if (!email) {
            setError("Please login to see your joined events.");
            setLoading(false);
            return;
        }

        const fetchJoinedEvents = async () => {
            try {
                const { data: tokenData, error: tokenError } =
                    await authClient.token();

                if (tokenError || !tokenData?.token) {
                    throw new Error("Authentication token not found");
                }

                const res = await fetch(`${API_URL}/joined`, {
                    headers: {
                        Authorization: `Bearer ${tokenData.token}`,
                    },
                });

                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data.message || "Failed to load events");
                }

                const sortedEvents = [...data.events].sort(
                    (a, b) =>
                        new Date(a.eventDate).getTime() -
                        new Date(b.eventDate).getTime()
                );

                setEvents(sortedEvents);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [isPending, session]);

    // Loading State
    if (isPending || loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#080D0B]">
                <div className="mx-auto max-w-6xl">
                    <EventSkeleton count={6} />
                </div>
            </main>
        );
    }

    // Error State
    if (error) {
        return (
            <main className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 text-center transition-colors duration-300 dark:bg-[#080D0B]">
                <p className="text-red-500 dark:text-red-400">
                    {error}
                </p>

                <Link
                    href="/login"
                    className="mt-4 font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                    Login
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-[#080D0B] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Joined Events
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Events you have joined and are participating in.
                    </p>
                </div>

                {events.length === 0 ? (

                    /* Empty State */
                    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white text-center transition-colors duration-300 dark:border-white/10 dark:bg-[#101A16]">
                        <SearchX size={42} className="text-gray-400" />

                        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                            No Joined Events
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            You haven't joined any events yet.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                        >
                            Explore Events
                        </Link>
                    </div>

                ) : (

                    /* Joined Events */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#101A16] dark:hover:border-emerald-500/30"
                            >
                                <div className="h-48 overflow-hidden bg-gray-100 dark:bg-white/5">
                                    <img
                                        src={event.thumbnailUrl}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>

                                <div className="p-5">
                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                        {event.eventType}
                                    </span>

                                    <h2 className="mt-4 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h2>

                                    <div className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <CalendarDays
                                                size={16}
                                                className="shrink-0 text-emerald-500"
                                            />

                                            {event.eventDate} · {event.eventTime}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <MapPin
                                                size={16}
                                                className="shrink-0 text-emerald-500"
                                            />

                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>
                                        </p>
                                    </div>

                                    <Link
                                        href={`/events/${event._id}`}
                                        className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                                    >
                                        View Details
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}
