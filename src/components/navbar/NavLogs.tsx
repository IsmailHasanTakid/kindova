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
    LogIn,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const profileLinks = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "Create Event", href: "/create-event", icon: PlusCircle },
    { name: "Manage Events", href: "/manage-events", icon: CalendarDays },
    { name: "Joined Events", href: "/joined-events", icon: Heart },
];

type Props = { variant?: "desktop" | "mobile" };

// Avatar: image না থাকলে নামের প্রথম অক্ষর দেখাবে
const Avatar = ({
    name,
    image,
    className = "",
}: {
    name?: string | null;
    image?: string | null;
    className?: string;
}) =>
    image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={image}
            alt={name || "Profile"}
            title={name || "User"}
            className={`object-cover ${className}`}
        />
    ) : (
        <div
            className={`flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 font-black text-white ${className}`}
        >
            {(name?.trim()?.[0] || "U").toUpperCase()}
        </div>
    );

const NavLogs = ({ variant = "desktop" }: Props) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    // Close dropdown on outside click / Escape (desktop)
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

    useEffect(() => {
        setIsProfileOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            setIsProfileOpen(false);
            router.refresh();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const isMobile = variant === "mobile";

    /* ---------- Loading ---------- */
    if (isPending) {
        return (
            <div
                className={`animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 ${isMobile ? "h-24 w-full rounded-2xl" : "h-11 w-11 rounded-full"
                    }`}
            />
        );
    }

    /* ---------- Logged out ---------- */
    if (!session?.user) {
        return (
            <Link
                href="/login"
                className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 ${isMobile ? "w-full py-3" : "px-6 py-2.5"
                    }`}
            >
                <LogIn size={17} />
                Login
            </Link>
        );
    }

    const user = session.user;

    /* ---------- Mobile: inline profile panel ---------- */
    if (isMobile) {
        return (
            <div className="space-y-3">
                {/* User card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-4 shadow-lg shadow-emerald-500/20">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                    <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/10" />

                    <div className="relative flex items-center gap-3">
                        <Avatar
                            name={user.name}
                            image={user.image}
                            className="h-12 w-12 shrink-0 rounded-2xl border-2 border-white/60 shadow-lg"
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

                {/* Link tiles */}
                <div className="grid grid-cols-2 gap-2">
                    {profileLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-start gap-2 rounded-2xl border p-3 text-sm font-semibold transition active:scale-[0.98] ${isActive
                                    ? "border-emerald-300 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : "border-gray-200 bg-gray-50/80 text-gray-700 hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                                    }`}
                            >
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${isActive
                                        ? "bg-emerald-500 text-white"
                                        : "bg-white text-emerald-600 shadow-sm dark:bg-gray-800 dark:text-emerald-400"
                                        }`}
                                >
                                    <Icon size={17} />
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Sign out */}
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white active:scale-[0.98]"
                >
                    <LogOut size={17} />
                    Sign Out
                </button>
            </div>
        );
    }

    /* ---------- Desktop: dropdown ---------- */
    return (
        <div className="flex items-center gap-2" ref={dropdownRef}>

            {/* Profile Dropdown Button */}
            <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                aria-label="Open profile menu"
                className={`group flex items-center gap-2 rounded-xl border p-1.5 transition-all duration-300 ${isProfileOpen
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/30"
                    : "border-gray-200 bg-white/70 hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
                    }`}
            >
                <div className="relative">
                    <div className="rounded-lg bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 p-[2px]">
                        <Avatar
                            name={user.name}
                            image={user.image}
                            className="h-9 w-9 rounded-[8px] border-2 border-white dark:border-gray-900"
                        />
                    </div>

                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-900" />
                </div>

                <ChevronDown
                    size={17}
                    className={`text-gray-500 transition-transform duration-300 group-hover:text-emerald-600 dark:text-gray-400 ${isProfileOpen ? "rotate-180 text-emerald-600" : ""
                        }`}
                />
            </button>

            {/* Separate Logout Button */}
            <button
                onClick={handleLogout}
                title="Sign Out"
                aria-label="Sign out"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 text-sm font-bold text-red-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white active:scale-95 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
            >
                <LogOut size={17} />
                <span className="hidden lg:block">Logout</span>
            </button>

            {/* Profile Dropdown */}
            <div
                role="menu"
                className={`absolute right-0 top-[calc(100%+12px)] z-[100] w-72 origin-top-right overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-gray-950/95 dark:shadow-black/50 ${isProfileOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
                    }`}
            >
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 px-5 py-5">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                    <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/10" />

                    <div className="relative flex items-center gap-3">
                        <Avatar
                            name={user.name}
                            image={user.image}
                            className="h-12 w-12 shrink-0 rounded-2xl border-2 border-white/60 shadow-lg"
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

                {/* Profile Links */}
                <div className="p-2">
                    {profileLinks.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                role="menuitem"
                                onClick={() => setIsProfileOpen(false)}
                                className={`group/item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${active
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-emerald-400"
                                    }`}
                            >
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${active
                                        ? "bg-emerald-500 text-white"
                                        : "bg-gray-100 text-gray-500 group-hover/item:bg-emerald-500 group-hover/item:text-white dark:bg-white/5 dark:text-gray-400"
                                        }`}
                                >
                                    <Icon size={17} />
                                </span>

                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />

    
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