import BookingFormUseActionState from "@/components/BookingFormUseActionState";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";

// Force dynamic rendering to ensure fresh data on each visit
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kapsalon Vilani - Afspraak maken",
  description: "Maak een afspraak voor een haarverzorging bij Kapsalon Vilani",
  openGraph: {
    title: "Kapsalon Vilani",
    description:
      "Welkom bij Kapsalon Vilani, een professioneel haarzorgsalon in Putte Stabroek. Onze stijlvolle salon biedt een ruim assortiment aan haarproducten en haarzorgservices.",
    images: [
      {
        url: "/images/logo.png",
      },
    ],
  },
};

// Loading component for the booking form
const BookingFormLoading = () => (
  <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
    <LoadingSpinner
      title="Afspraakformulier laden..."
      description="We bereiden alles voor om je afspraak te maken."
      size="lg"
      className="py-8"
    />
  </div>
);

const Book = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#faf3ee] to-[#f5e6d8] py-8">
        <Suspense fallback={<BookingFormLoading />}>
          <BookingFormUseActionState />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Book;
