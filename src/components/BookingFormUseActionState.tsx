"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BookingSlot,
  Service,
  Product,
  FormState,
  InitialData,
} from "@/utils/types";
import { createBookingAction, fetchInitialDataAction } from "@/serverActions";
import ProductsPagination from "./ProductsPagination";

const BookingForm = () => {
  // Form submission state using useActionState
  const [submissionState, formAction] = useActionState(createBookingAction, {
    success: undefined,
    message: undefined,
    errors: undefined,
  } as FormState);

  // Local state for form data and UI
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<InitialData | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [remarks, setRemarks] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load initial data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const result = await fetchInitialDataAction();
        if (result.success && result.data) {
          setInitialData(result.data);
        } else {
          console.error("Failed to load initial data:", result.message);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handle successful form submission and scroll to top
  useEffect(() => {
    if (submissionState.success === true) {
      // Reset form
      setSelectedDate(null);
      setSelectedServices([]);
      setSelectedProducts([]);
      setName("");
      setEmail("");
      setTelephone("");
      setRemarks("");
      if (formRef.current) {
        formRef.current.reset();
      }
    }

    // Scroll to top when form submission completes (success or error)
    if (submissionState.message && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [submissionState.success, submissionState.message]);

  const isDateDisabled = (date: Date) => {
    const now = new Date();
    const maxDate = new Date();
    maxDate.setMonth(now.getMonth() + 3);
    return date < now || date > maxDate;
  };

  const isTimeUnavailable = (time: Date) => {
    if (!initialData) return true;

    // Check business hours: 9 AM to 5 PM
    const hours = time.getHours();
    if (hours < 9 || hours >= 17) {
      return true; // Outside business hours
    }

    // Check if time slot is already booked
    return initialData.bookedSlots.some((slot: BookingSlot) => {
      if (!slot.end_time) return false;

      const slotStart = new Date(slot.date);
      const slotEnd = new Date(slot.end_time);
      return time >= slotStart && time < slotEnd;
    });
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev: string[]) =>
      prev.includes(serviceId)
        ? prev.filter((id: string) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev: string[]) =>
      prev.includes(productId)
        ? prev.filter((id: string) => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    if (!initialData) return 0;

    const serviceTotal = selectedServices.reduce(
      (total: number, serviceId: string) => {
        const service = initialData.services.find(
          (s: Service) => s.id === serviceId
        );
        return total + (service ? parseFloat(service.price) : 0);
      },
      0
    );

    const productTotal = selectedProducts.reduce(
      (total: number, productId: string) => {
        const product = initialData.products.find(
          (p: Product) => p.id === productId
        );
        return total + (product ? parseFloat(product.price) : 0);
      },
      0
    );

    return serviceTotal + productTotal;
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

  if (!initialData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <div className="text-center py-8">
          <p className="text-red-600">
            Fout bij het laden van gegevens. Probeer de pagina te vernieuwen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-[#5a3d2b] mb-6 text-center">
        Maak een Afspraak
      </h2>

      {/* Display messages */}
      {submissionState.message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submissionState.success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {submissionState.message}
        </div>
      )}

      <form ref={formRef} action={formAction} noValidate className="space-y-6">
        {/* Hidden fields for useActionState */}
        <input
          type="hidden"
          name="date"
          value={selectedDate?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="csrfToken"
          value={initialData?.csrfToken || ""}
        />
        <input
          type="hidden"
          name="services"
          value={JSON.stringify(selectedServices)}
        />
        <input
          type="hidden"
          name="products"
          value={JSON.stringify(selectedProducts)}
        />

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Naam *
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                submissionState.errors?.name
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            />
            {submissionState.errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {submissionState.errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                submissionState.errors?.email
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            />
            {submissionState.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {submissionState.errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Telefoon *
            </label>
            <input
              type="tel"
              name="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                submissionState.errors?.telephone
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            />
            {submissionState.errors?.telephone && (
              <p className="text-red-500 text-sm mt-1">
                {submissionState.errors.telephone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
              Geslacht
            </label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                submissionState.errors?.gender
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            >
              <option value="male">Man</option>
              <option value="female">Vrouw</option>
            </select>
            {submissionState.errors?.gender && (
              <p className="text-red-500 text-sm mt-1">
                {submissionState.errors.gender}
              </p>
            )}
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
            className={`w-full border rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] font-medium ${
              submissionState.errors?.date
                ? "border-red-500"
                : "border-[#a5673f]/30"
            }`}
            calendarClassName="!z-50"
            placeholderText="Selecteer datum en tijd"
          />
          {submissionState.errors?.date && (
            <p className="text-red-500 text-sm mt-1">
              {submissionState.errors.date}
            </p>
          )}
        </div>

        {/* Services Selection */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-4">
            Services (selecteer ten minste één service of product)
          </label>
          {submissionState.errors?.services && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
              {submissionState.errors.services}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialData.services.map((service: Service) => (
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

        {/* Products Selection - Replace with ProductsPagination Component */}
        <ProductsPagination
          selectedProducts={selectedProducts}
          onProductToggle={handleProductToggle}
        />

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-2">
            Opmerkingen
          </label>
          <textarea
            name="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
              submissionState.errors?.remarks
                ? "border-red-500"
                : "border-[#a5673f]/30"
            }`}
            placeholder="Eventuele opmerkingen..."
          />
          {submissionState.errors?.remarks && (
            <p className="text-red-500 text-sm mt-1">
              {submissionState.errors.remarks}
            </p>
          )}
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
          className="w-full bg-[#a5673f] hover:bg-[#8b5633] text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          Afspraak Maken
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
