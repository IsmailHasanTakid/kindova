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
    ShieldCheck,
    Sparkles,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Code2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);

            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.dismiss("google-login");
                toast.error(error.message || "Google login failed!");
                setLoading(false);
            }
        } catch {
            toast.dismiss("google-login");
            toast.error("Something went wrong. Please try again!");
            setLoading(false);
        }
    };
    const handleGithubLogin = async () => {
        try {
            setLoading(true);

            const { error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (error) {
                toast.dismiss("github-login");
                toast.error(error.message || "GitHub login failed!");
                setLoading(false);
            }
        } catch {
            toast.dismiss("github-login");
            toast.error("Something went wrong. Please try again!");
            setLoading(false);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                rememberMe,
            });

            if (error) {
                setError(error.message || "Invalid email or password");
                return;
            }
            setSuccess("Login successful. Redirecting...");
            router.push("/");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputWrap =
        "group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/70 px-4 transition-all duration-200 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:focus-within:bg-white/10 dark:hover:border-white/20";
    const inputCls =
        "w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white";
    const iconCls =
        "shrink-0 text-gray-400 transition-colors group-focus-within:text-emerald-600";

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F3F7F4] px-4 py-10 dark:bg-gray-950">
            {/* Ambient background */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-500/10" />
            <div className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-teal-300/40 blur-3xl dark:bg-teal-500/10" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/70 dark:shadow-black/40 lg:grid-cols-[1.05fr_1fr]">
                {/* ───────── Brand panel ───────── */}
                <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-12 text-white lg:flex">

                    <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
                    <div className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full border border-white/10" />

                    {/* Logo */}
                    <div className="relative flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                            <Leaf size={22} />
                        </span>
                        <span className="text-lg font-semibold tracking-tight">
                            Your Brand
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="relative">
                        <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight xl:text-[2.6rem]">
                            Pick up right
                            <br />
                            where you left off.
                        </h1>
                        <p className="mt-5 max-w-sm text-[15px] leading-7 text-emerald-100/80">
                            Sign in to see your saved items, manage your account,
                            and carry on from any device.
                        </p>
                    </div>

                    {/* Feature list */}
                    <ul className="relative space-y-4 text-sm text-emerald-50/90">
                        <li className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                                <ShieldCheck size={18} />
                            </span>
                            Secure sign-in, your data stays private
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                                <HeartHandshake size={18} />
                            </span>
                            One account, everywhere you go
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                                <Sparkles size={18} />
                            </span>
                            Stay signed in with Remember me
                        </li>
                    </ul>
                </aside>

                {/* ───────── Form panel ───────── */}
                <section className="flex flex-col justify-center p-7 sm:p-12">
                    <div className="mx-auto w-full max-w-sm">
                        {/* Mobile logo */}
                        <div className="mb-8 flex items-center gap-3 lg:hidden">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                                <Leaf size={20} />
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                Your Brand
                            </span>
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Enter your details to sign in to your account.
                        </p>

                        {/* Google */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="hidden"
                        >
                            <Globe size={20} className="text-emerald-600" />
                            Continue with Google
                        </button>

                        {/* GitHub */}
                        <button
                            type="button"
                            onClick={handleGithubLogin}
                            disabled={loading}
                            className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10"
                        >
                            <Code2 size={20} />
                            Continue with GitHub
                        </button>

                        {/* Divider */}
                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-200 dark:via-white/10 dark:to-white/10" />
                            <span className="text-xs font-medium text-gray-400">
                                or sign in with email
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-200 dark:via-white/10 dark:to-white/10" />
                        </div>

                        {/* Alerts */}
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
                            >
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div
                                role="status"
                                className="mb-5 flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                            >
                                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                                {success}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Email address
                                </label>
                                <div className={inputWrap}>
                                    <Mail size={19} className={iconCls} />
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={inputCls}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Password
                                </label>
                                <div className={inputWrap}>
                                    <Lock size={19} className={iconCls} />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={inputCls}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="rounded-lg p-1 text-gray-400 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                                        aria-label={
                                            showPassword ? "Hide password" : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded accent-emerald-600"
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
                                disabled={loading}
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={19} className="animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight
                                            size={19}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register link */}
                        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-semibold text-emerald-600 underline-offset-4 transition hover:text-emerald-700 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SignInPage;