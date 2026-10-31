"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Home, CalendarHeart } from "lucide-react";

import NavLogs from "./NavLogs";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upcoming Events", href: "/upcoming-events", icon: CalendarHeart },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();


    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const dark = saved ? saved === "dark" : prefersDark;
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            setScrolled(y > 12);
            setProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onDown = (e: MouseEvent | TouchEvent) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(e.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("touchstart", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("touchstart", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, []);


    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header
            ref={headerRef}
            className={`sticky top-0 z-50 px-4 transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"
                }`}
        >
            <nav
                className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-5 backdrop-blur-xl transition-all duration-300 ${scrolled
                    ? "border-gray-200/80 bg-white/80 py-2 shadow-xl shadow-black/5 dark:border-gray-700/80 dark:bg-gray-900/80 dark:shadow-black/30"
                    : "border-gray-200/60 bg-white/60 py-3 shadow-md dark:border-gray-700/60 dark:bg-gray-900/60"
                    }`}
            >

                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                        className="h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-emerald-500/40 opacity-0 blur-lg transition-opacity duration-300 " />

                        <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-emerald-500/20 dark:border-gray-700">
                            <Image
                                src="/logo.jpeg"
                                alt="Kindova logo"
                                fill
                                sizes="44px"
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
                        <p className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-gray-400 dark:text-gray-500">
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
                                className={`group/link relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${active
                                    ? "bg-white text-emerald-600 shadow-sm dark:bg-gray-900 dark:text-emerald-400"
                                    : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                                    }`}
                            >
                                {link.name}
                                {!active && (
                                    <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-emerald-500 transition-transform duration-300 group-hover/link:scale-x-100" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 md:flex">
                    <button
                        onClick={toggleTheme}
                        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-600 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/70 dark:text-yellow-400 dark:hover:border-emerald-600"
                        aria-label="Toggle theme"
                    >
                        <span className="transition-transform duration-500 group-hover:rotate-[360deg]">
                            {isDark ? <Sun size={19} /> : <Moon size={19} />}
                        </span>
                    </button>

                    <NavLogs />
                </div>

                {/* Mobile Buttons */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 dark:border-gray-700 dark:text-yellow-400"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-expanded={isMenuOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu (animated) */}
            <div
                className={`mx-auto max-w-7xl md:hidden grid transition-all duration-300 ease-out ${isMenuOpen
                    ? "mt-2 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/95">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-3 font-semibold transition-all duration-200 ${active
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-200 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${active
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

                        <div className="mt-3 flex justify-end border-t border-gray-200 pt-3 dark:border-gray-700">
                            <NavLogs />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;