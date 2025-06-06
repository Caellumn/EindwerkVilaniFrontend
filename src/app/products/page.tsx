import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { slugit } from "@/utils/helpers";
//types
import { PaginatedResponse } from "@/utils/types";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Kapsalon Vilani - Producten",
  description:
    "Ontdek de unieke producten van Kapsalon Vilani te verkrijgen in ons salon in Putte Stabroek",
  openGraph: {
    title: "Kapsalon Vilani - Producten",
    description:
      "Ontdek de unieke producten van Kapsalon Vilani te verkrijgen in ons salon in Putte Stabroek",
    images: [
      {
        url: "https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748090686/products/tokg8mxxfp6fs1waav4b.jpg",
      },
    ],
  },
};

export const revalidate = 86400; //once a day

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page) : 1;

  const resp = await fetch(
    `https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/products?page=${currentPage}`
  );
  const paginatedData = (await resp.json()) as PaginatedResponse;
  const products = paginatedData.data;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5e6d8]">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#5a3d2b] mb-4">
              Onze Producten
            </h1>
            <p className="text-xl text-[#5a3d2b]/80 max-w-2xl mx-auto leading-relaxed">
              Ontdek onze selectie van premium haarverzorgingsproducten
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}/${slugit(product.name)}`}
                    className="group block"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 hover:shadow-[#a5673f]/20 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                      {/* Product Image */}
                      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-white">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-300 p-2"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[#5a3d2b]/40">
                            <div className="text-center">
                              <ShoppingBag size={48} className="mx-auto mb-2" />
                              <span className="text-sm">Geen afbeelding</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col flex-grow space-y-3">
                        <h2 className="text-xl font-bold text-[#5a3d2b] line-clamp-2">
                          {product.name}
                        </h2>

                        <p className="text-[#5a3d2b]/70 text-sm leading-relaxed line-clamp-3 flex-grow">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="pt-2">
                          <span className="text-2xl font-bold text-[#a5673f]">
                            € {product.price}
                          </span>
                        </div>

                        {/* Action Button - Always at bottom */}
                        <div className="w-full mt-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-[#a5673f] group-hover:bg-[#8b5633] text-white group-hover:scale-105 shadow-lg group-hover:shadow-xl">
                          <ShoppingBag size={18} />
                          Informatie
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {paginatedData.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mb-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20">
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      {paginatedData.prev_page_url ? (
                        <Link
                          href={`/products?page=${
                            paginatedData.current_page - 1
                          }`}
                          className="flex items-center px-3 py-2 text-[#5a3d2b] hover:bg-[#a5673f]/10 rounded-lg transition-colors"
                        >
                          <ChevronLeft size={20} />
                          <span className="hidden sm:inline ml-1">Vorige</span>
                        </Link>
                      ) : (
                        <div className="flex items-center px-3 py-2 text-[#5a3d2b]/40 cursor-not-allowed">
                          <ChevronLeft size={20} />
                          <span className="hidden sm:inline ml-1">Vorige</span>
                        </div>
                      )}

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1 mx-4">
                        {Array.from(
                          { length: paginatedData.last_page },
                          (_, i) => i + 1
                        ).map((pageNum) => (
                          <Link
                            key={pageNum}
                            href={`/products?page=${pageNum}`}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              pageNum === paginatedData.current_page
                                ? "bg-[#a5673f] text-white"
                                : "text-[#5a3d2b] hover:bg-[#a5673f]/10"
                            }`}
                          >
                            {pageNum}
                          </Link>
                        ))}
                      </div>

                      {/* Next Button */}
                      {paginatedData.next_page_url ? (
                        <Link
                          href={`/products?page=${
                            paginatedData.current_page + 1
                          }`}
                          className="flex items-center px-3 py-2 text-[#5a3d2b] hover:bg-[#a5673f]/10 rounded-lg transition-colors"
                        >
                          <span className="hidden sm:inline mr-1">
                            Volgende
                          </span>
                          <ChevronRight size={20} />
                        </Link>
                      ) : (
                        <div className="flex items-center px-3 py-2 text-[#5a3d2b]/40 cursor-not-allowed">
                          <span className="hidden sm:inline mr-1">
                            Volgende
                          </span>
                          <ChevronRight size={20} />
                        </div>
                      )}
                    </div>

                    {/* Page Info */}
                    <div className="text-center mt-2 text-xs text-[#5a3d2b]/60">
                      Pagina {paginatedData.current_page} van{" "}
                      {paginatedData.last_page}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#a5673f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="text-[#a5673f]" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-[#5a3d2b] mb-4">
                Geen producten beschikbaar
              </h3>
              <p className="text-[#5a3d2b]/70">
                Onze producten worden binnenkort toegevoegd. Kom terug later!
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20">
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-4">
                Interesse in onze producten?
              </h2>
              <p className="text-[#5a3d2b]/80 mb-6">
                Kom langs in ons salon voor persoonlijk advies over de beste
                producten voor uw haar
              </p>
              <BookingButton />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
