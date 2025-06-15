import { fetchOpeningHours } from "@/utils/routes";
import { OpeningHours as OpeningHoursType } from "@/utils/types";

const OpeningHours = async () => {
  let openingHours: OpeningHoursType[] = [];
  let error: string | null = null;

  try {
    openingHours = await fetchOpeningHours();
  } catch (err) {
    error = "Kon openingstijden niet laden";
    console.error("Error fetching opening hours:", err);
  }

  const getDayName = (day: string) => {
    const dayNames: { [key: string]: string } = {
      monday: "Maandag",
      tuesday: "Dinsdag",
      wednesday: "Woensdag",
      thursday: "Donderdag",
      friday: "Vrijdag",
      saturday: "Zaterdag",
      sunday: "Zondag",
    };
    return dayNames[day] || day;
  };

  const formatTime = (time: string) => {
    // Convert from time  "09:00:00" to "09:00"
    return time.substring(0, 5);
  };

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {openingHours.map((day, index) => (
        <div
          key={day.id}
          className={`flex justify-between items-center py-2 ${
            index < openingHours.length - 1
              ? "border-b border-[#a5673f]/10"
              : ""
          }`}
        >
          <span className="font-medium text-[#5a3d2b]">
            {getDayName(day.day)}
          </span>
          <span
            className={`${
              day.status === "gesloten"
                ? "text-red-500 font-medium"
                : "text-[#5a3d2b]/80"
            }`}
          >
            {day.status === "gesloten"
              ? "Gesloten"
              : `${formatTime(day.open!)} - ${formatTime(day.close!)}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OpeningHours;
