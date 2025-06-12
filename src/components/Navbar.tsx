"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobileOrTablet } from "@/hooks/useMediaQuery";

import type { ComponentProps } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavbarContainer>
      {/* Logo */}
      <NavbarLogo />

      {/* Desktop Navigation - only show on desktop */}
      {!isMobileOrTablet && (
        <div className="flex items-center gap-2 flex-1 justify-center">
          <NavbarLink href="/">Home</NavbarLink>
          <NavbarLink href="/about">Over ons</NavbarLink>
          <NavbarLink href="/products">Producten</NavbarLink>
          <NavbarLink href="/contact">Contact</NavbarLink>
          <NavbarLink href="/onze-creaties">Onze creaties</NavbarLink>
        </div>
      )}

      {/* Desktop Book Button - only show on desktop */}
      {!isMobileOrTablet && (
        <div className="flex items-center">
          <NavbarLink href="/book" isHighlighted>
            Afspraak maken
          </NavbarLink>
        </div>
      )}

      {/* Mobile Menu Button - only render on mobile/tablet */}
      {isMobileOrTablet && (
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-[#5a3d2b] hover:bg-[#faf3ee] transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Navigation Menu - only show when open and on mobile/tablet */}
      {isMobileOrTablet && isOpen && (
        <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#a5673f]/20 rounded-2xl shadow-xl shadow-black/10 z-[9999]">
          <div className="flex flex-col p-4 space-y-2">
            <MobileNavLink href="/" onClick={closeMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMenu}>
              over ons
            </MobileNavLink>
            <MobileNavLink href="/products" onClick={closeMenu}>
              Producten
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMenu}>
              Contact
            </MobileNavLink>
            <MobileNavLink href="/onze-creaties" onClick={closeMenu}>
              Onze creaties
            </MobileNavLink>
            <MobileNavLink href="/book" onClick={closeMenu} isHighlighted>
              Afspraak maken
            </MobileNavLink>
          </div>
        </div>
      )}
    </NavbarContainer>
  );
};

export default Navbar;

export const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748090686/products/tokg8mxxfp6fs1waav4b.jpg"
          alt="Kapsalon Vilani - Logo"
          className="h-12 w-auto md:h-14"
          width={150}
          height={150}
        />
      </Link>
    </div>
  );
};

export const NavbarContainer = ({
  children,
  className,
  ...props
}: ComponentProps<"nav">) => {
  return (
    <nav
      className={cn(
        "relative flex w-full backdrop-blur-md bg-white/90 border border-[#a5673f]/20 rounded-b-2xl shadow-xl shadow-black/5 p-4 z-[9999]",
        className
      )}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      {...props}
    >
      <div className="flex w-full items-center justify-between">{children}</div>
    </nav>
  );
};

export const NavbarLink = ({
  children,
  href,
  isHighlighted,
  ...props
}: {
  isHighlighted?: boolean;
} & ComponentProps<"a">) => {
  return (
    <Link
      href={href || "/"}
      className={cn(
        "relative inline-flex text-sm lg:text-base h-10 lg:h-12 px-4 lg:px-8 tracking-tight items-center justify-center rounded-xl transition-all duration-200",
        isHighlighted
          ? "text-white bg-[#a5673f] hover:bg-[#8b5633] shadow-md hover:scale-105 font-medium"
          : "text-[#5a3d2b] hover:text-[#a5673f] hover:bg-[#faf3ee] hover:shadow-md hover:scale-[1.02] font-medium border border-transparent hover:border-[#a5673f]/30"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export const MobileNavLink = ({
  children,
  href,
  onClick,
  isHighlighted,
  ...props
}: {
  isHighlighted?: boolean;
  onClick?: () => void;
} & ComponentProps<"a">) => {
  return (
    <Link
      href={href || "/"}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center h-12 px-4 rounded-xl transition-all duration-200 font-medium",
        isHighlighted
          ? "text-white bg-[#a5673f] hover:bg-[#8b5633] shadow-md"
          : "text-[#5a3d2b] hover:text-[#a5673f] hover:bg-[#faf3ee] border border-transparent hover:border-[#a5673f]/30"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
