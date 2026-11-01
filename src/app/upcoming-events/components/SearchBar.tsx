"use client";

import { Search, X } from "lucide-react";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="relative mx-auto w-full max-w-2xl">
            <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search events by name..."
                aria-label="Search events"
                className="w-full rounded-2xl border border-gray-200 bg-transparent py-3.5 pl-12 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:text-white"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-500/10 hover:text-gray-700 dark:hover:text-white"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;