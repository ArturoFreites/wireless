'use client';

import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { CircleCheck, CircleMinus, CirclePercent, ChevronUp, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import EditPriceModal from "@/components/EditPriceModal";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

function DashboardClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("category_id") || "";
    const subcategoryId = searchParams.get("subcategory_id") || "";

    const [sortBy, setSortBy] = useState<string>('model');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string | null>('active');

    const { data: products, loading } = useFilteredProducts(
        categoryId,
        subcategoryId,
        sortBy,
        sortOrder,
        statusFilter
    );

    const currentLabel = searchParams.get("subcategory_name") ||
        searchParams.get("category_name") ||
        "Todos los productos";

    const toggleSort = useCallback((column: string) => {
        if (sortBy === column) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    }, [sortBy]);

    const renderSortIcon = (column: string) => {
        if (sortBy !== column) return null;
        return sortOrder === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />;
    };

    return (
        <article className="w-full text-neutral-800 p-4 md:p-10 overflow-x-auto">
            <h1 className="font-bold text-xl mb-4">Listado de Productos</h1>

            <div className="flex items-center justify-between mb-4">
                <h2 className="w-fit text-xs px-2 py-1 rounded-md text-white font-bold bg-primary">
                    {currentLabel}
                </h2>

                <div className="flex gap-2 font-semibold">
                    <button
                        onClick={() => router.push("/create")}
                        className="cursor-pointer text-xs border border-secondary text-secondary px-3 py-1 rounded hover:bg-secondary hover:text-white transition"
                    >
                        + Agregar producto
                    </button>
                    {statusFilter && (
                        <button
                            onClick={() => setStatusFilter(null)}
                            className="cursor-pointer text-xs border border-primary text-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition"
                        >
                            Mostrar todo
                        </button>
                    )}
                    {!statusFilter && (
                        <button
                            onClick={() => setStatusFilter("active")}
                            className="cursor-pointer text-xs border border-green-600 text-green-600 px-2 py-1 rounded hover:bg-green-600 hover:text-white transition"
                        >
                            Mostrar solo activos
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <TableSkeleton columns={8} />
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm min-w-[800px]">
                        <thead>
                            <tr className="bg-neutral-200 text-xs">
                                <th className="p-2 text-left cursor-pointer" onClick={() => toggleSort("model")}>
                                    Modelo {renderSortIcon("model")}
                                </th>
                                <th className="p-2 text-left">Categoría</th>
                                <th className="p-2 text-left cursor-pointer" onClick={() => toggleSort("storage")}>
                                    GB {renderSortIcon("storage")}
                                </th>
                                <th className="p-2 text-left cursor-pointer" onClick={() => toggleSort("is_used")}>
                                    Usado {renderSortIcon("is_used")}
                                </th>
                                <th className="p-2 text-left">Color</th>
                                <th className="p-2 text-left cursor-pointer" onClick={() => toggleSort("price")}>
                                    Precio {renderSortIcon("price")}
                                </th>
                                <th className="p-2 text-left cursor-pointer" onClick={() => toggleSort("is_offer")}>
                                    Oferta {renderSortIcon("is_offer")}
                                </th>
                                <th className="p-2 text-left cursor-pointer" onClick={() => toggleSort("status")}>
                                    Estado {renderSortIcon("status")}
                                </th>
                                <th className="p-2 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map(product => (
                                <tr
                                    key={product.id}
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('button')) return;
                                        router.push(`/edit/${product.id}`);
                                    }}
                                    className="border-t hover:bg-neutral-100 text-xs cursor-pointer transition-colors"
                                >
                                    <td className="p-2">{product.model}</td>
                                    <td className="p-2">{product.category_name + " - " + product.subcategory_name}</td>
                                    <td className="p-2">{product.storage}</td>
                                    <td className="p-2">{product.is_used ? "Usado" : "Sellado"}</td>
                                    <td className="p-2">{product.color}</td>
                                    <td className="p-2">${product.price}</td>
                                    <td className="p-2">
                                        {product.is_offer ? (
                                            <CirclePercent className="text-red-500" />
                                        ) : (
                                            <CirclePercent className="text-neutral-400" />
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {product.status === "active" ? (
                                            <CircleCheck className="text-green-600" />
                                        ) : (
                                            <CircleMinus className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="p-2 text-right">
                                        <EditPriceModal
                                            productId={product.id}
                                            productName={product.model || ""}
                                            currentPrice={product.price || 0}
                                            onUpdated={() => router.refresh()}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </article>
    );
}

export default DashboardClient;
