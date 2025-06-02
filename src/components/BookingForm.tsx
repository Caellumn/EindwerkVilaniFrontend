"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type BookingSlot = {
  date: string;
  end_time: string | null;
};

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  time: number;
  hairlength: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
};

type PaginatedProductResponse = {
  data: Product[];
  total: number;
};

type BookingPayload = {
  date: string;
  name: string;
  email: string;
  telephone: string;
  gender: "male" | "female";
  remarks: string;
  status: string;
  services?: string[];
  products?: string[];
};

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<BookingSlot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [csrfRes, bookingsRes, servicesRes, productsRes] =
          await Promise.all([
            fetch(
              "https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/csrf-token",
              {
                credentials: "include",
              }
            ),
            fetch(
              "https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/bookings",
              {
                credentials: "include",
              }
            ),
            fetch(
              "https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/services"
            ),
            fetch(
              "https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/products"
            ),
          ]);

        const [csrfData, bookingsData, servicesData, productsData] =
          await Promise.all([
            csrfRes.json(),
            bookingsRes.json(),
            servicesRes.json(),
            productsRes.json(),
          ]);

        setCsrfToken(csrfData.csrf_token);
        setBookedSlots(bookingsData);
        setServices(servicesData);
        setProducts((productsData as PaginatedProductResponse).data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isDateDisabled = (date: Date) => {
    const now = new Date();
    const maxDate = new Date();
    maxDate.setMonth(now.getMonth() + 3);
    return date < now || date > maxDate;
  };

  const isTimeUnavailable = (time: Date) => {
    // Check business hours: 9 AM to 5 PM
    const hours = time.getHours();
    if (hours < 9 || hours >= 17) {
      return true; // Outside business hours
    }

    // Check if time slot is already booked
    return bookedSlots.some((slot) => {
      if (!slot.end_time) return false;

      const slotStart = new Date(slot.date);
      const slotEnd = new Date(slot.end_time);
      return time >= slotStart && time < slotEnd;
    });
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    const serviceTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service ? parseFloat(service.price) : 0);
    }, 0);

    const productTotal = selectedProducts.reduce((total, productId) => {
      const product = products.find((p) => p.id === productId);
      return total + (product ? parseFloat(product.price) : 0);
    }, 0);

    return serviceTotal + productTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !csrfToken || !name || !email || !telephone) {
      alert("Vul alle verplichte velden in.");
      return;
    }

    if (selectedServices.length === 0 && selectedProducts.length === 0) {
      alert("Selecteer ten minste één service of product.");
      return;
    }

    setSubmitting(true);

    // Debug logging for timezone issues
    console.log("=== BOOKING DEBUG INFO ===");
    console.log("Selected Date (local):", selectedDate);
    console.log("Selected Date toString():", selectedDate.toString());
    console.log("Selected Date toISOString():", selectedDate.toISOString());
    console.log("Timezone offset (minutes):", selectedDate.getTimezoneOffset());

    // Format date specifically for Amsterdam timezone
    const formatAmsterdamDateTime = (date: Date) => {
      // Create a new date adjusted for Amsterdam timezone (UTC+1/UTC+2)
      const amsterdamOffset = 1; // Amsterdam is UTC+1 (or UTC+2 in summer)
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;
      const amsterdamTime = new Date(utc + amsterdamOffset * 3600000);

      const year = amsterdamTime.getFullYear();
      const month = String(amsterdamTime.getMonth() + 1).padStart(2, "0");
      const day = String(amsterdamTime.getDate()).padStart(2, "0");
      const hours = String(amsterdamTime.getHours()).padStart(2, "0");
      const minutes = String(amsterdamTime.getMinutes()).padStart(2, "0");
      const seconds = String(amsterdamTime.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Alternative: Use Intl.DateTimeFormat for proper timezone handling
    const formatWithIntl = (date: Date) => {
      const amsterdamFormatter = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Amsterdam",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      return amsterdamFormatter.format(date).replace("T", " ");
    };

    // Format date in local timezone (original)
    const formatLocalDateTime = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formattedDateUTC = selectedDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedDateLocal = formatLocalDateTime(selectedDate);
    const formattedDateAmsterdam = formatAmsterdamDateTime(selectedDate);
    const formattedDateIntl = formatWithIntl(selectedDate);

    console.log("Formatted date for API (UTC):", formattedDateUTC);
    console.log("Formatted date for API (Local):", formattedDateLocal);
    console.log(
      "Formatted date for API (Amsterdam manual):",
      formattedDateAmsterdam
    );
    console.log("Formatted date for API (Amsterdam Intl):", formattedDateIntl);

    const payload: BookingPayload = {
      date: formattedDateIntl, // Using proper Amsterdam timezone
      name,
      email,
      telephone,
      gender,
      remarks: remarks.trim() || "Geen opmerkingen", // Default to meaningful text
      status: "pending",
    };

    if (selectedServices.length > 0) {
      payload.services = selectedServices;
    }

    if (selectedProducts.length > 0) {
      payload.products = selectedProducts;
    }

    console.log("Full payload being sent:", payload);
    console.log("========================");

    try {
      const res = await fetch(
        "https://kapsalon-vilani-ft6cs.ondigitalocean.app/api/bookings/full-store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 201) {
        const data = await res.json();
        console.log("SUCCESS: Booking created successfully!");
        console.log("Response data:", data);
        console.log("Date sent:", payload.date);
        console.log("Date received back:", data.date);
        console.log("End time calculated by backend:", data.end_time);
        alert("Afspraak succesvol gemaakt!");
        console.log(data);
        // Reset form
        setSelectedDate(null);
        setSelectedServices([]);
        setSelectedProducts([]);
        setName("");
        setEmail("");
        setTelephone("");
        setRemarks("");
      } else {
        const errorText = await res.text();
        console.error("Booking failed:", errorText);
        console.error("Status:", res.status);
        console.error("Payload that was sent:", payload);
        alert("Er is een fout opgetreden bij het maken van de afspraak.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Er is een fout opgetreden.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a5673f] mx-auto"></div>
          <p className="text-[#5a3d2b] mt-4">Laden van beschikbare tijden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-[#5a3d2b] mb-6 text-center">
        Maak een Afspraak
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Naam *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#a5673f]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#a5673f]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Telefoon *
            </label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full border border-[#a5673f]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Geslacht
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              className="w-full border border-[#a5673f]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b]"
            >
              <option value="male">Man</option>
              <option value="female">Vrouw</option>
            </select>
          </div>
        </div>

        {/* Date and Time Selection */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
            Datum en Tijd *
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            showTimeSelect
            timeIntervals={30}
            dateFormat="dd/MM/yyyy HH:mm"
            filterDate={(date: Date) => !isDateDisabled(date)}
            filterTime={(time: Date) => !isTimeUnavailable(time)}
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            onKeyDown={(e) => e.preventDefault()}
            className="w-full border border-[#a5673f]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b]"
            calendarClassName="!z-50"
            placeholderText="Selecteer datum en tijd"
            required
          />
        </div>

        {/* Services Selection */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-4">
            Services (selecteer ten minste één service of product)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedServices.includes(service.id)
                    ? "border-[#a5673f] bg-[#a5673f]/10"
                    : "border-[#a5673f]/30 hover:border-[#a5673f]"
                }`}
                onClick={() => handleServiceToggle(service.id)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleServiceToggle(service.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#a5673f]"
                    />
                    <h4 className="font-semibold text-[#5a3d2b]">
                      {service.name}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#5a3d2b]/70">
                      {service.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-[#a5673f] font-bold">
                        €{service.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Selection */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-4">
            Producten (optioneel)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedProducts.includes(product.id)
                    ? "border-[#a5673f] bg-[#a5673f]/10"
                    : "border-[#a5673f]/30 hover:border-[#a5673f]"
                }`}
                onClick={() => handleProductToggle(product.id)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleProductToggle(product.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#a5673f]"
                    />
                    <h4 className="font-semibold text-[#5a3d2b]">
                      {product.name}
                    </h4>
                  </div>
                  <div>
                    <p className="text-sm text-[#5a3d2b]/70 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-[#a5673f] font-bold">
                        €{product.price}
                      </span>
                      <span className="text-sm text-[#5a3d2b]/60">
                        Voorraad: {product.stock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
            Opmerkingen
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            className="w-full border border-[#a5673f]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b]"
            placeholder="Eventuele opmerkingen..."
          />
        </div>

        {/* Total Price */}
        {(selectedServices.length > 0 || selectedProducts.length > 0) && (
          <div className="bg-[#a5673f]/5 rounded-lg p-4 border border-[#a5673f]/20">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[#5a3d2b]">
                Totaal:
              </span>
              <span className="text-2xl font-bold text-[#a5673f]">
                €{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#a5673f] hover:bg-[#8b5633] text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Bezig met boeken..." : "Afspraak Maken"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
