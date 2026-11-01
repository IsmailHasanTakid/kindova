
"use client";

import { useState } from "react";
import {
    CalendarDays,
    MapPin,
    ImagePlus,
    Users,
    HeartHandshake,
    Clock,
    Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function CreateEventPage() {
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");
    const { data: session } = authClient.useSession();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDate = [
        tomorrow.getFullYear(),
        String(tomorrow.getMonth() + 1).padStart(2, "0"),
        String(tomorrow.getDate()).padStart(2, "0"),
    ].join("-");

    const inputClass =
        "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500";

    const labelClass =
        "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300";

    const sectionClass =
        "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session?.user) {
            setMessage("Please login to create an event.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const selectedDate = String(formData.get("eventDate") || "");

        if (selectedDate < minDate) {
            setMessage("Please select a future event date.");
            setMessageType("error");
            setLoading(false);
            return;
        }

        const eventData = {
            title: formData.get("title"),
            eventType: formData.get("eventType"),
            description: formData.get("description"),
            eventDate: selectedDate,
            eventTime: formData.get("eventTime"),
            location: formData.get("location"),
            fullAddress: formData.get("fullAddress"),
            thumbnailUrl: formData.get("thumbnailUrl"),
            volunteerLimit: Number(formData.get("volunteerLimit")) || null,
            requiredVolunteers: Number(formData.get("requiredVolunteers")) || null,
            contactNumber: formData.get("contactNumber"),
            additionalRequirements: formData.get("additionalRequirements"),
            creatorEmail: session.user.email,
            creatorName: session.user.name,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to create event");
            }

            setMessage("Your event has been created successfully!");
            setMessageType("success");

            form.reset();
            setThumbnailUrl("");
            setEventDate("");

        } catch (error) {
            console.error("Event Creation Error:", error);

            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );

            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        Make a Difference with Kindova
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                        Create Something{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                            Meaningful.
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                        Start a humanitarian initiative, bring people
                        together, and create a positive impact in your community.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* Event Form */}
                    <form onSubmit={handleSubmit} className="space-y-7">

                        {/* Basic Information */}
                        <section className={sectionClass}>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <HeartHandshake size={22} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">Basic Information</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Tell people about your initiative.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className={labelClass}>Event Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Winter Clothes Distribution"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Event Type *</label>
                                    <select
                                        name="eventType"
                                        className={inputClass}
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>Select event category</option>
                                        <option value="Blood Donation">Blood Donation</option>
                                        <option value="Food Distribution">Food Distribution</option>
                                        <option value="Education & Scholarship">Education & Scholarship</option>
                                        <option value="Medical Camp">Medical Camp</option>
                                        <option value="Environmental Protection">Environmental Protection</option>
                                        <option value="Disaster Relief">Disaster Relief</option>
                                        <option value="Social Awareness">Social Awareness</option>
                                        <option value="Community Development">Community Development</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Event Description *</label>
                                    <textarea
                                        name="description"
                                        rows={5}
                                        placeholder="Describe your event, its purpose and how it will help people..."
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Date and Location */}
                        <section className={sectionClass}>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-teal-50 p-3 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                                    <CalendarDays size={22} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">Date & Location</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        When and where will it happen?
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Event Date *</label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        min={minDate}
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                                        Only future dates are allowed.
                                    </p>
                                </div>

                                <div>
                                    <label className={labelClass}>Event Time *</label>
                                    <input
                                        type="time"
                                        name="eventTime"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Event Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Mirpur, Dhaka"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Full Address</label>
                                    <textarea
                                        name="fullAddress"
                                        rows={2}
                                        placeholder="Enter complete event address..."
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Thumbnail */}
                        <section className={sectionClass}>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                    <ImagePlus size={22} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">Event Thumbnail</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Add an image to represent your event.
                                    </p>
                                </div>
                            </div>

                            <label className={labelClass}>Thumbnail Image URL *</label>

                            <input
                                type="url"
                                name="thumbnailUrl"
                                value={thumbnailUrl}
                                onChange={(e) => setThumbnailUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className={inputClass}
                                required
                            />

                            {thumbnailUrl && (
                                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                    <img
                                        src={thumbnailUrl}
                                        alt="Event thumbnail preview"
                                        className="h-52 w-full object-cover"
                                    />
                                </div>
                            )}
                        </section>

                        {/* Volunteer Information */}
                        <section className={sectionClass}>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-orange-50 p-3 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">Volunteer Information</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Let people know how they can participate.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Volunteer Limit</label>
                                    <input
                                        type="number"
                                        name="volunteerLimit"
                                        min="1"
                                        placeholder="e.g. 50"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Required Volunteers</label>
                                    <input
                                        type="number"
                                        name="requiredVolunteers"
                                        min="1"
                                        placeholder="e.g. 20"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Contact Number *</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        placeholder="01XXXXXXXXX"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>Additional Requirements</label>
                                    <textarea
                                        name="additionalRequirements"
                                        rows={3}
                                        placeholder="What should volunteers bring or know?"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Submit */}
                        {message && (
                            <div
                                className={`rounded-xl border p-4 text-sm ${messageType === "success"
                                    ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                    : "border-red-500/30 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <HeartHandshake size={20} />
                            {loading ? "Creating Event..." : "Create Event"}
                        </button>

                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                            Your event will be submitted for review.
                        </p>
                    </form>

                    {/* Preview Sidebar */}
                    <aside className={`${sectionClass} h-fit lg:sticky lg:top-8`}>
                        <div className="mb-5 flex items-center gap-2">
                            <Sparkles className="text-emerald-600 dark:text-emerald-400" size={20} />
                            <h2 className="font-bold">Event Preview</h2>
                        </div>

                        {thumbnailUrl ? (
                            <img
                                src={thumbnailUrl}
                                alt="Event preview"
                                className="h-48 w-full rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                <ImagePlus size={35} />
                                <span className="text-xs">
                                    Your thumbnail will appear here
                                </span>
                            </div>
                        )}

                        <div className="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <CalendarDays size={17} className="text-emerald-600 dark:text-emerald-400" />
                                {eventDate || "Event date"}
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={17} className="text-emerald-600 dark:text-emerald-400" />
                                Event location
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock size={17} className="text-emerald-600 dark:text-emerald-400" />
                                Event time
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-50 p-4 dark:bg-emerald-500/10">
                            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                                Every action matters!
                            </p>

                            <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-400">
                                Your initiative could change someone's life.
                                Thank you for making a difference.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
