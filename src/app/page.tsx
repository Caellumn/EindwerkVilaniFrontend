import { Navbar } from "@/components/Navbar";
import { SimpleCarousel } from "@/components/SimpleCarousel";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapsalon Vilani onze Homepagina",
  description:
    "Ontdek de unieke producten van Kapsalon Vilani te verkrijgen in ons salon in Putte Stabroek",
  openGraph: {
    title: "Kapsalon Vilani",
    description:
      "Welkom bij Kapsalon Vilani, een professioneel haarzorgsalon in Putte Stabroek. Onze stijlvolle salon biedt een ruim assortiment aan haarproducten en haarzorgservices.",
    images: [
      {
        url: "https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748090686/products/tokg8mxxfp6fs1waav4b.jpg",
      },
    ],
  },
};

// Sample data for the carousel - replace with your actual salon images
const carouselItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748189993/fvp0twjhzd9lchbyy06r.jpg",
    title: "Professionele Haarverzorging & Styling",
    description: "Jouw haar, onze passie",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Stijlvol Saloninterieur",
    description: "Waar design en rust samenkomen",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Haarproducten van Topkwaliteit",
    description: "Topproducten voor stralend haar",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Kleuren met Klasse",
    description: "Haarkleur met karakter, techniek met klasse",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5e6d8]">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-[#5a3d2b] mb-4">
                Welcome to Kapsalon Vilani
              </h1>
              <p className="text-xl text-[#5a3d2b]/80 max-w-2xl mx-auto leading-relaxed">
                Ervaar professionele haarverzorging met onze experts en
                hoogwaardige services.
              </p>
            </div>

            {/* Simple Carousel */}
            <SimpleCarousel
              items={carouselItems}
              autoPlay={true}
              autoPlayInterval={4000}
              className="mb-12"
            />

            {/* Call to Action */}
            <div className="text-center">
              <a
                href="/book"
                className="inline-flex items-center px-8 py-4 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Maak een afspraak
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
