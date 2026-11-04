"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    AlertCircle,
    CheckCircle2,
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
        "group flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 transition-all duration-300 focus-within:border-emerald-400/60 focus-within:bg-emerald-400/[0.045] focus-within:ring-4 focus-within:ring-emerald-400/[0.08] hover:border-white/20";

    const inputCls =
        "w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-500";

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05090d] px-4 py-6 sm:py-12">

            {/* Background ambient lights */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.12] blur-[130px]" />

            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.10] blur-[130px]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[150px]" />

            {/* Background grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                    maskImage:
                        "radial-gradient(ellipse at center, black 0%, transparent 75%)",
                }}
            />

            {/* Main Login Container */}
            <div className="relative z-10 w-full max-w-[470px]">


                <div className="group relative isolate overflow-hidden rounded-[30px] p-[2px] shadow-[0_0_70px_rgba(16,185,129,0.10)]">


                    <div
                        className="pointer-events-none absolute -inset-[100%] animate-[spin_7s_linear_infinite] opacity-90"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, transparent 235deg, #10b981 270deg, #22d3ee 305deg, #6366f1 330deg, #10b981 350deg, transparent 360deg)",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute -inset-[100%] animate-[spin_7s_linear_infinite] opacity-50 blur-xl"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, transparent 235deg, #10b981 270deg, #22d3ee 305deg, #6366f1 330deg, #10b981 350deg, transparent 360deg)",
                        }}
                    />

                    {/* Card */}
                    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0b1215]/95 px-5 py-7 backdrop-blur-2xl sm:px-10 sm:py-11">

                        {/* Inner ambient glow */}
                        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-emerald-500/[0.08] blur-[90px]" />

                        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-[90px]" />


                        <div className="relative mb-9 text-center">

                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-[34px]">
                                Welcome{" "}
                                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                                    Back!
                                </span>
                            </h1>

                            <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-gray-400">
                                Sign in to access your account and continue where you left off.
                            </p>

                            <div className="mt-5 flex items-center justify-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                                <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-500">
                                    YOUR ACCOUNT, YOUR JOURNEY
                                </span>
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                            </div>
                        </div>
                        <div className="relative space-y-3">

                            {/* Google */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="group/google pl-5 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.045] py-4 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/[0.08] hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <svg viewBox="0 0 48 48" className="h-5 w-5">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.93 13.72 18.02 9.5 24 9.5Z" transform="translate(0 3)" />
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.07 47 31.95 47 24.55Z" />
                                    <path fill="#FBBC05" d="M10.05 28.58A14.4 14.4 0 0 1 9.27 24c0-1.59.28-3.12.78-4.58l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.57 10.77l7.48-6.19Z" transform="translate(0 3)" />
                                    <path fill="#34A853" d="M24 48c6.47 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.17 2.3-5.98 0-11.07-4.22-12.96-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
                                </svg>

                                Continue with Google

                                <ArrowRight
                                    size={16}
                                    className="ml-auto mr-2 text-gray-500 transition-all duration-300 group-hover/google:translate-x-1 group-hover/google:text-emerald-400"
                                />
                            </button>

                            {/* GitHub */}
                            <button
                                type="button"
                                onClick={handleGithubLogin}
                                disabled={loading}
                                className="group/github pl-5 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.045] py-4 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:shadow-[0_8px_30px_rgba(34,211,238,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5 text-gray-300 transition-colors group-hover/github:text-white"
                                    aria-hidden="true"
                                >
                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                </svg>

                                Continue with GitHub

                                <ArrowRight
                                    size={16}
                                    className="ml-auto mr-2 text-gray-500 transition-all duration-300 group-hover/github:translate-x-1 group-hover/github:text-cyan-300"
                                />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />

                            <span className="whitespace-nowrap text-[10px] font-semibold tracking-[0.17em] text-gray-500">
                                OR SIGN IN WITH EMAIL
                            </span>

                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
                        </div>

                        {/* Alerts */}
                        {error && (
                            <div
                                role="alert"
                                className="relative mb-5 flex items-start gap-2.5 rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300"
                            >
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div
                                role="status"
                                className="relative mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.08] px-4 py-3 text-sm text-emerald-300"
                            >
                                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                                {success}
                            </div>
                        )}

                        {/* Email Login Form */}
                        <form onSubmit={handleSubmit} className="relative space-y-5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2.5 block text-sm font-semibold text-gray-200"
                                >
                                    Email Address
                                </label>

                                <div className={inputWrap}>
                                    <Mail
                                        size={19}
                                        className="shrink-0 text-gray-500 transition-colors group-focus-within:text-emerald-400"
                                    />

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
                                    className="mb-2.5 block text-sm font-semibold text-gray-200"
                                >
                                    Password
                                </label>

                                <div className={inputWrap}>
                                    <Lock
                                        size={19}
                                        className="shrink-0 text-gray-500 transition-colors group-focus-within:text-emerald-400"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={inputCls}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="rounded-lg p-1 text-gray-500 transition hover:text-emerald-300"
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

                            {/* Remember Me */}
                            <div className="flex items-center justify-between gap-2 pt-1">
                                <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-gray-400 transition hover:text-gray-200">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 cursor-pointer rounded accent-emerald-500"
                                    />
                                    Remember me
                                </label>

                                <span className="text-xs text-gray-500">
                                    Forgot password disabled
                                </span>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-4 text-sm font-bold text-[#04110e] shadow-[0_8px_30px_rgba(16,185,129,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(16,185,129,0.35)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                <span className="relative flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <Loader2 size={19} className="animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight
                                                size={19}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Register */}
                        <p className="relative mt-8 text-center text-sm text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-bold text-emerald-400 underline-offset-4 transition hover:text-cyan-300 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;
