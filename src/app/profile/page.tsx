
"use client";
import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
    UserRound,
    CalendarPlus,
    CalendarCheck,
    Users,
    MapPin,
    Mail,
    Pencil,
    ArrowRight,
    Loader2,
    Phone,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:5000";

type EventData = {
    _id: string;
    title: string;
};

export default function MyProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [createdEvents, setCreatedEvents] = useState<EventData[]>([]);
    const [joinedEvents, setJoinedEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        phoneNumber: "",
        location: "",
        bio: "",
    });

    // Load user information
    useEffect(() => {
        if (!user) return;

        setFormData({
            name: user.name || "",
            phoneNumber: user.phoneNumber || "",
            location: user.location || "",
            image: user.image || "",
            bio: user.bio || "",
        });
    }, [user]);

    // Load event statistics
    useEffect(() => {
        if (!user?.email) return;

        const fetchEvents = async () => {
            try {
                const { data: tokenData, error } = await authClient.token();

                if (error || !tokenData?.token) {
                    throw new Error("Authentication token not found");
                }

                const headers = {
                    Authorization: `Bearer ${tokenData.token}`,
                };

                const [createdRes, joinedRes] = await Promise.all([
                    fetch(`${API_URL}/api/events/my-events`, { headers }),
                    fetch(`${API_URL}/api/events/joined`, { headers }),
                ]);

                const createdData = await createdRes.json();
                const joinedData = await joinedRes.json();

                if (createdData.success) setCreatedEvents(createdData.events);
                if (joinedData.success) setJoinedEvents(joinedData.events);

            } catch (error) {
                console.error("Failed to load events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [user?.email]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image!");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB!");
            return;
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleOpenEdit = () => {
        setFormData({
            name: user?.name || "",
            phoneNumber: user?.phoneNumber || "",
            location: user?.location || "",
            image: user?.image || "",
            bio: user?.bio || "",
        });

        setSelectedImage(null);
        setImagePreview(user?.image || "");

        setIsEditOpen(true);
    };

    // Save profile
    const handleSaveProfile = async () => {
        if (!formData.name.trim()) {
            toast.error("Please enter your name!");
            return;
        }

        try {
            setIsSaving(true);

            let imageUrl = formData.image;

            // Upload image to Cloudinary
            if (selectedImage) {
                const cloudName =
                    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

                const uploadPreset =
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

                if (!cloudName || !uploadPreset) {
                    throw new Error("Cloudinary configuration is missing!");
                }

                const uploadData = new FormData();

                uploadData.append("file", selectedImage);
                uploadData.append("upload_preset", uploadPreset);

                const uploadResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    {
                        method: "POST",
                        body: uploadData,
                    }
                );

                const uploadResult = await uploadResponse.json();

                if (!uploadResponse.ok) {
                    throw new Error(
                        uploadResult.error?.message || "Image upload failed!"
                    );
                }

                imageUrl = uploadResult.secure_url;
            }

            const { error } = await authClient.updateUser({
                name: formData.name.trim(),
                image: imageUrl,
                phoneNumber: formData.phoneNumber,
                location: formData.location,
                bio: formData.bio,
            });

            if (error) {
                throw new Error(error.message);
            }

            setFormData((prev) => ({
                ...prev,
                image: imageUrl,
            }));

            setSelectedImage(null);
            setImagePreview("");
            setIsEditOpen(false);

            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile!"
            );
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 transition-colors duration-300 dark:bg-[#080D0B]">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-gray-50 transition-colors duration-300 dark:bg-[#080D0B]">
                <UserRound size={48} className="text-emerald-500" />

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Login Required
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                    Please login to view your profile.
                </p>

                <Link
                    href="/login"
                    className="rounded-xl bg-emerald-500 px-6 py-3 text-white transition hover:bg-emerald-600"
                >
                    Login
                </Link>
            </div>
        );
    }

    const statistics = [
        {
            title: "Created Events",
            description: "Events created by you",
            count: createdEvents.length,
            icon: CalendarPlus,
            color: "emerald",
        },
        {
            title: "Manage Events",
            description: "Manage your created events",
            count: createdEvents.length,
            icon: CalendarCheck,
            color: "blue",
            href: "/manage-events",
        },
        {
            title: "Joined Events",
            description: "Events you have joined",
            count: joinedEvents.length,
            icon: Users,
            color: "violet",
            href: "/joined-events",
        },
    ];

    const colors: Record<string, string> = {
        emerald: "bg-emerald-500/10 text-emerald-500",
        blue: "bg-blue-500/10 text-blue-500",
        violet: "bg-violet-500/10 text-violet-500",
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-[#080D0B] sm:px-6 lg:px-8">

            {/* Edit Profile Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm">
                    <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl transition-colors duration-300 dark:bg-[#101A16]">

                        <div className="mb-6 flex justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Edit Profile
                            </h2>

                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="text-2xl text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="space-y-4">

                            {/* Profile Picture Upload */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-emerald-500">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-3xl font-bold text-white">
                                            {formData.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-xl border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
                                >
                                    Choose Profile Picture
                                </button>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG or WEBP. Maximum 5MB.
                                </p>
                            </div>

                            {[
                                { label: "Full Name", field: "name", type: "text" },
                                { label: "Phone Number", field: "phoneNumber", type: "tel" },
                                { label: "Location", field: "location", type: "text" },
                            ].map((item) => (
                                <div key={item.field}>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        {item.label}
                                    </label>

                                    <input
                                        type={item.type}
                                        value={formData[item.field as keyof typeof formData]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [item.field]: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>

                                <input
                                    value={user.email}
                                    disabled
                                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Bio
                                </label>

                                <textarea
                                    rows={3}
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({ ...formData, bio: e.target.value })
                                    }
                                    placeholder="Write something about yourself..."
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsEditOpen(false);
                                    setSelectedImage(null);
                                    setImagePreview("");
                                }}
                                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-6xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        My Account
                    </p>

                    <h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Manage your personal information and community activities.
                    </p>
                </div>

                {/* Profile Header */}
                <section className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#101A16] sm:flex-row sm:items-center sm:p-8">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-emerald-500 text-3xl font-bold text-white">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            user.name?.[0]?.toUpperCase() || "U"
                        )}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {user.name}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <Mail size={15} className="mr-2 inline text-emerald-500" />
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={handleOpenEdit}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                    >
                        <Pencil size={16} />
                        Edit Profile
                    </button>
                </section>

                {/* Personal Information */}
                <section className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Personal Information
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { label: "Full Name", value: user.name, icon: UserRound },
                            { label: "Email Address", value: user.email, icon: Mail },
                            { label: "Phone Number", value: user.phoneNumber, icon: Phone },
                            { label: "Location", value: user.location, icon: MapPin },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#101A16]"
                                >
                                    <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                                        {item.label}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <Icon size={20} className="shrink-0 text-emerald-500" />

                                        <p className="break-all font-semibold text-gray-900 dark:text-white">
                                            {item.value || "Not added"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#101A16]">
                        <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                            Bio
                        </p>

                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            {user.bio || "No bio added yet."}
                        </p>
                    </div>
                </section>

                {/* Event Statistics */}
                <section className="mt-10">
                    <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                        Your Activities
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {statistics.map((item) => {
                            const Icon = item.icon;

                            const card = (
                                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#101A16] dark:hover:border-emerald-500/30 dark:hover:shadow-emerald-500/5">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[item.color]}`}
                                    >
                                        <Icon size={23} />
                                    </div>

                                    <p className="mt-6 text-4xl font-black text-gray-900 dark:text-white">
                                        {loading ? "..." : item.count}
                                    </p>

                                    <h3 className="mt-2 font-bold text-gray-900 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {item.description}
                                    </p>

                                    {item.href && (
                                        <ArrowRight size={18} className="mt-3 text-emerald-500" />
                                    )}
                                </div>
                            );

                            return item.href ? (
                                <Link href={item.href} key={item.title}>
                                    {card}
                                </Link>
                            ) : (
                                <div key={item.title}>{card}</div>
                            );
                        })}
                    </div>
                </section>

                {/* Footer */}
                <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center transition-colors duration-300">
                    <MapPin className="mx-auto mb-2 text-emerald-500" size={22} />

                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Every small act of kindness creates a bigger impact.
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Thank you for being a part of Kindova.
                    </p>
                </div>

            </div>
        </main>
    );
}
