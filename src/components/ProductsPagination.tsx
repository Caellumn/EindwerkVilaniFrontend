"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";
import { Product, PaginatedProductResponse } from "@/utils/types";
import { fetchProducts } from "@/utils/routes";

interface ProductsPaginationProps {
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

const ProductsPagination = ({
  selectedProducts,
  onProductToggle,
}: ProductsPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Use SWR for data fetching with caching
  const {
    data: pageData,
    error,
    isLoading,
  } = useSWR<PaginatedProductResponse>(
    `products-page-${currentPage}`,
    () => fetchProducts(currentPage),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  const handlePageChange = (newPage: number) => {
    if (isLoading || newPage === currentPage) return;

    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          Fout bij het laden van producten. Probeer opnieuw.
        </p>
      </div>
    );
  }

  const products = pageData?.data || [];

  return (
    <div>
      <label className="block text-sm font-medium text-[#5a3d2b] mb-4">
        Producten (optioneel)
      </label>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedProducts.includes(product.id)
                ? "border-[#a5673f] bg-[#a5673f]/10"
                : "border-[#a5673f]/30 hover:border-[#a5673f]"
            } ${isLoading ? "opacity-50" : ""}`}
            onClick={() => !isLoading && onProductToggle(product.id)}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (!isLoading) onProductToggle(product.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#a5673f]"
                  disabled={isLoading}
                />
                <h4 className="font-semibold text-[#5a3d2b]">{product.name}</h4>
              </div>
              <div>
                <p className="text-sm text-[#5a3d2b]/70 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between mt-2">
                  <span className="text-[#a5673f] font-bold">
                    €{product.price}
                  </span>
                  <span className="text-sm text-[#5a3d2b]/60">
                    Voorraad: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && products.length === 0 && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a5673f] mx-auto"></div>
          <p className="text-[#5a3d2b] mt-2">Producten laden...</p>
        </div>
      )}

      {/* Pagination Controls */}
      {pageData && pageData.last_page > 1 && (
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-[#a5673f]/20">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pageData.prev_page_url || isLoading}
                className="flex items-center px-2 py-1 text-[#5a3d2b] hover:bg-[#a5673f]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline ml-1 text-sm">Vorige</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {Array.from(
                  { length: Math.min(pageData.last_page, 5) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isLoading}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                          pageNum === currentPage
                            ? "bg-[#a5673f] text-white"
                            : "text-[#5a3d2b] hover:bg-[#a5673f]/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pageData.next_page_url || isLoading}
                className="flex items-center px-2 py-1 text-[#5a3d2b] hover:bg-[#a5673f]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline mr-1 text-sm">Volgende</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Page Info */}
            <div className="text-center mt-1 text-xs text-[#5a3d2b]/60">
              {isLoading ? (
                <span>Laden...</span>
              ) : (
                <>
                  Pagina {pageData.current_page} van {pageData.last_page}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPagination;
