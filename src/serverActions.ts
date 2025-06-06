"use server";

import {
  FormState,
  BookingPayload,
  InitialData,
  PaginatedProductResponse,
} from "./utils/types";
import { fetchInitialData, fetchProducts, createBooking } from "./utils/routes";

// Validation functions
function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Voer een geldig emailadres in";
  }
  return null;
}

function validatePhoneNumber(phone: string): string | null {
  // Dutch phone number validation (supports various formats)
  const phoneRegex = /^(\+31|0031|0)[1-9][0-9]{8}$|^(\+31|0031|0)[6][0-9]{8}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  if (cleanPhone.length < 10) {
    return "Telefoonnummer moet minimaal 10 cijfers bevatten";
  }

  if (!phoneRegex.test(cleanPhone)) {
    return "Voer een geldig Nederlands telefoonnummer in";
  }

  return null;
}

function validateName(name: string): string | null {
  if (name.trim().length < 2) {
    return "Naam moet minimaal 2 tekens bevatten";
  }

  if (name.trim().length > 100) {
    return "Naam mag maximaal 100 tekens bevatten";
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-'\.]+$/;
  if (!nameRegex.test(name.trim())) {
    return "Naam mag alleen letters, spaties, koppeltekens en apostroffen bevatten";
  }

  return null;
}

function validateDate(dateString: string): string | null {
  if (!dateString) {
    return "Selecteer een datum en tijd";
  }

  const selectedDate = new Date(dateString);
  const now = new Date();
  const maxDate = new Date();
  maxDate.setMonth(now.getMonth() + 3);

  if (isNaN(selectedDate.getTime())) {
    return "Ongeldige datum geselecteerd";
  }

  if (selectedDate < now) {
    return "De geselecteerde datum kan niet in het verleden liggen";
  }

  if (selectedDate > maxDate) {
    return "Je kunt maximaal 3 maanden vooruit boeken";
  }

  // Check business hours (9 AM to 5 PM)
  const hours = selectedDate.getHours();
  if (hours < 9 || hours >= 17) {
    return "Selecteer een tijd tussen 09:00 en 17:00";
  }

  // Check if it's a weekend (assuming business is closed on weekends)
  const dayOfWeek = selectedDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return "We zijn gesloten in het weekend. Selecteer een werkdag";
  }

  return null;
}

function validateServicesAndProducts(
  services: string[],
  products: string[]
): string | null {
  if (services.length === 0 && products.length === 0) {
    return "Selecteer ten minste één service of product";
  }
  return null;
}

function validateRemarks(remarks: string): string | null {
  if (remarks.length > 1000) {
    return "Opmerkingen mogen maximaal 1000 tekens bevatten";
  }
  return null;
}

// Server action to fetch initial data
export async function fetchInitialDataAction(): Promise<
  FormState & { data?: InitialData }
> {
  try {
    const data = await fetchInitialData();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in fetchInitialDataAction:", error);
    return {
      success: false,
      message: "Kon geen gegevens laden. Probeer de pagina te vernieuwen.",
    };
  }
}

// Server action to fetch products with pagination
export async function fetchProductsAction(
  currentState: FormState,
  formData: FormData
): Promise<FormState & { data?: PaginatedProductResponse }> {
  try {
    const page = parseInt(formData.get("page") as string) || 1;

    if (page < 1) {
      return {
        success: false,
        message: "Ongeldige paginanummer",
      };
    }

    const data = await fetchProducts(page);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in fetchProductsAction:", error);
    return {
      success: false,
      message: "Kon producten niet laden. Probeer opnieuw.",
    };
  }
}

// Helper function to format date for Amsterdam timezone
function formatAmsterdamDateTime(date: Date): string {
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
}

// Server action to create a booking
export async function createBookingAction(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extract form data
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const telephone = (formData.get("telephone") as string)?.trim() || "";
    const gender = formData.get("gender") as "male" | "female";
    const remarks = (formData.get("remarks") as string)?.trim() || "";
    const dateString = formData.get("date") as string;
    const csrfToken = formData.get("csrfToken") as string;
    const servicesJson = formData.get("services") as string;
    const productsJson = formData.get("products") as string;

    // Initialize errors object
    const errors: Record<string, string> = {};

    // Validate individual fields
    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhoneNumber(telephone);
    if (phoneError) errors.telephone = phoneError;

    const dateError = validateDate(dateString);
    if (dateError) errors.date = dateError;

    const remarksError = validateRemarks(remarks);
    if (remarksError) errors.remarks = remarksError;

    // Validate CSRF token
    if (!csrfToken) {
      return {
        success: false,
        message:
          "Beveiligingstoken ontbreekt. Vernieuw de pagina en probeer opnieuw.",
      };
    }

    // Validate gender
    if (!gender || (gender !== "male" && gender !== "female")) {
      errors.gender = "Selecteer een geldig geslacht";
    }

    // Parse and validate services and products
    let selectedServices: string[] = [];
    let selectedProducts: string[] = [];

    try {
      selectedServices = servicesJson ? JSON.parse(servicesJson) : [];
      selectedProducts = productsJson ? JSON.parse(productsJson) : [];
    } catch {
      return {
        success: false,
        message: "Ongeldige gegevens verzonden. Probeer opnieuw.",
      };
    }

    const servicesProductsError = validateServicesAndProducts(
      selectedServices,
      selectedProducts
    );
    if (servicesProductsError) {
      errors.services = servicesProductsError;
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Controleer de invoer en probeer opnieuw.",
        errors,
      };
    }

    // Parse and format date
    const selectedDate = new Date(dateString);
    const formattedDate = formatAmsterdamDateTime(selectedDate);

    console.log("=== BOOKING DEBUG INFO ===");
    console.log("Selected Date (local):", selectedDate);
    console.log("Formatted date for API (Amsterdam):", formattedDate);

    // Create booking payload
    const payload: BookingPayload = {
      date: formattedDate,
      name,
      email,
      telephone,
      gender,
      remarks: remarks || "Geen opmerkingen",
      status: "pending",
    };

    if (selectedServices.length > 0) {
      payload.services = selectedServices;
    }

    if (selectedProducts.length > 0) {
      payload.products = selectedProducts;
    }

    console.log("Full payload being sent:", payload);

    // Create booking
    const result = await createBooking(payload, csrfToken);

    console.log("SUCCESS: Booking created successfully!");
    console.log("Response data:", result);

    return {
      success: true,
      message:
        "Afspraak succesvol gemaakt! Je ontvangt een bevestiging per email.",
    };
  } catch (error) {
    console.error("Error in createBookingAction:", error);

    // Handle specific API errors
    if (error instanceof Error) {
      if (error.message.includes("400")) {
        return {
          success: false,
          message: "Ongeldige gegevens verzonden. Controleer je invoer.",
        };
      }
      if (error.message.includes("409")) {
        return {
          success: false,
          message:
            "Deze tijd is niet meer beschikbaar. Kies een ander tijdstip.",
        };
      }
      if (error.message.includes("422")) {
        return {
          success: false,
          message:
            "De ingevoerde gegevens zijn ongeldig. Controleer alle velden.",
        };
      }
    }

    return {
      success: false,
      message:
        "Er is een fout opgetreden bij het maken van de afspraak. Probeer het later opnieuw.",
    };
  }
}
