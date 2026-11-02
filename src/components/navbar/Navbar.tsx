"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    Home,
    CalendarHeart,
    Moon,
    ArrowUpRight,
    Compass,
} from "lucide-react";

import NavLogs from "./NavLogs";

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    {
        name: "Upcoming Events",
        href: "/upcoming-events",
        icon: CalendarHeart,
    },
    {
        name: "Explore",
        href: "/explore",
        icon: Compass,
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    const pathname = usePathname();

    // Scroll effect and progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            setScrolled(scrollY > 10);

            setProgress(
                maxScroll > 0
                    ? Math.min((scrollY / maxScroll) * 100, 100)
                    : 0
            );
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu after navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Lock body scroll and close with Escape
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    // Close menu on desktop
    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");

        const handleResize = () => {
            if (media.matches) setIsMenuOpen(false);
        };

        media.addEventListener("change", handleResize);

        return () => media.removeEventListener("change", handleResize);
    }, []);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50">

                {/* Navbar */}
                <nav
                    className={`relative border-b backdrop-blur-2xl transition-all duration-300 ${scrolled
                        ? "border-gray-200/80 bg-white/95 shadow-lg shadow-gray-900/5 dark:border-white/10 dark:bg-gray-950/95"
                        : "border-gray-200/60 bg-white/80 dark:border-white/10 dark:bg-gray-950/75"
                        }`}
                >
                    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex shrink-0 items-center gap-2.5"
                        >
                            <div className="rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 p-[2px] shadow-lg shadow-emerald-500/20 transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                                <div className="relative h-10 w-10 overflow-hidden rounded-[10px] bg-white dark:bg-gray-900">
                                    <Image
                                        src="/logo.jpeg"
                                        alt="Kindova logo"
                                        fill
                                        sizes="40px"
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="leading-none">
                                <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                                    KIND
                                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                        OVA
                                    </span>
                                </h1>

                                <p className="mt-1.5 text-[8px] font-bold tracking-[0.22em] text-gray-400 dark:text-gray-500">
                                    TOGETHER FOR GOOD
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex">
                            <div className="flex items-center gap-1 rounded-2xl border border-gray-200/70 bg-gray-100/70 p-1 dark:border-white/5 dark:bg-white/5">
                                {navLinks.map((link) => {
                                    const active = isActive(link.href);
                                    const Icon = link.icon;

                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${active
                                                ? "bg-white text-emerald-600 shadow-sm dark:bg-gray-800 dark:text-emerald-400"
                                                : "text-gray-600 hover:bg-white/70 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-emerald-400"
                                                }`}
                                        >
                                            <Icon size={16} />
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Theme Icon - Functionality will be added later */}
                            <button
                                type="button"
                                aria-label="Toggle dark mode"
                                title="Theme"
                                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 md:flex dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                            >
                                <Moon size={19} />
                            </button>

                            {/* Profile */}
                            <div className="hidden md:block">
                                <NavLogs variant="desktop" />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setIsMenuOpen((prev) => !prev)
                                }
                                aria-expanded={isMenuOpen}
                                aria-label="Toggle navigation menu"
                                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 active:scale-95 md:hidden ${isMenuOpen
                                    ? "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white"
                                    : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                                    }`}
                            >
                                {isMenuOpen ? (
                                    <X size={21} />
                                ) : (
                                    <Menu size={21} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Scroll Progress */}
                    <div className="absolute inset-x-0 bottom-0 h-[2px]">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 transition-[width] duration-150"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`grid transition-all duration-300 ease-in-out md:hidden ${isMenuOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                        }`}
                >
                    <div className="min-h-0 overflow-hidden">
                        <div className="max-h-[calc(100svh-72px)] overflow-y-auto overscroll-contain border-b border-gray-200/80 bg-white/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-gray-950/95">

                            {/* Mobile Links */}
                            <div className="space-y-1.5">
                                {navLinks.map((link) => {
                                    const active = isActive(link.href);
                                    const Icon = link.icon;

                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`group flex items-center justify-between rounded-xl p-3 transition-all duration-200 ${active
                                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span
                                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${active
                                                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                                                        : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400"
                                                        }`}
                                                >
                                                    <Icon size={19} />
                                                </span>

                                                <span className="text-sm font-semibold">
                                                    {link.name}
                                                </span>
                                            </span>

                                            <ArrowUpRight
                                                size={17}
                                                className="text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Profile */}
                            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-white/10">
                                <NavLogs variant="mobile" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navbar Spacer */}
            <div aria-hidden="true" className="h-[72px]" />
        </>
    );
};

export default Navbar;