// components/Skeleton.tsx

type SkeletonProps = {
    className?: string;
};

export default function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`animate-pulse rounded bg-gray-100 dark:bg-neutral-200 ${className}`} />
    );
}
