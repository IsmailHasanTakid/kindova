
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditEventModal from "./components/EditEventModal";
import toast from "react-hot-toast";
import {
    CalendarDays,
    Heart,
    Plus,
    Users,
    X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import EventCard, { type EventItem } from "./components/EventCard";

const API_URL = "http://localhost:5000/api/events";

const ManageEventsPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

    const [saving, setSaving] = useState(false);

    // Fetch user's events
    useEffect(() => {
        if (isPending) return;

        const email = session?.user?.email;

        if (!email) {
            router.push("/login");
            return;
        }

        const fetchEvents = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/my-events?email=${encodeURIComponent(email)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();
                setEvents(Array.isArray(data) ? data : data.events || []);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [session, isPending, router]);

    // Delete event
    const handleDelete = async (id: string) => {
        const email = session?.user?.email;

        if (!email) {
            toast.error("Please login first.");
            router.push("/login");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            setDeletingId(id);

            const response = await fetch(
                `${API_URL}/${id}?email=${encodeURIComponent(email)}`,
                { method: "DELETE" }
            );
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to delete event");
            }

            setEvents((previous) => previous.filter((event) => event._id !== id));
            toast.success("Event deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete event");
        } finally {
            setDeletingId(null);
        }
    };




    // Update event
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingEvent) return;

        const email = session?.user?.email;

        if (!email) {
            toast.error("Please login first.");
            router.push("/login");
            return;
        }

        try {
            setSaving(true);

            const response = await fetch(
                `${API_URL}/${editingEvent._id}?email=${encodeURIComponent(email)}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editingEvent),
                }
            );
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to update event");
            }

            setEvents((previous) =>
                previous.map((event) =>
                    event._id === editingEvent._id
                        ? { ...event, ...editingEvent }
                        : event
                )
            );

            setEditingEvent(null);
            toast.success("Event updated successfully!");
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update event");
        } finally {
            setSaving(false);
        }
    };

    const updateField = (
        field: keyof EventItem,
        value: string | number
    ) => {
        if (!editingEvent) return;

        setEditingEvent({
            ...editingEvent,
            [field]: value,
        });
    };

    if (isPending || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                            Your Contributions
                        </p>

                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Manage Your Events
                        </h1>

                        <p className="mt-3 max-w-xl text-gray-500">
                            Every event is an opportunity to make a difference.
                            Manage your initiatives and continue spreading kindness.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/create-event")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                    >
                        <Plus size={19} />
                        Create Event
                    </button>
                </div>

                {/* Summary */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                            <CalendarDays size={24} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Total Events</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {events.length}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                            <Heart size={24} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Volunteer Opportunities
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {events.reduce(
                                    (total, event) =>
                                        total + Number(event.volunteerLimit || 0),
                                    0
                                )}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Event Cards */}
                {events.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                onView={setSelectedEvent}
                                onEdit={setEditingEvent}
                                onDelete={handleDelete}
                                deleting={deletingId === event._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Users size={30} />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            No Events Yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-gray-500">
                            Your journey of kindness starts with one small step.
                            Create your first event and inspire others to participate.
                        </p>

                        <button
                            onClick={() => router.push("/create-event")}
                            className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Create Your First Event
                        </button>
                    </div>
                )}
            </div>

            {/* View Event Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                Event Details
                            </h2>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <img
                            src={selectedEvent.thumbnailUrl}
                            alt={selectedEvent.title}
                            className="mb-5 h-56 w-full rounded-xl object-cover"
                        />

                        <h3 className="text-2xl font-bold text-gray-900">
                            {selectedEvent.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-emerald-700">
                            {selectedEvent.eventType}
                        </p>

                        <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-600">
                            {selectedEvent.description}
                        </p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <p className="text-sm text-gray-600">
                                <strong>Date:</strong> {selectedEvent.eventDate}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Time:</strong> {selectedEvent.eventTime}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Location:</strong> {selectedEvent.location}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Volunteers:</strong>{" "}
                                {selectedEvent.requiredVolunteers}/
                                {selectedEvent.volunteerLimit}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Contact:</strong>{" "}
                                {selectedEvent.contactNumber}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Status:</strong> {selectedEvent.status}
                            </p>
                        </div>

                        {selectedEvent.fullAddress && (
                            <p className="mt-4 text-sm text-gray-600">
                                <strong>Full Address:</strong>{" "}
                                {selectedEvent.fullAddress}
                            </p>
                        )}

                        {selectedEvent.additionalRequirements && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-800">
                                    Additional Requirements
                                </h4>
                                <p className="mt-1 text-sm text-gray-600">
                                    {selectedEvent.additionalRequirements}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {editingEvent && (
                <EditEventModal
                    event={editingEvent}
                    saving={saving}
                    onChange={updateField}
                    onSubmit={handleUpdate}
                    onClose={() => setEditingEvent(null)}
                />
            )}
        </main>
    );
};

export default ManageEventsPage;
