
"use client";

import { X, Loader2 } from "lucide-react";
import type { EventItem } from "./EventCard";

type EditEventModalProps = {
    event: EventItem;
    saving: boolean;
    onChange: (field: keyof EventItem, value: string | number) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
};

const EVENT_TYPES = [
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

const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400";

const labelClass =
    "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

const EditEventModal = ({
    event,
    saving,
    onChange,
    onSubmit,
    onClose,
}: EditEventModalProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => !saving && onClose()}
        >
            <div
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Edit Event
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className={labelClass}>Event Title</label>
                        <input
                            required
                            value={event.title}
                            onChange={(e) => onChange("title", e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Event Category</label>
                        <select
                            required
                            value={event.eventType}
                            onChange={(e) => onChange("eventType", e.target.value)}
                            className={inputClass}
                        >
                            {EVENT_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            required
                            rows={4}
                            value={event.description}
                            onChange={(e) => onChange("description", e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Event Date</label>
                            <input
                                type="date"
                                required
                                value={event.eventDate}
                                onChange={(e) => onChange("eventDate", e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Event Time</label>
                            <input
                                type="time"
                                required
                                value={event.eventTime}
                                onChange={(e) => onChange("eventTime", e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Location</label>
                        <input
                            required
                            value={event.location}
                            onChange={(e) => onChange("location", e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Full Address</label>
                        <input
                            value={event.fullAddress || ""}
                            onChange={(e) => onChange("fullAddress", e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Thumbnail URL</label>
                        <input
                            type="url"
                            required
                            value={event.thumbnailUrl}
                            onChange={(e) => onChange("thumbnailUrl", e.target.value)}
                            className={inputClass}
                        />

                        {event.thumbnailUrl && (
                            <img
                                src={event.thumbnailUrl}
                                alt="Thumbnail preview"
                                className="mt-3 h-36 w-full rounded-xl object-cover"
                            />
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Volunteer Limit</label>
                            <input
                                type="number"
                                min="0"
                                value={event.volunteerLimit ?? ""}
                                onChange={(e) =>
                                    onChange("volunteerLimit", Number(e.target.value))
                                }
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Required Volunteers</label>
                            <input
                                type="number"
                                min="0"
                                value={event.requiredVolunteers ?? ""}
                                onChange={(e) =>
                                    onChange("requiredVolunteers", Number(e.target.value))
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Contact Number</label>
                        <input
                            type="tel"
                            required
                            value={event.contactNumber || ""}
                            onChange={(e) => onChange("contactNumber", e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Additional Requirements</label>
                        <textarea
                            rows={3}
                            value={event.additionalRequirements || ""}
                            onChange={(e) =>
                                onChange("additionalRequirements", e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {saving && <Loader2 size={16} className="animate-spin" />}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;
