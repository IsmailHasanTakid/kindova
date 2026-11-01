import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";

export type PublicEvent = {
    _id: string;
    title: string;
    eventType: string;
    eventDate: string;
    eventTime: string;
    location: string;
    thumbnailUrl: string;
    requiredVolunteers?: number | null;
    volunteerLimit?: number | null;
};

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


const formatDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    if (isNaN(d.getTime())) return { day: "--", month: "---", year: "" };
    return {
        day: String(d.getDate()).padStart(2, "0"),
        month: d.toLocaleString("en-US", { month: "short" }),
        year: String(d.getFullYear()),
    };
};


const formatTime = (timeStr: string) => {
    const [h, m] = (timeStr || "").split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return timeStr;
    const suffix = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
};


const getDaysLeft = (dateStr: string) => {
    const target = new Date(`${dateStr}T00:00:00`);
    if (isNaN(target.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = Math.round((target.getTime() - today.getTime()) / 86400000);

    if (diff < 0) return "Ended";
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `${diff} days left`;
};

const PublicEventCard = ({ event }: { event: PublicEvent }) => {
    const { day, month, year } = formatDate(event.eventDate);
    const daysLeft = getDaysLeft(event.eventDate);
    const tagline = taglines[event.eventType] ?? taglines.Other;

    return (
        <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-white/10">

            <Link
                href={`/events/${event._id}`}
                className="relative block h-52 overflow-hidden"
            >
                <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />


                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur">
                    {event.eventType}
                </span>

                {daysLeft && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                        {daysLeft}
                    </span>
                )}


                <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-2xl bg-white/15 px-3 py-2 ring-1 ring-white/20 backdrop-blur-md">
                    <div className="text-center leading-none">
                        <p className="text-2xl font-extrabold text-white">{day}</p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                            {month}
                        </p>
                    </div>
                    <div className="h-8 w-px bg-white/30" />
                    <div className="text-xs leading-5 text-white/90">
                        <p className="font-semibold">{year}</p>
                        <p className="flex items-center gap-1">
                            <Clock size={11} /> {formatTime(event.eventTime)}
                        </p>
                    </div>
                </div>
            </Link>


            <div className="flex flex-1 flex-col p-5">
                <h2 className="line-clamp-2 text-lg font-bold capitalize leading-snug text-gray-900 dark:text-white">
                    {event.title}
                </h2>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={15} className="shrink-0 text-emerald-500" />
                    <span className="truncate">{event.location}</span>
                </p>

                <p className="mb-5 mt-4 border-l-2 border-emerald-500/60 py-1 pl-3 text-xs italic leading-6 text-emerald-600 dark:text-emerald-300/80">
                    “{tagline}”
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-white/10">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Users size={15} className="text-emerald-500" />
                        {event.requiredVolunteers
                            ? `${event.requiredVolunteers} volunteers needed`
                            : "Volunteers welcome"}
                    </span>

                    <Link
                        href={`/events/${event._id}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition hover:-translate-y-0.5"
                    >
                        View Details
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PublicEventCard;