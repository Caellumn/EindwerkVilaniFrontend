"use client";

import { useActionState, useRef, useEffect, useState, Suspense } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BookingSlot,
  Service,
  Product,
  InitialData,
  FormState,
} from "@/utils/types";
import { bookingFormAction } from "@/serverActions";
import ProductsPagination from "./ProductsPagination";
import LoadingSpinner from "./LoadingSpinner";

interface BookingFormClientProps {
  initialData: InitialData;
}

const BookingFormClient = ({ initialData }: BookingFormClientProps) => {
  // Initial state for form submission only
  const initialFormState: FormState = {
    success: undefined,
    message: undefined,
    errors: undefined,
  };

  // useActionState for form submission
  const [formState, formAction, isPending] = useActionState(
    bookingFormAction,
    initialFormState
  );

  // Client-side form state
  const [gender, setGender] = useState<"male" | "female">("male");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPendingRef = useRef<boolean>(false);

  // Handle form reset on success
  useEffect(() => {
    if (formState.success === true) {
      // Reset form fields
      setSelectedDate(null);
      setSelectedServices([]);
      setSelectedProducts([]);

      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [formState.success]);

  // Scroll to top after form submission completes (when isPending changes from true to false)
  useEffect(() => {
    if (prevPendingRef.current && !isPending) {
      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    prevPendingRef.current = isPending;
  }, [isPending]);

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
    return initialData.bookedSlots.some((slot: BookingSlot) => {
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

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-[#5a3d2b] mb-6 text-center">
        Maak een Afspraak
      </h2>

      {/* Display messages from form submission */}
      {formState.message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            formState.success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {formState.message}
        </div>
      )}

      <form ref={formRef} action={formAction} noValidate className="space-y-6">
        {/* Hidden fields for form submission */}
        <input
          type="hidden"
          name="date"
          value={selectedDate?.toISOString() || ""}
        />
        <input type="hidden" name="csrfToken" value={initialData.csrfToken} />
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
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#5a3d2b] mb-2"
            >
              Naam *
            </label>
            <input
              name="name"
              defaultValue={(formState.payload?.get("name") as string) || ""}
              autoComplete="off"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                formState.errors?.name
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            />
            {formState.errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#5a3d2b] mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={(formState.payload?.get("email") as string) || ""}
              autoComplete="off"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                formState.errors?.email
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            />
            {formState.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-[#5a3d2b] mb-2"
            >
              Telefoon *
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              defaultValue={
                (formState.payload?.get("telephone") as string) || ""
              }
              autoComplete="off"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                formState.errors?.telephone
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            />
            {formState.errors?.telephone && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.telephone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-[#5a3d2b] mb-2"
            >
              Geslacht
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
                formState.errors?.gender
                  ? "border-red-500"
                  : "border-[#a5673f]/30"
              }`}
            >
              <option value="male">Man</option>
              <option value="female">Vrouw</option>
            </select>
            {formState.errors?.gender && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.gender}
              </p>
            )}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div>
          <label
            htmlFor="date-picker"
            className="block text-sm font-medium text-[#5a3d2b] mb-2"
          >
            Datum en Tijd *
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={setSelectedDate}
            showTimeSelect
            timeIntervals={30}
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy HH:mm"
            filterDate={(date: Date) => !isDateDisabled(date)}
            filterTime={(time: Date) => !isTimeUnavailable(time)}
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            onKeyDown={(e) => e.preventDefault()}
            autoComplete="off"
            className={`w-full border rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] font-medium ${
              formState.errors?.date ? "border-red-500" : "border-[#a5673f]/30"
            }`}
            calendarClassName="!z-50"
            placeholderText="Selecteer datum en tijd"
          />
          {formState.errors?.date && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.date}</p>
          )}
        </div>

        {/* Services Selection */}
        <div>
          <label className="block text-sm font-medium text-[#5a3d2b] mb-4">
            Behandelingen (selecteer ten minste één behandeling of product)
          </label>
          {formState.errors?.services && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
              {formState.errors.services}
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
                      id={`service-${service.id}`}
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleServiceToggle(service.id);
                      }}
                      className="sr-only"
                      aria-describedby={`service-${service.id}-description`}
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="font-semibold text-[#5a3d2b] cursor-pointer"
                    >
                      {service.name}
                    </label>
                  </div>
                  <div>
                    <p
                      id={`service-${service.id}-description`}
                      className="text-sm text-[#5a3d2b]/70"
                    >
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

        {/* Products Selection with Suspense boundary */}
        <Suspense
          fallback={
            <LoadingSpinner
              title="Producten laden..."
              description="Beschikbare producten worden opgehaald."
              size="sm"
            />
          }
        >
          <ProductsPagination
            selectedProducts={selectedProducts}
            onProductToggle={handleProductToggle}
          />
        </Suspense>

        {/* Remarks */}
        <div>
          <label
            htmlFor="remarks"
            className="block text-sm font-medium text-[#5a3d2b] mb-2"
          >
            Opmerkingen
          </label>
          <textarea
            id="remarks"
            name="remarks"
            rows={3}
            defaultValue={(formState.payload?.get("remarks") as string) || ""}
            autoComplete="off"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a5673f] text-[#5a3d2b] ${
              formState.errors?.remarks
                ? "border-red-500"
                : "border-[#a5673f]/30"
            }`}
            placeholder="Eventuele opmerkingen..."
          />
          {formState.errors?.remarks && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.remarks}
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
          disabled={isPending}
          className={`w-full py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200 ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#a5673f] hover:bg-[#8b5633] hover:shadow-xl hover:scale-105"
          } text-white`}
        >
          {isPending ? "Even geduld..." : "Afspraak Maken"}
        </button>
      </form>
    </div>
  );
};

export default BookingFormClient;
