"use client"
import Link from "next/link";
import Image from "next/image";
import {
    Heart,
    ArrowUpRight,
    Camera,
    Code2,
    Globe2,
    ArrowUp,
} from "lucide-react";

const footerLinks = [
    {
        title: "Explore",
        links: [
            { name: "Home", href: "/" },
            { name: "All Events", href: "/explore" },
            { name: "About Us", href: "/about" },
            { name: "Our Community", href: "/community" },
        ],
    },
    {
        title: "Get Involved",
        links: [
            { name: "Become a Volunteer", href: "/volunteer" },
            { name: "Find Events", href: "/events" },
            { name: "Create an Event", href: "/events/create" },
            { name: "Contact Us", href: "/contact" },
        ],
    },
];

const socialLinks = [
    { icon: "f", href: "#", label: "Facebook" },
    { icon: Camera, href: "#", label: "Instagram" },
    { icon: "In", href: "#", label: "LinkedIn" },
    { icon: Code2, href: "#", label: "GitHub" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-gray-200 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#061C17]">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-[110px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-400/10 blur-[110px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-8 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="group inline-flex items-center gap-3">
                            <div className="relative">
                                {/* Logo Glow */}
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 opacity-30 blur-md transition duration-300 group-hover:opacity-60" />

                                {/* Logo Image */}
                                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-emerald-500/20 bg-white p-1.5 shadow-lg transition duration-300 group-hover:scale-105">
                                    <Image
                                        src="/assets/logo.jpeg"
                                        alt="Kindova Logo"
                                        width={100}
                                        height={100}
                                        className="h-full w-full rounded-xl object-cover"
                                    />
                                </div>
                            </div>

                            {/* Brand Name */}
                            <div className="flex flex-col">
                                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-2xl font-black tracking-[0.12em] text-transparent">
                                    KINDOVA
                                </span>

                                <span className="text-[9px] font-semibold tracking-[0.25em] text-gray-500 dark:text-gray-400">
                                    CARE • CONNECT • CHANGE
                                </span>
                            </div>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
                            Connecting hearts, empowering communities,
                            and turning kindness into meaningful action.
                            Together, we create a better tomorrow.
                        </p>

                        {/* Social Links */}
                        <div className="mt-5 flex gap-2.5">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-emerald-500"
                                >
                                    {typeof Icon === "string" ? (
                                        <span className="text-base font-extrabold">{Icon}</span>
                                    ) : (
                                        <Icon size={18} />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-[2px] text-gray-900 dark:text-white">
                                {group.title}
                            </h3>

                            <ul className="space-y-3.5">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                                        >
                                            {link.name}
                                            <ArrowUpRight size={13} className="opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Mission */}
                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-[2px] text-gray-900 dark:text-white">
                            Our Mission
                        </h3>

                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-400/15 dark:bg-emerald-400/5">
                            <Globe2 size={22} className="text-emerald-600 dark:text-emerald-400" />

                            <h4 className="mt-3 text-base font-bold text-gray-900 dark:text-white">
                                A Better World Starts With Us.
                            </h4>

                            <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-400">
                                Bringing people together through compassion,
                                generosity, and community action.
                            </p>

                            <Link
                                href="/about"
                                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:gap-3 dark:text-emerald-400"
                            >
                                Discover Our Story
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>
                    </div>

                </div>

    
                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-5 dark:border-white/10 sm:flex-row">

                    <p className="text-center text-xs text-gray-500">
                        © 2026 Kindova. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500">
                        <Link href="/privacy-policy" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                            Privacy Policy
                        </Link>

                        <Link href="/terms" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                            Terms & Conditions
                        </Link>

                        <Link href="/contact" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                            Contact
                        </Link>
                    </div>

                    <button
                        onClick={() => {
                            document.getElementById("hero")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        aria-label="Back to top"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 transition hover:-translate-y-1 hover:bg-emerald-500 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                    >
                        <ArrowUp size={17} />
                    </button>
                </div>

    
                <div className="border-t border-gray-100 py-3 text-center dark:border-white/5">
                    <p className="text-[10px] font-medium tracking-[2.5px] text-gray-400 dark:text-gray-600">
                        MADE WITH <Heart size={10} className="mx-1 inline fill-emerald-500 text-emerald-500" /> FOR HUMANITY
                    </p>
                </div>

            </div>
        </footer>
    );
}