
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    HeartHandshake,
    Menu,
    X,
    Sun,
    Moon,
} from "lucide-react";

import NavLogs from "./NavLogs";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Upcoming Events", href: "/upcoming-events" },
    ];

    return (
        <header className="sticky top-0 z-50 px-4 pt-4">
            <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-gray-200 bg-white/90 px-5 py-3 shadow-lg backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/90">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                        <HeartHandshake size={24} />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            KIND<span className="text-emerald-600">OVA</span>
                        </h1>

                        <p className="text-[10px] font-medium tracking-wider text-gray-500">
                            TOGETHER FOR GOOD
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 md:flex">

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-yellow-400 dark:hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    <NavLogs />
                </div>

                {/* Mobile Buttons */}
                <div className="flex items-center gap-2 md:hidden">

                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900 md:hidden">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                        <NavLogs />
                    </div>

                </div>
            )}
        </header>
    );
};

export default Navbar;
