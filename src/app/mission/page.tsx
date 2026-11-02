"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    HeartHandshake,
    Users,
    HandHeart,
    Target,
    ShieldCheck,
    Globe2,
    Sparkles,
    CheckCircle2,
    Quote,
} from "lucide-react";

const stats = [
    { value: "10K+", label: "Kind Hearts" },
    { value: "500+", label: "Community Events" },
    { value: "50+", label: "Causes Supported" },
    { value: "100%", label: "Heart & Purpose" },
];

const missionPillars = [
    {
        icon: Users,
        number: "01",
        title: "Connect Communities",
        description:
            "Bringing people together through shared values, meaningful initiatives, and collective efforts.",
    },
    {
        icon: HeartHandshake,
        number: "02",
        title: "Encourage Kindness",
        description:
            "Inspiring individuals to transform compassion into actions that positively impact lives.",
    },
    {
        icon: HandHeart,
        number: "03",
        title: "Make Helping Easier",
        description:
            "Creating opportunities to discover events, participate in campaigns, and support communities.",
    },
];

const values = [
    {
        icon: HeartHandshake,
        title: "Compassion",
        description:
            "We believe every individual deserves kindness, care, and dignity.",
    },
    {
        icon: ShieldCheck,
        title: "Responsibility",
        description:
            "We encourage meaningful contributions and responsible participation.",
    },
    {
        icon: Globe2,
        title: "Unity",
        description:
            "We believe collective efforts can build stronger communities.",
    },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
        <span className="h-px w-8 bg-gradient-to-r from-emerald-500 to-transparent" />
        {children}
    </span>
);

export default function MissionPage() {
    return (
        <main className="relative overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#060B09] dark:text-white">
            {/* Global subtle grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, #000 40%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, #000 40%, transparent 100%)",
                }}
            />

            {/* ============ HERO ============ */}
            <section className="relative px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-10">
                <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px] dark:bg-emerald-500/15" />
                <div className="relative mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 backdrop-blur dark:text-emerald-300">
                            <Target size={14} />
                            Our Mission
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        </span>

                        <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                            Making Kindness a Part of{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 bg-clip-text text-transparent">
                                    Everyday Life.
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M2 8C60 2 140 2 298 8"
                                        stroke="url(#u)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="u" x1="0" x2="1">
                                            <stop stopColor="#10b981" />
                                            <stop offset="1" stopColor="#fcd34d" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
                            We bring compassionate people together to create
                            meaningful opportunities, support communities, and
                            make a positive difference in the world.
                        </p>


                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

                            {/* Primary Button */}
                            <Link
                                href="/explore"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/25"
                            >
                                Explore Our Community
                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            {/* Secondary Button */}
                            <Link
                                href="/vision"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:text-emerald-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                            >
                                Our Vission
                                <ArrowRight
                                    size={15}
                                    className="opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </Link>

                            {/* Back to Home */}
                            <Link
                                href="/"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-emerald-400"
                            >
                                <ArrowRight
                                    size={15}
                                    className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
                                />
                                Back to Home
                            </Link>

                        </div>

                    </div>

                    {/* Stats */}
                    <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200 shadow-xl shadow-black/5 dark:border-white/10 dark:bg-white/10 dark:shadow-none md:grid-cols-4">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="bg-white/90 px-4 py-5 text-center backdrop-blur dark:bg-[#0A120F]"
                            >
                                <div className="bg-gradient-to-br from-emerald-500 to-teal-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                                    {s.value}
                                </div>
                                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ IMAGE ============ */}
            <section className="relative px-5 sm:px-8">
                <div className="group relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-200 shadow-2xl shadow-emerald-900/10 dark:border-white/10 sm:rounded-[2rem]">
                    <Image
                        src="/images/mision.jpg"
                        alt="Kindova humanitarian community volunteers"
                        width={1400}
                        height={600}
                        priority
                        className="h-[260px] w-full object-cover transition duration-[1200ms] group-hover:scale-105 sm:h-[360px] lg:h-[440px]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#04100B]/90 via-[#04100B]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-200 backdrop-blur-md">
                            <Sparkles size={12} />
                            Together We Can
                        </span>

                        <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
                            Every Small Act of Kindness Creates a Bigger Impact.
                        </h2>
                    </div>
                </div>
            </section>

            {/* ============ WHY WE EXIST ============ */}
            <section className="relative px-5 py-12 sm:px-8 sm:py-16">
                <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    <div>
                        <SectionLabel>Why We Exist</SectionLabel>

                        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                            A Simple Idea Can Create a{" "}
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                                Meaningful Change.
                            </span>
                        </h2>

                        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                            Many people want to help others, but finding
                            opportunities and connecting with the right
                            initiatives is not always easy.
                        </p>

                        <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                            Kindova aims to make that journey easier by
                            connecting individuals with community events,
                            donation campaigns, and humanitarian activities. We
                            want to turn good intentions into meaningful
                            participation.
                        </p>

                        <div className="mt-5 space-y-2">
                            {[
                                "Discover community initiatives",
                                "Participate in humanitarian events",
                                "Support people and meaningful causes",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/70 px-3.5 py-2.5 backdrop-blur transition duration-300 hover:translate-x-1 hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                                        <CheckCircle2
                                            size={17}
                                            className="text-emerald-500"
                                        />
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature card */}
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-500/25 via-teal-400/10 to-amber-300/20 blur-2xl" />

                        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-xl dark:from-emerald-500/[0.08] dark:to-[#0A120F] sm:p-8">
                            <Quote
                                size={120}
                                className="absolute -right-4 -top-4 text-emerald-500/10"
                            />

                            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                                <Sparkles size={26} />
                            </div>

                            <h3 className="relative mt-4 text-2xl font-extrabold sm:text-3xl">
                                Kindness Begins With You.
                            </h3>

                            <p className="relative mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                                Making the world better does not always require
                                extraordinary actions. A helping hand, a little
                                time, or a simple contribution can bring hope to
                                someone who needs it.
                            </p>

                            <div className="relative mt-5 flex items-center gap-3 border-t border-emerald-500/20 pt-4">
                                <HeartHandshake
                                    className="text-emerald-600 dark:text-emerald-400"
                                    size={22}
                                />
                                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                    Together, We Make It Possible.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ PILLARS ============ */}
            <section className="relative border-y border-gray-200 bg-gray-50/80 px-5 py-12 dark:border-white/10 dark:bg-white/[0.02] sm:px-8 sm:py-16">
                <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="mx-auto mb-8 max-w-2xl text-center">
                        <SectionLabel>What We Focus On</SectionLabel>

                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            How We Bring Our Mission to Life
                        </h2>

                        <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                            Our mission is built around three simple principles
                            that guide everything we do.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {missionPillars.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 transition duration-500 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-[#0A120F]"
                                >
                                    {/* top accent line */}
                                    <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition duration-500 group-hover:scale-x-100" />

                                    {/* big number */}
                                    <span className="absolute -right-2 -top-4 select-none text-8xl font-black text-gray-100 transition duration-500 group-hover:text-emerald-500/10 dark:text-white/[0.04]">
                                        {item.number}
                                    </span>

                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 transition duration-500 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30 dark:text-emerald-400">
                                        <Icon size={26} />
                                    </div>

                                    <h3 className="relative mt-4 text-xl font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="relative mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ VALUES ============ */}
            <section className="relative px-5 py-12 sm:px-8 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 text-center">
                        <SectionLabel>Our Core Values</SectionLabel>

                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            The Values That Guide Us
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-3xl bg-gradient-to-br from-emerald-500/30 via-transparent to-amber-300/20 p-px transition duration-500 hover:from-emerald-500 hover:to-teal-400"
                                >
                                    <div className="h-full rounded-3xl bg-white p-6 text-center dark:bg-[#0A120F]">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-8 ring-emerald-500/5 transition duration-500 group-hover:scale-110 dark:text-emerald-400">
                                            <Icon size={28} />
                                        </div>

                                        <h3 className="mt-4 text-xl font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ CTA ============ */}
            <section className="px-5 pb-12 sm:px-8 sm:pb-16">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 px-6 py-10 text-center shadow-2xl shadow-emerald-900/30 sm:rounded-[2rem] sm:px-12 sm:py-14">
                    <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border-[40px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[40px] border-white/10" />
                    <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-amber-300/20 blur-[90px]" />

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-50 backdrop-blur">
                            <HeartHandshake size={13} />
                            Join Kindova
                        </span>

                        <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
                            Be Part of Something Meaningful.
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-emerald-50/90">
                            Join a community that believes in kindness,
                            connection, and making a difference together.
                        </p>

                        <Link
                            href="/explore"
                            className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-emerald-700 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-emerald-50"
                        >
                            Explore Our Events
                            <ArrowRight
                                size={16}
                                className="transition group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}