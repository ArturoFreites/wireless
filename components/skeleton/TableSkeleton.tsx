'use client';

type Props = {
    columns: number;
    rows?: number;
    minWidth?: string;
};

export default function TableSkeleton({ columns, rows = 6, minWidth = "800px" }: Props) {
    return (
        <div className="w-full overflow-x-auto">
            <table className={`w-full text-sm min-w-[${minWidth}]`}>
                <thead>
                    <tr className="bg-neutral-200 text-xs">
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="p-2 text-left">
                                <div className="h-4 w-20 bg-neutral-300 rounded" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-t animate-pulse">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="p-2">
                                    <div className="h-4 bg-neutral-200 rounded w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
