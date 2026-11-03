"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    MapPin,
    Users,
    Phone,
    UserRound,
    ClipboardList,
    Loader2,
    SearchX,
    Navigation,
    Timer,
    History,
    Heart,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type EventDetails = {
    _id: string;
    title: string;
    eventType: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
    fullAddress?: string;
    thumbnailUrl: string;
    volunteerLimit?: number | null;
    requiredVolunteers?: number | null;
    contactNumber?: string;
    additionalRequirements?: string;
    creatorName?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    joinedUsers?: {
        email: string;
        name: string;
        image?: string;
        joinedAt: string;
    }[];
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/events`;

const taglines: Record<string, string> = {
    "Blood Donation": "একফোঁটা রক্ত, একটি জীবনের আশা।",
    "Food Distribution": "একটি খাবার, একটি হাসির কারণ হতে পারে।",
    "Education & Scholarship": "শিক্ষার আলোয় আলোকিত হোক প্রতিটি শিশু।",
    "Medical Camp": "সুস্থতা হোক সবার অধিকার।",
    "Environmental Protection": "সবুজ পৃথিবী, আমাদের আগামীর উপহার।",
    "Disaster Relief": "বিপদের দিনে পাশে থাকাই মানবতা।",
    "Social Awareness": "সচেতন সমাজ, সুন্দর আগামী।",
    "Community Development": "একসাথে গড়ি, একসাথে বাড়ি।",
    Other: "ছোট একটি উদ্যোগ, বড় একটি পরিবর্তনের শুরু।",
};

const statusStyle = (status: string) => {
    switch (status) {
        case "approved":
            return "bg-emerald-500 text-white";
        case "rejected":
            return "bg-red-500 text-white";
        default:
            return "bg-amber-400 text-gray-900";
    }
};

const formatFullDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", });
};


const formatTime = (timeStr: string) => {
    const [h, m] = (timeStr || "").split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return timeStr;
    const suffix = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
};

const formatShortDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getCountdown = (dateStr: string) => {
    const target = new Date(`${dateStr}T00:00:00`);
    if (isNaN(target.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = Math.round((target.getTime() - today.getTime()) / 86400000);

    if (diff < 0) return { text: "Event ended", tone: "ended" as const };
    if (diff === 0) return { text: "Happening today", tone: "today" as const };
    if (diff === 1) return { text: "Tomorrow", tone: "soon" as const };
    return { text: `${diff} days left`, tone: "soon" as const };
};

const cardClass =
    "rounded-3xl border border-gray-200 p-5 dark:border-white/10 sm:p-6";

function EventDetailsContent() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [isOwner, setIsOwner] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [joining, setJoining] = useState(false);
    const [joinMessage, setJoinMessage] = useState("");
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError("");

                const email = session?.user?.email || "";

                const res = await fetch(
                    `${API_URL}/${id}?email=${encodeURIComponent(email)}`
                );
                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data.message || "Event not found");
                }

                setEvent(data.event);
                setIsOwner(data.isOwner);

                setIsJoined(
                    data.event.joinedUsers?.some(
                        (user: NonNullable<EventDetails["joinedUsers"]>[number]) =>
                            user.email === email
                    ) || false
                );
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, session?.user?.email]);




    // leave korar jonno 
    const handleJoinLeave = async () => {
        if (!session?.user) {
            router.push("/login");
            return;
        }

        try {
            setJoining(true);
            setJoinMessage("");

            const { data: tokenData, error: tokenError } = await authClient.token();

            if (tokenError || !tokenData?.token) {
                throw new Error("Authentication token not found. Please login again.");
            }

            const res = await fetch(
                `${API_URL}/${id}/${isJoined ? "leave" : "join"}`,
                {
                    method: isJoined ? "DELETE" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Something went wrong");
            }

            setIsJoined(!isJoined);
            setJoinMessage(data.message);

        } catch (error) {
            setJoinMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setJoining(false);
        }
    };

    // Loading
    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                <Loader2 className="animate-spin" size={22} />
                Loading event details...
            </main>
        );
    }

    // Error / Not found
    if (error || !event) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 rounded-2xl border border-red-500/30 p-4 text-red-500">
                    <SearchX size={32} />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Event not found
                </h1>
                <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                    {error || "এই event-টি মুছে ফেলা হয়েছে বা link-টি ভুল।"}
                </p>
                <Link
                    href="/upcoming-events"
                    className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    Browse Events
                </Link>
            </main>
        );
    }

    const tagline = taglines[event.eventType] ?? taglines.Other;
    const countdown = getCountdown(event.eventDate);

    const required = Number(event.requiredVolunteers) || 0;
    const limit = Number(event.volunteerLimit) || 0;
    const percent = limit > 0 ? Math.min((required / limit) * 100, 100) : 0;

    const mapQuery = encodeURIComponent(event.fullAddress || event.location);
    const wasUpdated = event.updatedAt && event.createdAt &&
        formatShortDate(event.updatedAt) !== formatShortDate(event.createdAt);

    const infoItems = [
        { icon: CalendarDays, label: "Date", value: formatFullDate(event.eventDate) },
        { icon: Clock, label: "Time", value: formatTime(event.eventTime) },
        { icon: MapPin, label: "Location", value: event.location },
        { icon: UserRound, label: "Organizer", value: event.creatorName || "Kindova Member" },
    ];

    return (
        <main className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-6xl">


                <button
                    onClick={() => router.back()}
                    className="mb-5 inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:text-gray-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>


                <div className="relative h-80 overflow-hidden rounded-3xl sm:h-96 lg:h-[32rem]">
                    <img
                        src={event.thumbnailUrl}
                        alt={event.title}
                        className="h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur sm:left-6 sm:top-6">
                        {event.eventType}
                    </span>

                    <span
                        className={`absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize sm:right-6 sm:top-6 ${statusStyle(event.status)}`}
                    >
                        {event.status}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                        <h1 className="text-2xl font-extrabold capitalize leading-tight text-white drop-shadow sm:text-4xl">
                            {event.title}
                        </h1>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/85">
                            <MapPin size={15} className="shrink-0 text-emerald-300" />
                            {event.location}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">


                    <div className="space-y-6">

                        {!isOwner && (
                            <section className={cardClass}>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Join This Event
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Be a part of this initiative and make a difference.
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleJoinLeave}
                                        disabled={joining}
                                        className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${isJoined
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                                            }`}
                                    >
                                        {joining ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Heart size={18} />
                                        )}

                                        {joining
                                            ? "Please wait..."
                                            : isJoined
                                                ? "Leave Event"
                                                : "Join Event"}
                                    </button>
                                </div>

                                {joinMessage && (
                                    <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
                                        {joinMessage}
                                    </p>
                                )}
                            </section>
                        )}
                        <p className="border-l-4 border-emerald-500 py-1 pl-4 text-sm italic leading-7 text-emerald-600 dark:text-emerald-300">
                            “{tagline}”
                        </p>


                        <section className={cardClass}>
                            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                                About this event
                            </h2>
                            <p className="whitespace-pre-line text-sm leading-8 text-gray-600 dark:text-gray-400 sm:text-base">
                                {event.description}
                            </p>
                        </section>

                        <section className={cardClass}>
                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                <MapPin size={19} className="text-emerald-500" />
                                Venue
                            </h2>

                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {event.location}
                            </p>
                            {event.fullAddress && (
                                <p className="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                    {event.fullAddress}
                                </p>
                            )}

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-500 hover:text-white dark:text-emerald-400"
                            >
                                <Navigation size={16} />
                                View on Google Maps
                            </a>
                        </section>
                        {event.additionalRequirements && (
                            <section className={cardClass}>
                                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                    <ClipboardList size={19} className="text-emerald-500" />
                                    What to bring / know
                                </h2>
                                <p className="whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-400">
                                    {event.additionalRequirements}
                                </p>
                            </section>
                        )}
                    </div>
                    <aside className="h-fit space-y-5 lg:sticky lg:top-28">
                        {countdown && (
                            <div
                                className={`flex items-center gap-3 rounded-2xl border p-4 ${countdown.tone === "ended"
                                    ? "border-gray-300 text-gray-500 dark:border-white/10 dark:text-gray-400"
                                    : "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                                    }`}
                            >
                                <Timer size={22} />
                                <div>
                                    <p className="text-xs opacity-70">Event status</p>
                                    <p className="text-base font-bold">{countdown.text}</p>
                                </div>
                            </div>
                        )}
                        <div className={cardClass}>
                            <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                                Event Information
                            </h2>

                            <div className="space-y-4">
                                {infoItems.map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                                            <Icon size={17} />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {label}
                                            </p>
                                            <p className="break-words text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cardClass}>
                            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                <Users size={18} className="text-emerald-500" />
                                Volunteers
                            </h2>

                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div className="rounded-2xl border border-gray-200 p-3 dark:border-white/10">
                                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                                        {event.requiredVolunteers ?? "N/A"}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Needed
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-gray-200 p-3 dark:border-white/10">
                                    <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                        {event.volunteerLimit ?? "N/A"}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Max limit
                                    </p>
                                </div>
                            </div>

                            {limit > 0 && (
                                <div className="mt-4">
                                    <div className="h-2 overflow-hidden rounded-full border border-gray-200 dark:border-white/10">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        {required} of {limit} volunteer spots
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={cardClass}>
                            <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                Contact
                            </h2>
                            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                                <Phone size={16} className="text-emerald-500" />
                                {event.contactNumber || "N/A"}
                            </p>

                            {event.contactNumber && (
                                <a
                                    href={`tel:${event.contactNumber}`}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
                                >
                                    <Phone size={16} />
                                    Call Organizer
                                </a>
                            )}
                        </div>
                        {(event.createdAt || wasUpdated) && (
                            <div className="space-y-1.5 px-1 text-xs text-gray-500 dark:text-gray-400">
                                {event.createdAt && (
                                    <p className="flex items-center gap-2">
                                        <History size={13} />
                                        Posted on {formatShortDate(event.createdAt)}
                                    </p>
                                )}
                                {wasUpdated && (
                                    <p className="flex items-center gap-2">
                                        <History size={13} />
                                        Updated on {formatShortDate(event.updatedAt)}
                                    </p>
                                )}
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default function EventDetailsPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[70vh] items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                    <Loader2 className="animate-spin" size={22} />
                    Loading event details...
                </main>
            }
        >
            <EventDetailsContent />
        </Suspense>
    );
}