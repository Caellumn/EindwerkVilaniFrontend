import { cn } from "@/utils/cn";
import Image from "next/image";

import type { ComponentProps } from "react";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarLogo />
      <div className="flex items-center gap-2 flex-1 justify-center">
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/products">Products</NavbarLink>
        <NavbarLink href="/contact">Contact</NavbarLink>
        <NavbarLink href="/voor-na">Voor en na</NavbarLink>
      </div>
      <div className="flex items-center">
        <NavbarLink href="/Book" isHighlighted>
          Book
        </NavbarLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;

export const NavbarLogo = () => {
  return (
    <div className="flex items-center mr-6">
      <Image
        src="https://res.cloudinary.com/dqq0m8xb3/image/upload/v1748090686/products/tokg8mxxfp6fs1waav4b.jpg"
        alt="Kapsalon Vilani - Logo"
        className="h-14 w-auto"
        width={150}
        height={150}
      />
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
        "flex w-full backdrop-blur-md bg-white/90 border border-[#a5673f]/20 rounded-b-2xl shadow-xl shadow-black/5 p-4 relative",
        className
      )}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      {...props}
    >
      <div className="gap-3 flex w-full items-center justify-between">
        {children}
      </div>
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
    <a
      href={href}
      className={cn(
        "relative inline-flex text-base h-12 px-8 tracking-tight items-center justify-center rounded-xl transition-all duration-200",
        isHighlighted
          ? "text-white bg-[#a5673f] hover:bg-[#8b5633] shadow-md hover:scale-105 font-medium"
          : "text-[#5a3d2b] hover:text-[#a5673f] hover:bg-[#faf3ee] hover:shadow-md hover:scale-[1.02] font-medium border border-transparent hover:border-[#a5673f]/30"
      )}
      {...props}
    >
      {children}
    </a>
  );
};
