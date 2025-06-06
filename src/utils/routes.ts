import {
  BookingSlot,
  Service,
  PaginatedProductResponse,
  BookingPayload,
  InitialData,
  BookingResponse,
} from "./types";

const API_BASE_URL = "https://kapsalon-vilani-ft6cs.ondigitalocean.app/api";

// Centralized fetch function with error handling
async function apiRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Fetch CSRF token
export async function fetchCsrfToken(): Promise<{ csrf_token: string }> {
  return apiRequest("/csrf-token");
}

// Fetch all bookings
export async function fetchBookings(): Promise<BookingSlot[]> {
  return apiRequest("/bookings");
}

// Fetch all services
export async function fetchServices(): Promise<Service[]> {
  return apiRequest("/services");
}

// Fetch products with pagination
export async function fetchProducts(
  page: number = 1
): Promise<PaginatedProductResponse> {
  return apiRequest(`/products?page=${page}`);
}

// Fetch initial data for the booking form
export async function fetchInitialData(): Promise<InitialData> {
  try {
    const [csrfData, bookingsData, servicesData, productsData] =
      await Promise.all([
        fetchCsrfToken(),
        fetchBookings(),
        fetchServices(),
        fetchProducts(1),
      ]);

    return {
      csrfToken: csrfData.csrf_token,
      bookedSlots: bookingsData,
      services: servicesData,
      products: productsData.data,
      productsPageData: productsData,
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    throw new Error("Failed to load booking form data");
  }
}

// Create a new booking
export async function createBooking(
  payload: BookingPayload,
  csrfToken: string
): Promise<BookingResponse> {
  return apiRequest("/bookings/full-store", {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(payload),
  });
}
