import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Heart,
  Scissors,
  Moon,
  PawPrint,
  ArrowRight,
  Instagram,
} from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5e6d8]">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#5a3d2b] mb-4">
              Onze Familie
            </h1>
            <p className="text-xl text-[#5a3d2b]/80 max-w-2xl mx-auto leading-relaxed">
              De passievolle professionals achter Kapsalon Vilani
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Nick */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748188349/trpafcsfbrpmxko4qss5.jpg"
                  alt="Nick - Hair Stylist"
                  fill
                  className="object-cover rounded-full border-4 border-[#a5673f]/30"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-2">Nick</h2>
              <p className="text-[#a5673f] font-medium mb-4 flex items-center justify-center gap-2">
                <Scissors size={18} />
                Professionele haarstylist
              </p>
              <p className="text-[#5a3d2b]/80 leading-relaxed">
                Ervaren kapper met een passie voor haarstyling en
                klantentevredenheid. Nick zorgt ervoor dat elke klant het salon
                verlaat met de perfecte look.
              </p>
            </div>

            {/* Vicky */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748189628/rulqnr8hyfxvgnx0ygzs.jpg"
                  alt="Vicky - Hair Stylist"
                  fill
                  className="object-cover rounded-full border-4 border-[#a5673f]/30"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-2">Vicky</h2>
              <p className="text-[#a5673f] font-medium mb-4 flex items-center justify-center gap-2">
                <Scissors size={18} />
                Professionele haarstylist
              </p>
              <p className="text-[#5a3d2b]/80 leading-relaxed">
                Getalenteerde kapster met een scherp oog voor detail en de
                nieuwste trends. Vicky luistert naar uw wensen en creëert de
                perfecte haarlook voor u.
              </p>
            </div>
          </div>

          {/* Salon Mascot Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 mb-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative w-64 h-64 flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748187527/qslnhtkcwyvi9rjn8nv5.jpg"
                  alt="Sheldon - Salon Mascotte"
                  fill
                  className="object-cover rounded-2xl border-4 border-[#a5673f]/30"
                  sizes="(max-width: 768px) 256px, 256px"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-[#5a3d2b] mb-4 flex items-center justify-center lg:justify-start gap-3">
                  <Heart className="text-red-500" size={32} />
                  Sheldon
                </h2>
                <p className="text-[#a5673f] font-medium mb-6 text-lg">
                  Onze vrolijke salon mascotte
                </p>
                <div className="space-y-4 text-[#5a3d2b]/80 leading-relaxed">
                  <p>
                    Naast Vicky en Nick wordt het salon af en toe opgevrolijkt
                    door onze vrolijke mascotte Sheldon.
                  </p>
                  <p>
                    Sheldon is onze relax-coach en ontvangt klanten geregeld met
                    een kwispelende staart. Hij houdt van aandacht, dutjes en is
                    100% hypoallergeen op vlak van gezelligheid.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <span className="px-4 py-2 bg-[#a5673f]/10 text-[#a5673f] rounded-full text-sm font-medium flex items-center gap-2">
                    <PawPrint size={16} />
                    Vriendelijk
                  </span>
                  <span className="px-4 py-2 bg-[#a5673f]/10 text-[#a5673f] rounded-full text-sm font-medium flex items-center gap-2">
                    <Moon size={16} />
                    Relax-Coach
                  </span>
                  <span className="px-4 py-2 bg-[#a5673f]/10 text-[#a5673f] rounded-full text-sm font-medium flex items-center gap-2">
                    <Heart size={16} />
                    Hypoallergeen Gezellig
                  </span>
                  <a
                    href="https://www.instagram.com/sheldon.the.amazing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#a5673f]/10 text-[#a5673f] rounded-full text-sm font-medium flex items-center gap-2 hover:bg-[#a5673f]/20 transition-colors duration-200"
                  >
                    <Instagram size={16} />
                    Sheldon&apos;s Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Values Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20 mb-12">
            <h2 className="text-3xl font-bold text-[#5a3d2b] mb-8 text-center">
              Waarom Kiezen Voor Kapsalon Vilani?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#a5673f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scissors className="text-[#a5673f]" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#5a3d2b] mb-2">
                  Ervaring
                </h3>
                <p className="text-[#5a3d2b]/80">
                  Jaren van ervaring in haarstyling en klantenzorg
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#a5673f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-[#a5673f]" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#5a3d2b] mb-2">
                  Passie
                </h3>
                <p className="text-[#5a3d2b]/80">
                  Gepassioneerd team dat houdt van wat ze doen
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#a5673f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PawPrint className="text-[#a5673f]" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#5a3d2b] mb-2">
                  Gezelligheid
                </h3>
                <p className="text-[#5a3d2b]/80">
                  Warme, vriendelijke sfeer met onze salon mascotte
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="/book"
              className="inline-flex items-center px-8 py-4 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Maak Een Afspraak
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
