import Link from "next/link";
import {
    Home,
    SearchX,
    Sparkles,
    ArrowUpRight,
    Compass,
} from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-5 py-16 transition-colors duration-300 dark:bg-[#080D0B]">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />

            <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

                {/* Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shadow-lg shadow-emerald-500/5">
                    <SearchX size={40} strokeWidth={1.5} />
                </div>

                {/* 404 */}
                <div className="relative">
                    <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 bg-clip-text text-[120px] font-black leading-none tracking-tighter text-transparent sm:text-[180px]">
                        404
                    </h1>

                    <div className="absolute right-2 top-2 hidden animate-pulse text-emerald-500 sm:block">
                        <Sparkles size={28} />
                    </div>
                </div>

                {/* Error Message */}
                <div className="mt-6 space-y-4">

                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        <Compass size={14} />
                        Lost Your Way?
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Oops! Page Not Found
                    </h2>

                    <p className="mx-auto max-w-md text-base leading-7 text-gray-500 dark:text-gray-400">
                        The page you're looking for doesn't exist or may have
                        been moved. Don't worry, let's get you back on track!
                    </p>

                </div>

                {/* Home Button */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-emerald-500/30"
                    >
                        <Home size={19} />
                        Back to Home

                        <ArrowUpRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-16">

                    <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                    <p className="text-sm font-bold tracking-[0.25em] text-gray-400 dark:text-gray-500">
                        KINDOVA
                    </p>

                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-600">
                        Every small act creates a bigger impact.
                    </p>

                </div>

            </div>
        </main>
    );
}