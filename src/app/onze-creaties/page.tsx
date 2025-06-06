import BookingButton from "@/components/BookingButton";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>Onze Creaties</h1>
        <BookingButton />
      </div>
      <Footer />
    </>
  );
};
export default page;
