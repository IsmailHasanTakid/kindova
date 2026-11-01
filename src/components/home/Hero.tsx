"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

const images = [
    "/hero/1.jpg",
    "/hero/2.jpg",
    "/hero/3.jpg",
    "/hero/4.jpg",
    "/hero/5.jpg",
    "/hero/6.jpg",
    "/hero/7.jpg",
    "/hero/8.jpg",
    "/hero/9.jpg",
    "/hero/10.jpg",
];

const statistics = [
    { number: "1,250+", title: "Active Volunteers" },
    { number: "320+", title: "Events Completed" },
    { number: "8,500+", title: "Lives Impacted" },
    { number: "100%", title: "Community Driven" },
];

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="px-3 py-3 sm:px-6 sm:py-5 lg:px-8">

            <div className="relative mx-auto flex h-[85svh] min-h-[580px] max-h-[780px] max-w-7xl items-end justify-center overflow-hidden rounded-2xl text-white sm:min-h-[650px] sm:rounded-3xl lg:min-h-[640px]">

                {/* Background Images (next/image: ডিভাইস অনুযায়ী HD আকার নিজে বেছে নেয়) */}
                {images.map((src, index) => (
                    <div
                        key={src}
                        aria-hidden="true"
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === index
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                    >
                        <Image
                            src={src}
                            alt=""
                            fill
                            quality={90}
                            priority={index === 0}
                            sizes="(min-width: 1280px) 1280px, 100vw"
                            className="object-cover object-center"
                        />
                    </div>
                ))}

                {/* Overlay: উপরের দিক প্রায় স্বচ্ছ, শুধু নিচে লেখার জায়গায় গাঢ় */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="relative z-10 w-full px-3 pb-7 text-center sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">

                    <h1 className="mx-auto whitespace-nowrap text-[clamp(1.45rem,5.5vw,4.5rem)] font-black leading-tight tracking-[-0.025em] sm:text-[clamp(2.5rem,5vw,4.5rem)]">
                        Small Acts
                        <span className="mx-1.5 bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent sm:mx-3">
                            Big Changes.
                        </span>
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-white/85 sm:mt-4 sm:text-base sm:leading-7">
                        Together, we can make the world a better place.
                    </p>

                    {/* Buttons */}
                    <div className="mx-auto mt-5 flex max-w-sm flex-col justify-center gap-3 sm:mt-7 sm:max-w-none sm:flex-row">

                        <Link
                            href="/events"
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold transition duration-300 hover:bg-emerald-400 sm:px-7 sm:py-3.5 sm:text-base"
                        >
                            Explore Events
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/volunteer"
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-md transition duration-300 hover:bg-white/20 sm:px-7 sm:py-3.5 sm:text-base"
                        >
                            <HeartHandshake size={18} />
                            Become a Volunteer
                        </Link>

                    </div>

                    {/* Statistics */}
                    <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-3">

                        {statistics.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-xl border border-white/20 bg-white/10 px-2 py-3 text-center shadow-lg backdrop-blur-md transition duration-300 hover:bg-white/20 sm:px-3"
                            >
                                <h3 className="text-lg font-extrabold tracking-tight text-emerald-300 sm:text-2xl">
                                    {item.number}
                                </h3>

                                <p className="mt-1 text-[10px] font-medium text-white/75 sm:text-xs">
                                    {item.title}
                                </p>
                            </div>
                        ))}

                    </div>

                    {/* Image Indicators */}
                    <div className="mt-6 hidden justify-center gap-2 sm:flex">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                aria-label={`Show image ${index + 1}`}
                                aria-current={currentImage === index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentImage === index
                                    ? "w-7 bg-emerald-400"
                                    : "w-2 bg-white/50 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>

        </section>
    );
}