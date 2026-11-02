import {
    ArrowRight, BellRing, Heart, Mail, Sparkles, Users, Globe2,
} from "lucide-react";

const features = [
    { icon: BellRing, label: "Event Updates" },
    { icon: Heart, label: "Inspiring Stories" },
    { icon: Globe2, label: "Community Impact" },
];

export default function SubscribeSection() {
    return (
        <section className="relative overflow-hidden bg-slate-50 px-5 py-20 transition-colors dark:bg-[#061C17] sm:px-8 lg:py-28">

            {/* Background */}
            <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-400/15 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[120px]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

                {/* Left Content */}
                <div>
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                        <Sparkles size={15} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-semibold uppercase tracking-[2px] text-emerald-700 dark:text-emerald-300">
                            Stay Inspired, Stay Connected
                        </span>
                    </div>

                    <h2 className="max-w-xl text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                        Be Part of Something{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-300 dark:to-teal-300">
                            Meaningful.
                        </span>
                    </h2>

                    <p className="mt-7 max-w-lg text-sm leading-8 text-gray-600 dark:text-gray-400 sm:text-base">
                        Good things happen when people come together.
                        Subscribe to Kindova and stay connected with inspiring
                        events, volunteering opportunities, and stories
                        that make a difference.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-5">
                        {features.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Icon size={17} className="text-emerald-600 dark:text-emerald-400" />
                                {label}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center gap-10 border-t border-gray-200 pt-8 dark:border-white/10">
                        {[
                            { icon: Users, title: "Together", subtitle: "Stronger as a community" },
                            { icon: Heart, title: "Kindness", subtitle: "One action at a time" },
                        ].map(({ icon: Icon, title, subtitle }) => (
                            <div key={title}>
                                <div className="flex items-center gap-2">
                                    <Icon size={19} className="text-emerald-600 dark:text-emerald-400" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscription Card */}
                <div className="relative mx-auto w-full max-w-lg">
                    <div className="absolute -inset-1 rounded-[35px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 blur-xl dark:from-emerald-400/40 dark:to-teal-400/30" />

                    <div className="relative overflow-hidden rounded-[30px] border border-gray-200 bg-white p-7 shadow-xl shadow-emerald-900/5 transition-colors dark:border-white/10 dark:bg-white/[0.06] dark:backdrop-blur-2xl sm:p-10">

                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                            <Mail size={29} className="text-emerald-600 dark:text-emerald-300" />
                        </div>

                        <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-emerald-600 dark:text-emerald-400">
                            The Kindova Newsletter
                        </p>

                        <h3 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                            Goodness Starts With Staying{" "}
                            <span className="text-emerald-600 dark:text-emerald-400">
                                Connected.
                            </span>
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            Get inspiring updates, upcoming community events,
                            and opportunities to spread kindness delivered
                            straight to your inbox.
                        </p>

                        <div className="mt-9">
                            <label className="mb-3 block text-sm font-semibold text-gray-800 dark:text-gray-300">
                                Your Email Address
                            </label>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="h-14 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-emerald-400"
                                />

                                <button
                                    type="button"
                                    className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 dark:from-emerald-500 dark:to-teal-500"
                                >
                                    Subscribe
                                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>

                            <p className="mt-5 text-xs leading-6 text-gray-500">
                                No spam. Just meaningful updates and opportunities to make a difference.
                            </p>
                        </div>

                        <div className="mt-9 flex items-center gap-3 border-t border-gray-200 pt-6 dark:border-white/10">
                            <Heart size={19} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <p className="text-xs leading-6 text-gray-600 dark:text-gray-400">
                                Every little action matters.{" "}
                                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                                    Be part of the change.
                                </span>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}