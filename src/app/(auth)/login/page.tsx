
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    HeartHandshake,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Leaf,
    Globe,
} from "lucide-react";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        // Better Auth sign-in will be added here
        console.log({ email, password, rememberMe });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F7FAF8] px-4 py-10 dark:bg-gray-950">

            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-900/10 dark:bg-gray-900 md:grid-cols-2">

                {/* Left Side - Branding */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-emerald-700 p-10 text-white md:flex">

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />

                    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />

                    <Link href="/" className="relative flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700">
                            <HeartHandshake size={26} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold tracking-wide">
                                KINDOVA
                            </h1>
                            <p className="text-[10px] tracking-[3px] text-emerald-100">
                                TOGETHER FOR GOOD
                            </p>
                        </div>
                    </Link>

                    <div className="relative my-12">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                            <Leaf size={34} />
                        </div>

                        <h2 className="max-w-sm text-4xl font-extrabold leading-tight">
                            Make a Difference, One Event at a Time.
                        </h2>

                        <p className="mt-5 max-w-sm leading-7 text-emerald-100">
                            Connect with passionate people, join meaningful events,
                            and help build a better community together.
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <img
                                        key={item}
                                        src={`https://i.pravatar.cc/100?img=${item + 10}`}
                                        alt="Community member"
                                        className="h-10 w-10 rounded-full border-2 border-emerald-700 object-cover"
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-emerald-100">
                                People making positive changes
                            </p>
                        </div>
                    </div>

                    <p className="relative text-sm text-emerald-100">
                        © 2026 KINDOVA. All rights reserved.
                    </p>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">



                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                            Welcome Back
                        </span>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
                            Sign in to your account
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Please enter your details to continue.
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        <Globe size={20} className="text-emerald-600" />
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                        <span className="text-xs font-medium text-gray-400">
                            OR CONTINUE WITH EMAIL
                        </span>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:border-gray-700 dark:bg-gray-800">
                                <Mail size={19} className="text-gray-400" />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Password
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:border-gray-700 dark:bg-gray-800">
                                <Lock size={19} className="text-gray-400" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 transition hover:text-emerald-600"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 accent-emerald-600"
                                />
                                Remember me
                            </label>

                            <span className="text-xs text-gray-400">
                                Forgot password disabled
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                        >
                            Sign In
                            <ArrowRight
                                size={19}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-emerald-600 transition hover:text-emerald-700"
                        >
                            Register an account
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
};

export default SignInPage;
