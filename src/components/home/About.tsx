
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    HeartHandshake,
    Users,
    HandHeart,
    Target,
    Eye,
    Sparkles,
} from "lucide-react";

const values = [
    {
        icon: HeartHandshake,
        title: "Compassion",
        description: "Caring for people and making kindness a part of everyday life.",
    },
    {
        icon: Users,
        title: "Community",
        description: "Bringing people together to create meaningful change.",
    },
    {
        icon: HandHeart,
        title: "Positive Impact",
        description: "Turning small acts of kindness into lasting differences.",
    },
];

export default function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-[#080D0B] sm:py-24"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                {/* Section Heading */}
                <div className="mb-14 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                        <Sparkles size={14} />
                        About Kindova
                    </span>

                    <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        More Than a Platform,
                        <span className="block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                            A Community of Kindness.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                        We believe that even the smallest act of kindness can
                        create a meaningful impact. Kindova brings people
                        together to make the world a better place.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Image */}
                    <div className="group relative">
                        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 to-teal-500/5 opacity-70 blur-xl transition duration-500 group-hover:opacity-100" />

                        <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/70 dark:border-white/10">
                            <Image
                                src="/images/about-kindova.jpg"
                                alt="Kindova community volunteers helping people"
                                width={700}
                                height={650}
                                className="h-[350px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[450px]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="max-w-sm text-xl font-bold leading-snug text-white sm:text-2xl">
                                    Together, we can turn kindness into action.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">

                        <div>
                            <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                                Who We Are
                            </span>

                            <h3 className="mt-3 text-2xl font-bold leading-snug text-gray-900 dark:text-white sm:text-3xl">
                                Connecting Hearts, Empowering Communities.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                                Kindova is a community-driven platform designed
                                to connect passionate individuals with
                                humanitarian initiatives. From discovering
                                community events to participating in donation
                                campaigns, we make it easier for everyone to
                                contribute and create positive change.
                            </p>
                        </div>

                        {/* Mission & Vision */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Link
                                href={'/mission'}
                                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/[0.03]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <Target size={21} />
                                </div>

                                <h4 className="mt-4 font-bold text-gray-900 dark:text-white">
                                    Our Mission
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    To make humanitarian participation
                                    accessible and inspire people to help
                                    one another.
                                </p>
                            </Link>

                            <Link
                                href={'/vision'}
                                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/[0.03]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                                    <Eye size={21} />
                                </div>

                                <h4 className="mt-4 font-bold text-gray-900 dark:text-white">
                                    Our Vision
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    A world where kindness connects
                                    communities and everyone has the
                                    opportunity to make a difference.
                                </p>
                            </Link>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/events"
                            className="group inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-600"
                        >
                            Explore Our Community
                            <ArrowUpRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mt-20 border-t border-gray-200 pt-14 dark:border-white/10">
                    <div className="mb-9 text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                            What Drives Us
                        </span>
                        <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                            The Values Behind Kindova
                        </h3>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="group rounded-2xl border border-gray-200 bg-gray-50/80 p-6 transition duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition duration-300 group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400">
                                        <Icon size={23} />
                                    </div>

                                    <h4 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                                        {value.title}
                                    </h4>

                                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
