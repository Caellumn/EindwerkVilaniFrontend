"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface CarouselItem {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

interface SimpleCarouselProps {
  items: CarouselItem[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function SimpleCarousel({
  items,
  className,
  autoPlay = false,
  autoPlayInterval = 3000,
}: SimpleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) return null;

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Main carousel container */}
      <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl shadow-xl shadow-[#a5673f]/20 border border-[#a5673f]/20">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={item.image}
              alt={item.title || `Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1024px"
              priority={index === 0}
            />
            {/* Optional overlay with title and description */}
            {(item.title || item.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#5a3d2b]/80 to-transparent p-6">
                {item.title && (
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-white/90 text-sm">{item.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#a5673f]/80 hover:bg-[#a5673f] backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#a5673f]/80 hover:bg-[#a5673f] backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center space-x-3 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-200 border-2",
              index === currentIndex
                ? "bg-[#a5673f] border-[#a5673f] scale-125"
                : "bg-transparent border-[#a5673f]/50 hover:border-[#a5673f] hover:bg-[#a5673f]/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-[#5a3d2b]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}
