"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    ChevronDown,
    User,
    PlusCircle,
    CalendarDays,
    Heart,
    LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const NavLogs = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    const profileLinks = [
        { name: "My Profile", href: "/profile", icon: User },
        { name: "Create Event", href: "/create-event", icon: PlusCircle },
        { name: "Manage Events", href: "/manage-events", icon: CalendarDays },
        { name: "Joined Events", href: "/joined-events", icon: Heart },
    ];

    // বাইরে ক্লিক করলে এবং Esc চাপলে ড্রপডাউন বন্ধ
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsProfileOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    // পেজ বদলালে ড্রপডাউন বন্ধ
    useEffect(() => {
        setIsProfileOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await authClient.signOut();
        setIsProfileOpen(false);
        router.refresh();
        router.push("/login");
    };

    if (isPending) {
        return (
            <div className="h-11 w-11 animate-pulse rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
        );
    }

    if (!session?.user) {
        return (
            <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 active:translate-y-0"
            >
                Login
            </Link>
        );
    }

    const user = session.user;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                className={`group flex items-center gap-2 rounded-2xl border p-1.5 pr-2.5 transition-all duration-300 ${isProfileOpen
                    ? "border-emerald-400 bg-emerald-50 shadow-lg shadow-emerald-500/20 dark:border-emerald-500 dark:bg-emerald-950/30"
                    : "border-gray-200 bg-white/70 backdrop-blur hover:border-emerald-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/70 dark:hover:border-emerald-600"
                    }`}
            >
                <div className="relative">
                    <div className="rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 p-[2px]">
                        <img
                            src={user.image || "/default-avatar.png"}
                            alt={user.name || "Profile"}
                            title={user.name || "User"}
                            className="h-9 w-9 rounded-[10px] border-2 border-white object-cover dark:border-gray-900"
                        />
                    </div>
                    {/* Online dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-900" />
                </div>

                <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-300 group-hover:text-emerald-600 dark:text-gray-400 ${isProfileOpen ? "rotate-180 text-emerald-600" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            <div
                role="menu"
                className={`absolute right-0 top-[calc(100%+12px)] z-50 w-72 origin-top-right overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-200 dark:border-gray-700/80 dark:bg-gray-900/95 dark:shadow-black/40 ${isProfileOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
                    }`}
            >
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 px-5 py-5">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                    <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/10" />

                    <div className="relative flex items-center gap-3">
                        <img
                            src={user.image || "/default-avatar.png"}
                            alt={user.name || "Profile"}
                            className="h-12 w-12 rounded-2xl border-2 border-white/60 object-cover shadow-lg"
                        />
                        <div className="min-w-0">
                            <p className="truncate text-base font-bold text-white">
                                {user.name}
                            </p>
                            <p className="truncate text-xs text-emerald-100">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Links */}
                <div className="p-2">
                    {profileLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                role="menuitem"
                                onClick={() => setIsProfileOpen(false)}
                                className={`group/item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${isActive
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                    }`}
                            >
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200 ${isActive
                                        ? "bg-emerald-500 text-white"
                                        : "bg-gray-100 text-gray-500 group-hover/item:bg-emerald-500 group-hover/item:text-white dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                >
                                    <Icon size={17} />
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />

                {/* Sign Out */}
                <div className="p-2">
                    <button
                        onClick={handleLogout}
                        role="menuitem"
                        className="group/out flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold text-red-500 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors duration-200 group-hover/out:bg-red-500 group-hover/out:text-white dark:bg-red-950/40">
                            <LogOut size={17} />
                        </span>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavLogs;