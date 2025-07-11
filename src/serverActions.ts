"use server";

import { BookingPayload, FormState } from "./utils/types";
import { createBooking } from "./utils/routes";

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

  if (cleanPhone.length < 9) {
    return "Telefoonnummer moet minimaal 9 cijfers bevatten";
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

// Simplified action for form submission only
export async function bookingFormAction(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extract form data
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const telephone = (formData.get("telephone") as string)?.trim() || "";
    const gender = (formData.get("gender") as string) || "male";
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
        payload: formData,
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
        payload: formData,
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
        payload: formData,
      };
    }

    // Parse and format date
    const selectedDate = new Date(dateString);
    const formattedDate = formatAmsterdamDateTime(selectedDate);

    // Create booking payload
    const payload: BookingPayload = {
      date: formattedDate,
      name,
      email,
      telephone,
      gender: gender as "male" | "female",
      remarks: remarks || "Geen opmerkingen",
      status: "pending",
    };

    if (selectedServices.length > 0) {
      payload.services = selectedServices;
    }

    if (selectedProducts.length > 0) {
      payload.products = selectedProducts;
    }

    // Create booking
    await createBooking(payload, csrfToken);

    return {
      success: true,
      message:
        "Afspraak succesvol gemaakt! Je ontvangt een bevestiging per email.",
    };
  } catch (error) {
    console.error("Error in booking submission:", error);

    // Handle specific API errors
    if (error instanceof Error) {
      if (error.message.includes("400")) {
        return {
          success: false,
          message: "Ongeldige gegevens verzonden. Controleer je invoer.",
          payload: formData,
        };
      }
      if (error.message.includes("409")) {
        return {
          success: false,
          message:
            "De totale duur van je geselecteerde behandelingen overlapt met een bestaande afspraak. Kies een ander tijdstip.",
          payload: formData,
        };
      }
      if (error.message.includes("422")) {
        return {
          success: false,
          message:
            "De ingevoerde gegevens zijn ongeldig. Controleer alle velden.",
          payload: formData,
        };
      }
    }

    return {
      success: false,
      message:
        "Er is een fout opgetreden bij het maken van de afspraak. Probeer het later opnieuw.",
      payload: formData,
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
