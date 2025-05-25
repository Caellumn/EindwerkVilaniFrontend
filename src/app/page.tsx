import { Navbar } from "@/components/Navbar";
import { SimpleCarousel } from "@/components/SimpleCarousel";

// Sample data for the carousel - replace with your actual salon images
const carouselItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Professional Hair Styling",
    description: "Expert stylists for all your hair needs",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Modern Salon Interior",
    description: "Relaxing atmosphere for your comfort",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Hair Care Products",
    description: "Premium products for healthy hair",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Color Treatments",
    description: "Vibrant colors and professional techniques",
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
                Experience professional hair care with our expert stylists and
                premium services
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
                href="/Book"
                className="inline-flex items-center px-8 py-4 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Book Your Appointment
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
