import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { slugit } from "@/utils/helpers";
import { Product, PaginatedResponse } from "@/utils/types";

interface PageParams {
  id: string;
  slug: string;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const resp = await fetch(
    `https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/products`
  );
  const paginatedData = (await resp.json()) as PaginatedResponse;
  const products = paginatedData.data;

  return products.map((product) => ({
    id: product.id,
    slug: slugit(product.name),
  }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> => {
  const { id, slug } = await params;
  const resp = await fetch(
    `https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/products/${id}`
  );
  const data = (await resp.json()) as Product;
  return {
    title: data.name,
    description: data.description,
    alternates: {
      canonical: `/products/${id}/${slug}`,
    },
    openGraph: {
      title: data.name,
      description: data.description,
      images: [{ url: data.image }],
    },
  };
};

const ProductPage = async ({ params }: { params: Promise<PageParams> }) => {
  const { id } = await params;
  const resp = await fetch(
    `https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/products/${id}`
  );
  const data = (await resp.json()) as Product;
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5e6d8]">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/products"
              className="text-[#a5673f] hover:text-[#8b5633] transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Terug naar producten
            </Link>
          </nav>

          {/* Product Detail Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative">
                <div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-xl bg-white">
                  {data.image ? (
                    <Image
                      src={data.image}
                      alt={data.name}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300 p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#5a3d2b]/40">
                      <div className="text-center">
                        <ShoppingBag size={80} className="mx-auto mb-4" />
                        <span className="text-lg">
                          Geen afbeelding beschikbaar
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div className="flex flex-col space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#5a3d2b] mb-4">
                    {data.name}
                  </h1>
                  <p className="text-[#5a3d2b]/80 text-lg leading-relaxed">
                    {data.description}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-[#a5673f]/5 rounded-xl p-6 border border-[#a5673f]/10">
                  <h2 className="text-xl font-bold text-[#5a3d2b] mb-2">
                    Prijs
                  </h2>
                  <p className="text-3xl font-bold text-[#a5673f]">
                    € {data.price}
                  </p>
                </div>

                {/* Availability */}
                <div className="bg-[#a5673f]/5 rounded-xl p-6 border border-[#a5673f]/10">
                  <h2 className="text-xl font-bold text-[#5a3d2b] mb-2">
                    Beschikbaarheid
                  </h2>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        data.stock > 2 ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p
                      className={`font-medium text-lg ${
                        data.stock > 2 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data.stock > 2 ? "Beschikbaar" : "Niet beschikbaar"}
                    </p>
                  </div>
                  {data.stock > 2 && (
                    <p className="text-[#5a3d2b]/60 text-sm mt-2">
                      Op voorraad en klaar voor levering
                    </p>
                  )}
                  {data.stock <= 2 && (
                    <p className="text-[#5a3d2b]/60 text-sm mt-2">
                      Momenteel niet op voorraad
                    </p>
                  )}
                </div>

                {/* Call to Action */}
                <div className="bg-[#a5673f]/5 rounded-xl p-6 border border-[#a5673f]/10">
                  <h3 className="text-lg font-semibold text-[#5a3d2b] mb-3">
                    Interesse in dit product?
                  </h3>
                  <p className="text-[#5a3d2b]/80 mb-4">
                    Kom langs in ons salon voor persoonlijk advies en om dit
                    product te bekijken.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    Contact opnemen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
