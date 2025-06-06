import { fetchInitialData } from "@/utils/routes";
import { InitialData } from "@/utils/types";
import BookingFormClient from "./BookingFormClient";

// Server Component - fetches initial data server-side
const BookingForm = async () => {
  let initialData: InitialData | null = null;
  let error: string | null = null;

  try {
    initialData = await fetchInitialData();
  } catch (err) {
    console.error("Error fetching initial data:", err);
    error = "Fout bij het laden van gegevens. Probeer de pagina te vernieuwen.";
  }

  // Show error state if data loading failed
  if (error || !initialData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <div className="text-center py-8">
          <p className="text-red-600">{error || "Kon geen gegevens laden."}</p>
        </div>
      </div>
    );
  }

  // Pass initial data to client component
  return <BookingFormClient initialData={initialData} />;
};

export default BookingForm;
