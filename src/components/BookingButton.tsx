import { ArrowRight } from "lucide-react";

const BookingButton = () => {
  return (
    <div className="text-center">
      <a
        href="/book"
        className="inline-flex items-center px-8 py-4 text-white bg-[#a5673f] hover:bg-[#8b5633] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        Maak een afspraak
        <ArrowRight className="ml-2 w-5 h-5" />
      </a>
    </div>
  );
};
export default BookingButton;
