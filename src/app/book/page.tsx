import BookingForm from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapsalon Vilani - Afspraak maken",
  description: "Maak een afspraak voor een haarverzorging bij Kapsalon Vilani",
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

const Book = () => {
  return (
    <>
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  );
};
export default Book;
