import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Phone,
  Globe,
  Clock,
  MapPin,
  Facebook,
  ArrowRight,
  Instagram,
} from "lucide-react";

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
              Your trusted hair care professionals in Stabroek
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20">
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-6 flex items-center gap-3">
                <MapPin className="text-[#a5673f]" size={28} />
                Contact & Location
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-[#a5673f] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-[#5a3d2b]">Address</p>
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
                    <p className="font-semibold text-[#5a3d2b]">Phone</p>
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
                      href="http://www.vilani.be"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a5673f] hover:text-[#8b5633] transition-colors duration-200"
                    >
                      www.vilani.be
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
                      Follow us on Facebook
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
                      Follow us on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#a5673f]/10 border border-[#a5673f]/20">
              <h2 className="text-2xl font-bold text-[#5a3d2b] mb-6 flex items-center gap-3">
                <Clock className="text-[#a5673f]" size={28} />
                Opening Hours
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Monday</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Tuesday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Wednesday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Thursday</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Friday</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#a5673f]/10">
                  <span className="font-medium text-[#5a3d2b]">Saturday</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 16:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-[#5a3d2b]">Sunday</span>
                  <span className="text-[#5a3d2b]/80">09:00 - 13:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="/Book"
              className="inline-flex items-center px-8 py-4 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Book Your Appointment
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
