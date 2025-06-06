import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Phone, Globe, Clock, MapPin, Facebook, Instagram } from "lucide-react";
import { Metadata } from "next";
import BookingButton from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Kapsalon Vilani - Contact",
  description: "Contacteer Kapsalon Vilani voor haarverzorging in Stabroek",
  openGraph: {
    title: "Kapsalon Vilani",
    description:
      "Welkom bij Kapsalon Vilani, een professioneel haarzorgsalon in Putte Stabroek. Onze stijlvolle salon biedt een ruim assortiment aan haarproducten en haarzorgservices.",
    images: [
      {
        url: "/public/images/logo.png",
      },
    ],
  },
};

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5e6d8]">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#5a3d2b] mb-4">
              Contact Kapsalon Vilani
            </h1>
            <p className="text-xl text-[#5a3d2b]/80 max-w-2xl mx-auto leading-relaxed">
              Vertrouwde handen voor jouw haar in Stabroek
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20">
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-6 flex items-center gap-3">
                <MapPin className="text-[#a5673f]" size={28} />
                Contact & Locatie
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-[#a5673f] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-[#5a3d2b]">Adres</p>
                    <p className="text-[#5a3d2b]/80">
                      Puttestraat 3<br />
                      2940 Stabroek
                      <br />
                      België
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="text-green-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-[#5a3d2b]">Telefoon</p>
                    <a
                      href="tel:+3232944833"
                      className="text-[#a5673f] hover:text-[#8b5633] transition-colors duration-200"
                    >
                      03 294 48 33
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe
                    className="text-[#a5673f] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-[#5a3d2b]">Website</p>
                    <a
                      href="https://kapsalon-vilani.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a5673f] hover:text-[#8b5633] transition-colors duration-200"
                    >
                      https://kapsalon-vilani.com/
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Facebook
                    className="text-[#a5673f] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-[#5a3d2b]">Facebook</p>
                    <a
                      href="https://www.facebook.com/Vilaniputtestabroekkapellen/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a5673f] hover:text-[#8b5633] transition-colors duration-200"
                    >
                      Volg ons op Facebook
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram
                    className="text-[#a5673f] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-[#5a3d2b]">Instagram</p>
                    <a
                      href="https://www.instagram.com/kapsalon_vilani/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a5673f] hover:text-[#8b5633] transition-colors duration-200"
                    >
                      Volg ons op Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20">
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-6 flex items-center gap-3">
                <Clock className="text-[#a5673f]" size={28} />
                Onze openingstijden
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Maandag</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Dinsdag</span>
                  <span className="text-red-500 font-medium">Gesloten</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Woensdag</span>
                  <span className="text-red-500 font-medium">Gesloten</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Donderdag</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Vrijdag</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Zaterdag</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 16:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-[#5a3d2b]">Zondag</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 13:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <BookingButton />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
