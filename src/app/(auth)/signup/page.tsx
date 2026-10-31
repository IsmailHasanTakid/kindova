
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    HeartHandshake,
    UserRound,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Leaf,
    Globe,
    Image,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least 1 uppercase, 1 lowercase and minimum 6 characters."
            );
            return;
        }

        try {
            const url = new URL(photoURL);

            if (!["http:", "https:"].includes(url.protocol)) {
                setError("Please enter a valid profile photo URL.");
                return;
            }
        } catch {
            setError("Please enter a valid profile photo URL.");
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name: fullName,
                email,
                password,
                image: photoURL,
            });

            if (error) {
                setError(error.message || "Registration failed!");
                return;
            }

            setSuccess("Registration successful!");

        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F7FAF8] px-4 py-10 dark:bg-gray-950">

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">

                <div>

                    <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                        Get Started
                    </span>

                    <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Join KINDOVA and start making a positive impact.
                    </p>

                </div>

                {/* Form */}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    {/* Full Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Full Name
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:border-gray-700 dark:bg-gray-800">

                            <UserRound size={19} className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                            />

                        </div>

                    </div>

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

                    {/* Profile Photo URL */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Profile Photo URL
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:border-gray-700 dark:bg-gray-800">

                            <Image size={19} className="text-gray-400" />

                            <input
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                value={photoURL}
                                required
                                onChange={(e) => setPhotoURL(e.target.value)}
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
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>

                        </div>

                        <p className="mt-2 text-xs leading-5 text-gray-400">
                            Minimum 6 characters, at least 1 uppercase and 1 lowercase letter.
                        </p>

                    </div>

                    {/* Error Message */}

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}

                    {success && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                            {success}
                        </div>
                    )}

                    {/* Submit Button */}

                    <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                    >
                        Create Account

                        <ArrowRight
                            size={19}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </button>

                </form>

                {/* Login Link */}

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="font-bold text-emerald-600 transition hover:text-emerald-700"
                    >
                        Sign in
                    </Link>

                </p>

            </div>

        </main >
    );
};

export default SignupPage;
