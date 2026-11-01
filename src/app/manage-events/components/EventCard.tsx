
import {
    CalendarDays,
    Clock,
    MapPin,
    Users,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export type EventItem = {
    _id: string;
    title: string;
    eventType: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
    fullAddress?: string;
    thumbnailUrl: string;
    volunteerLimit: number;
    requiredVolunteers: number;
    contactNumber: string;
    additionalRequirements?: string;
    status: string;
};

type EventCardProps = {
    event: EventItem;
    onEdit: (event: EventItem) => void;
    onDelete: (id: string) => void;
    deleting: boolean;
};

const categoryTaglines: Record<string, string> = {
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

const EventCard = ({ event, onEdit, onDelete, deleting, }: EventCardProps) => {

    const router = useRouter();
    const tagline =
        categoryTaglines[event.eventType] ||
        "মানবতার সেবায় এগিয়ে আসুন।";

    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={event.thumbnailUrl || "/images/event-placeholder.jpg"}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                        {event.eventType}
                    </span>
                </div>

                <div className="absolute right-3 top-3">
                    <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${event.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : event.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                    >
                        {event.status || "Active"}
                    </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                    <CalendarDays size={14} />
                    {event.eventDate}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                    {event.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={15} className="shrink-0 text-emerald-600" />
                    <span className="line-clamp-1">{event.location}</span>
                </div>

                <p className="mt-4 min-h-10 text-sm leading-6 text-emerald-700">
                    {tagline}
                </p>

                {/* Event Information */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={14} />
                            Event Time
                        </div>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            {event.eventTime}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users size={14} />
                            Volunteers
                        </div>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                            {event.requiredVolunteers}/{event.volunteerLimit}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                    <button
                        onClick={() => router.push(`/events/${event._id}`)}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        <Eye size={15} />
                        View
                    </button>

                    <button
                        onClick={() => onEdit(event)}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
                    >
                        <Pencil size={15} />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(event._id)}
                        disabled={deleting}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

export default EventCard;
