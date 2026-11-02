type EventSkeletonProps = {
    count?: number;
};

export default function EventSkeleton({
    count = 6,
}: EventSkeletonProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#101A16]"
                >
                    {/* Image */}
                    <div className="h-48 bg-gray-200 dark:bg-white/10" />

                    <div className="space-y-4 p-5">

                        {/* Category */}
                        <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-white/10" />

                        {/* Title */}
                        <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-white/10" />

                        {/* Date */}
                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10" />

                        {/* Location */}
                        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-white/10" />

                        {/* Button */}
                        <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-white/10" />

                    </div>
                </div>
            ))}
        </div>
    );
}