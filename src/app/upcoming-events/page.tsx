
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Plus, Search } from "lucide-react";

import CategoryTabs from "./components/CategoryTabs";
import PublicEventCard, { type PublicEvent } from "./components/PublicEventCard";
import toast from "react-hot-toast";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/events`;
const isUpcoming = (e: PublicEvent) =>
    new Date(`${e.eventDate}T${e.eventTime || "00:00"}:00+06:00`) >= new Date();
const CATEGORIES = [
    "All",
    "Blood Donation",
    "Food Distribution",
    "Education & Scholarship",
    "Medical Camp",
    "Environmental Protection",
    "Disaster Relief",
    "Social Awareness",
    "Community Development",
    "Other",
];

export default function UpcomingEventsPage() {
    const [events, setEvents] = useState<PublicEvent[]>([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchEvents = async () => {
            try {
                setIsUpdating(true);
                setError("");

                const params = new URLSearchParams({
                    status: "upcoming",
                });

                if (category !== "All") {
                    params.set("category", category);
                }

                if (search.trim()) {
                    params.set("search", search.trim());
                }
                const res = await fetch(`${API_URL}?${params}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });

                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error("Failed to load events");
                }

                setEvents(data.events.filter(isUpcoming));

            } catch (err) {
                if (controller.signal.aborted) return;

                toast.error("Events load করা যায়নি। আবার চেষ্টা করুন।");

            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                    setIsUpdating(false);
                }
            }
        };

        fetchEvents();

        return () => controller.abort();

    }, [category, search]);

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-[#080D12] sm:px-6">

            <div className="mx-auto max-w-7xl">

                {/* Hero Section */}
                <section className="mb-12 text-center">

                    <span className="mb-5 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                        MAKE A DIFFERENCE
                    </span>

                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        Discover Meaningful{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                            Events
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
                        ছোট ছোট ভালো কাজ থেকেই তৈরি হয় বড় পরিবর্তন।
                        আপনার পছন্দের উদ্যোগে যুক্ত হোন এবং মানুষের পাশে দাঁড়ান।
                    </p>

                    <Link
                        href="/create-event"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
                    >
                        <Plus size={19} />
                        Create an Event
                    </Link>

                </section>

                {/* Search */}
                <section className="mb-8">

                    <div className="mx-auto max-w-2xl">
                        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/5">

                            <Search className="text-emerald-500" size={21} />

                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                            />

                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mt-7">
                        <CategoryTabs
                            categories={CATEGORIES}
                            active={category}
                            onSelect={setCategory}
                        />
                    </div>

                </section>


                <div className="mb-7 flex items-center justify-between">

                    {events.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Upcoming Events
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Find opportunities to make a difference.
                            </p>
                        </div>
                    )}

                    <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {events.length} Events
                    </span>

                </div>


                {isUpdating && events.length > 0 && (
                    <p className="mb-3 text-right text-xs text-emerald-500">
                        Updating events...
                    </p>
                )}


                {loading && events.length === 0 && (
                    <p className="py-16 text-center text-gray-500">
                        Loading events...
                    </p>
                )}


                {!loading && error && events.length === 0 && (
                    <p className="py-16 text-center text-red-500">
                        {error}
                    </p>
                )}


                {events.length > 0 && (
                    <div
                        className={`grid gap-7 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${isUpdating ? "opacity-50" : "opacity-100"
                            }`}
                    >
                        {events.map((event) => (
                            <PublicEventCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>
                )}


                {!loading && !isUpdating && !error && events.length === 0 && (
                    <div className="py-20 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            No Events Found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            No upcoming events available right now.
                        </p>
                    </div>
                )}



            </div>
        </main >
    );
}
