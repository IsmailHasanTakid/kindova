
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Eye,
    Globe2,
    Users,
    Sprout,
    HeartHandshake,
    Lightbulb,
    HandHeart,
    Sparkles,
    Building2,
    GraduationCap,
    Leaf,
} from "lucide-react";

const visionGoals = [
    {
        icon: Users,
        number: "01",
        title: "Connected Communities",
        description:
            "Build a world where people connect, collaborate, and support one another regardless of their backgrounds.",
    },
    {
        icon: GraduationCap,
        number: "02",
        title: "Empowered Generations",
        description:
            "Inspire young people to take responsibility, participate in humanitarian activities, and become agents of change.",
    },
    {
        icon: HandHeart,
        number: "03",
        title: "A Culture of Giving",
        description:
            "Encourage generosity and make helping others a natural part of everyday life.",
    },
    {
        icon: Globe2,
        number: "04",
        title: "Meaningful Impact",
        description:
            "Support initiatives that create lasting positive changes in communities and people's lives.",
    },
];

const principles = [
    {
        icon: HeartHandshake,
        title: "People First",
        description:
            "A better future begins when we care about the people around us.",
    },
    {
        icon: Sprout,
        title: "Grow Together",
        description:
            "Strong communities grow through shared efforts and collective responsibility.",
    },
    {
        icon: Lightbulb,
        title: "Think Beyond Today",
        description:
            "Every meaningful action can inspire a brighter future for generations to come.",
    },
];

export default function VisionPage() {
    return (
        <main className="overflow-hidden  text-gray-900 transition-colors duration-300 dark:bg-[#080D0B] dark:text-white">

            {/* Hero Section */}
            <section className="relative px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-8">

                <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl">

                    <div className="mx-auto max-w-2xl text-center">

                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                            <Eye size={14} />
                            Our Vision
                        </span>

                        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[46px]">
                            Imagining a Future Built on{" "}
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                                Kindness & Unity.
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                            We envision a world where compassion connects
                            people, communities grow stronger together,
                            and helping others becomes a natural part of life.
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
                                href="/mission"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:text-emerald-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                            >
                                Our Mission
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
                </div>
            </section>

            {/* Vision Image */}
            <section className="px-5 sm:px-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 sm:rounded-3xl">

                    <Image
                        src="/images/vision.jpg"
                        alt="A connected community working together for a better future"
                        width={1400}
                        height={600}
                        priority
                        className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[440px]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                            A Better Tomorrow
                        </span>

                        <h2 className="mt-2 max-w-lg text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                            A World Where Everyone Has the Power to Make a Difference.
                        </h2>
                    </div>
                </div>
            </section>

            {/* Future We Imagine */}
            <section className="px-5 py-16 sm:px-8 sm:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                            The Future We Imagine
                        </span>

                        <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                            A Little More Kindness. A Much Better World.
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            We imagine communities where people do not
                            hesitate to help one another, where opportunities
                            to make a difference are accessible, and where
                            every individual feels encouraged to contribute.
                        </p>

                        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            Our vision goes beyond connecting people online.
                            We want to encourage real-world participation,
                            build stronger relationships, and inspire a
                            lasting culture of compassion.
                        </p>

                        <div className="mt-6 flex items-start gap-3">
                            <Sparkles
                                size={20}
                                className="mt-0.5 shrink-0 text-emerald-500"
                            />
                            <p className="text-sm font-semibold leading-7 text-gray-800 dark:text-gray-200">
                                We believe a better future is something
                                we build together, one kind action at a time.
                            </p>
                        </div>
                    </div>

                    <div className="relative rounded-2xl border border-emerald-500/15 bg-emerald-50/70 p-7 dark:bg-emerald-500/[0.05] sm:p-9">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <Globe2 size={23} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold sm:text-2xl">
                            Our Vision Goes Beyond Today.
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            We want to inspire a generation that sees
                            kindness not as an occasional gesture, but
                            as a shared responsibility. A generation
                            that understands the value of community,
                            empathy, and collective action.
                        </p>

                        <div className="mt-7 flex items-center gap-3 border-t border-emerald-500/15 pt-5">
                            <Sprout className="text-emerald-600 dark:text-emerald-400" size={22} />
                            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                                Growing a Better Future Together.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Long Term Goals */}
            <section className="border-y border-gray-200 bg-gray-50 px-5 py-16 dark:border-white/10 dark:bg-white/[0.02] sm:px-8 sm:py-20">

                <div className="mx-auto max-w-7xl">

                    <div className="mb-10 max-w-xl">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                            Our Aspirations
                        </span>

                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                            The Future We Want to Build
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            Our long-term aspirations reflect the kind
                            of positive change we hope to encourage.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {visionGoals.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-[#0B1511] sm:p-7"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400">
                                            <Icon size={21} />
                                        </div>

                                        <span className="text-sm font-bold text-gray-300 dark:text-white/20">
                                            {item.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-base font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Impact Philosophy */}
            <section className="px-5 py-16 sm:px-8 sm:py-20">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-10 text-center">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                            What We Believe
                        </span>

                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                            Our Philosophy for a Better Future
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                            The future we imagine begins with the
                            principles we practice today.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {principles.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-gray-200 p-6 transition hover:border-emerald-500/40 dark:border-white/10 sm:p-7"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-4 text-base font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-5 pb-16 sm:px-8 sm:pb-20">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-12 text-center sm:rounded-3xl sm:px-12 sm:py-16">

                    <div className="pointer-events-none absolute -right-16 -top-28 h-64 w-64 rounded-full border-[35px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full border-[35px] border-white/10" />

                    <div className="relative">
                        <HeartHandshake
                            size={38}
                            className="mx-auto text-white"
                        />

                        <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                            The Future Starts With Us.
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-emerald-50">
                            Be part of a community that believes in
                            compassion, unity, and a brighter tomorrow.
                        </p>

                        <Link
                            href="/events"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                        >
                            Be Part of the Change
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
