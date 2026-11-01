
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    Sun,
    Moon,
    Home,
    CalendarHeart,
} from "lucide-react";

import Image from "next/image";
import NavLogs from "./NavLogs";

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upcoming Events", href: "/upcoming-events", icon: CalendarHeart },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    const pathname = usePathname();

    // Theme Setup
    useEffect(() => {
        const saved = localStorage.getItem("theme");

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const dark = saved ? saved === "dark" : prefersDark;

        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    // Theme Toggle
    const toggleTheme = () => {
        const next = !isDark;

        setIsDark(next);

        document.documentElement.classList.toggle("dark", next);

        localStorage.setItem("theme", next ? "dark" : "light");
    };

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            setScrolled(scrollY > 12);

            setProgress(
                maxScroll > 0
                    ? Math.min((scrollY / maxScroll) * 100, 100)
                    : 0
            );
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close Mobile Menu After Navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Active Link
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header
            className={`sticky top-0 z-50 px-3 sm:px-4 transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"
                }`}
        >
            <nav
                className={`relative mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-4 sm:px-5 backdrop-blur-xl transition-all duration-300 ${scrolled
                    ? "border-gray-200/80 bg-white/90 py-2 shadow-xl shadow-black/5 dark:border-gray-700/80 dark:bg-gray-900/90 dark:shadow-black/30"
                    : "border-gray-200/60 bg-white/75 py-3 shadow-md dark:border-gray-700/60 dark:bg-gray-900/75"
                    }`}
            >
                {/* Scroll Progress */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden rounded-t-2xl">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Logo */}
                <Link href="/" className="group flex shrink-0 items-center gap-2.5">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md shadow-emerald-500/10 dark:border-gray-700 sm:h-11 sm:w-11">
                        <Image
                            src="/logo.jpeg"
                            alt="Kindova logo"
                            fill
                            sizes="44px"
                            priority
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>

                    <div className="leading-none">
                        <h1 className="text-lg font-black tracking-tight text-gray-900 dark:text-white sm:text-xl">
                            KIND
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                OVA
                            </span>
                        </h1>

                        <p className="mt-1 text-[8px] font-semibold tracking-[0.2em] text-gray-400 dark:text-gray-500 sm:text-[9px]">
                            TOGETHER FOR GOOD
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 rounded-2xl bg-gray-100/70 p-1 dark:bg-gray-800/60 md:flex">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${active
                                    ? "bg-white text-emerald-600 shadow-sm dark:bg-gray-900 dark:text-emerald-400"
                                    : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                                    }`}
                            >
                                {link.name}

                                {!active && (
                                    <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-emerald-500 transition-transform duration-300 hover:scale-x-100" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 md:flex">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-600 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900/70 dark:text-yellow-400"
                    >
                        <span className="transition-transform duration-500 group-hover:rotate-180">
                            {isDark ? <Sun size={19} /> : <Moon size={19} />}
                        </span>
                    </button>

                    <NavLogs />
                </div>

                {/* Mobile Right Side */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-600 transition hover:border-emerald-400 dark:border-gray-700 dark:bg-gray-900/70 dark:text-yellow-400"
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation menu"
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg transition-all active:scale-95 ${isMenuOpen
                            ? "bg-gray-800 dark:bg-gray-700"
                            : "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20"
                            }`}
                    >
                        {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`mx-auto grid max-w-7xl overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen
                    ? "mt-2 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="min-h-0">
                    <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/95">
                        {/* Mobile Navigation Links */}
                        <div className="space-y-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href);

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active
                                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-200 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${active
                                                ? "bg-emerald-500 text-white"
                                                : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                                }`}
                                        >
                                            <Icon size={18} />
                                        </span>

                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Profile Section */}
                        <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                            <NavLogs />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
