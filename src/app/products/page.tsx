import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { slugit } from "@/utils/helpers";
//types
import { Product } from "@/utils/types";

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

const ProductsPage = async () => {
  const resp = await fetch(
    `https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/products`
  );
  const data = await resp.json();
  const products = data as Product[];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 hover:shadow-[#a5673f]/20 transition-all duration-300 hover:scale-[1.02] flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300 p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
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
                    <Link
                      href={`/products/${product.id}/${slugit(product.name)}`}
                      className="w-full mt-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-[#a5673f] hover:bg-[#8b5633] text-white hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <ShoppingBag size={18} />
                      Informatie
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
              <Link
                href="/Book"
                className="inline-flex items-center px-8 py-4 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Maak Een Afspraak
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
