
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronDown,
    User,
    PlusCircle,
    CalendarDays,
    Heart,
    LogOut,
} from "lucide-react";

const NavLogs = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Temporary user status
    const isLoggedIn = false;

    const profileLinks = [
        { name: "My Profile", href: "/profile", icon: User },
        { name: "Create Event", href: "/create-event", icon: PlusCircle },
        { name: "Manage Events", href: "/manage-events", icon: CalendarDays },
        { name: "Joined Events", href: "/joined-events", icon: Heart },
    ];

    if (!isLoggedIn) {
        return (
            <Link
                href="/login"
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700"
            >
                Login
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 p-1.5 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
                <img
                    src="https://i.pravatar.cc/100"
                    alt="Profile"
                    title="User Name"
                    className="h-9 w-9 rounded-lg object-cover"
                />

                <ChevronDown size={16} />
            </button>

            {isProfileOpen && (
                <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">

                    <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-700">
                        <p className="font-bold text-gray-900 dark:text-white">
                            User Name
                        </p>

                        <p className="text-xs text-gray-500">
                            user@example.com
                        </p>
                    </div>

                    {profileLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => {
                            setIsProfileOpen(false);
                            // Logout functionality will be added later
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default NavLogs;
