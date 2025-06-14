import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2a1a0f] text-[#faf3ee] py-8 border-t border-[#5a3d2b]/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748090686/products/tokg8mxxfp6fs1waav4b.jpg"
                alt="Kapsalon Vilani Logo"
                className="w-[100px] h-[100px] mr-4 rounded-lg shadow-lg"
                width={100}
                height={100}
              />
              <div>
                <h2 className="text-xl font-bold text-[#faf3ee] mb-1">
                  Kapsalon Vilani
                </h2>
                <p className="text-sm text-[#faf3ee]/80">
                  Professionele Haarverzorging & Styling
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#a5673f] mb-2 uppercase tracking-wider">
                Contact
              </h3>
              <a
                href="tel:+3232944833"
                className="flex items-center gap-2 text-sm text-[#faf3ee]/90 hover:text-[#a5673f] transition-colors duration-200 mb-1"
              >
                <Phone size={16} className="text-green-500" />
                03 294 48 33
              </a>
              <a
                href="mailto:info@kapsalon-vilani.be"
                className="flex items-center gap-2 text-sm text-[#faf3ee]/90 hover:text-[#a5673f] transition-colors duration-200"
              >
                <Mail size={16} className="text-[#a5673f]" />
                info@kapsalon-vilani.be
              </a>
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#a5673f] mb-2 uppercase tracking-wider">
                Adres
              </h3>
              <div className="flex items-start gap-2 text-sm text-[#faf3ee]/90">
                <MapPin
                  size={16}
                  className="text-[#a5673f] mt-0.5 flex-shrink-0"
                />
                <div>
                  Puttestraat 3<br />
                  2940 Stabroek
                  <br />
                  België
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#5a3d2b]/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#faf3ee]/70">
              © {currentYear} Kapsalon Vilani. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#faf3ee]/70 hover:text-[#a5673f] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <a
                href="/terms"
                className="text-xs text-[#faf3ee]/70 hover:text-[#a5673f] transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
