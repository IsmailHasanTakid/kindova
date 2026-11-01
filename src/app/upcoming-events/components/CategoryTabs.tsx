"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Droplets,
    GraduationCap,
    LayoutGrid,
    LifeBuoy,
    Leaf,
    Megaphone,
    Sparkles,
    Stethoscope,
    Users,
    Utensils,
    type LucideIcon,
} from "lucide-react";

type CategoryTabsProps = {
    categories: string[];
    active: string;
    onSelect: (category: string) => void;
};

// প্রতিটা category-র আইকন আর ছোট নাম (backend-এ আসল নামটাই যায়)
const categoryMeta: Record<string, { icon: LucideIcon; label: string }> = {
    All: { icon: LayoutGrid, label: "All" },
    "Blood Donation": { icon: Droplets, label: "Blood Donation" },
    "Food Distribution": { icon: Utensils, label: "Food" },
    "Education & Scholarship": { icon: GraduationCap, label: "Education" },
    "Medical Camp": { icon: Stethoscope, label: "Medical" },
    "Environmental Protection": { icon: Leaf, label: "Environment" },
    "Disaster Relief": { icon: LifeBuoy, label: "Disaster Relief" },
    "Social Awareness": { icon: Megaphone, label: "Awareness" },
    "Community Development": { icon: Users, label: "Community" },
    Other: { icon: Sparkles, label: "Other" },
};

const CategoryTabs = ({ categories, active, onSelect }: CategoryTabsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // কোন দিকে আরও scroll করা যায় তা বের করা
    const updateArrows = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 2);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    }, []);

    useEffect(() => {
        updateArrows();
        window.addEventListener("resize", updateArrows);
        return () => window.removeEventListener("resize", updateArrows);
    }, [updateArrows]);

    // সক্রিয় tab টা দেখার মধ্যে নিয়ে আসা
    useEffect(() => {
        const activeBtn = scrollRef.current?.querySelector<HTMLElement>(
            '[aria-pressed="true"]'
        );
        activeBtn?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [active]);

    const scrollByAmount = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    };

    const isOverflowing = canScrollLeft || canScrollRight;

    return (
        <div className="relative">

            {/* Left arrow */}
            {canScrollLeft && (
                <button
                    type="button"
                    onClick={() => scrollByAmount(-260)}
                    aria-label="Scroll categories left"
                    className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-md backdrop-blur transition hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:bg-gray-900/90 dark:text-gray-200 md:flex"
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {/* Tabs (এক লাইনে, দরকার হলে scroll) */}
            <div
                ref={scrollRef}
                onScroll={updateArrows}
                style={
                    isOverflowing
                        ? {
                            maskImage:
                                "linear-gradient(to right, transparent, black 36px, black calc(100% - 36px), transparent)",
                            WebkitMaskImage:
                                "linear-gradient(to right, transparent, black 36px, black calc(100% - 36px), transparent)",
                        }
                        : undefined
                }
                className="flex overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div className="mx-auto flex flex-nowrap gap-2">
                    {categories.map((category) => {
                        const isActive = active === category;
                        const meta = categoryMeta[category] ?? categoryMeta.Other;
                        const Icon = meta.icon;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => onSelect(category)}
                                aria-pressed={isActive}
                                title={category}
                                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${isActive
                                    ? "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                                    : "border-gray-200 text-gray-600 hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:text-gray-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                                    }`}
                            >
                                <Icon size={15} />
                                {meta.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Right arrow */}
            {canScrollRight && (
                <button
                    type="button"
                    onClick={() => scrollByAmount(260)}
                    aria-label="Scroll categories right"
                    className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-md backdrop-blur transition hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:bg-gray-900/90 dark:text-gray-200 md:flex"
                >
                    <ChevronRight size={18} />
                </button>
            )}
        </div>
    );
};

export default CategoryTabs;