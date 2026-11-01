"use client";

type CategoryTabsProps = {
    categories: string[];
    active: string;
    onSelect: (category: string) => void;
};

const CategoryTabs = ({ categories, active, onSelect }: CategoryTabsProps) => {
    return (
        <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2 sm:mx-auto sm:w-auto sm:flex-wrap sm:justify-center">
                {categories.map((category) => {
                    const isActive = active === category;

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => onSelect(category)}
                            aria-pressed={isActive}
                            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${isActive
                                ? "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                                : "border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:text-gray-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                                }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryTabs;