export interface PaginatedResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type BookingSlot = {
  date: string;
  end_time: string | null;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  time: number;
  hairlength: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image?: string;
};

export type PaginatedProductResponse = {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type BookingPayload = {
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

// Enhanced form state for useActionState reducer pattern
export type BookingFormState = {
  // Loading and data state
  loading: boolean;
  initialData: InitialData | null;

  // Form fields
  name: string;
  email: string;
  telephone: string;
  gender: "male" | "female";
  remarks: string;
  selectedDate: Date | null;
  selectedServices: string[];
  selectedProducts: string[];

  // Submission state
  submitting: boolean;
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

// Action types for the reducer
export type BookingFormAction =
  | { type: "LOAD_INITIAL_DATA"; payload: InitialData }
  | { type: "LOAD_INITIAL_DATA_ERROR"; payload: string }
  | {
      type: "UPDATE_FIELD";
      field: "name" | "email" | "telephone" | "gender" | "remarks";
      value: string;
    }
  | { type: "TOGGLE_SERVICE"; serviceId: string }
  | { type: "TOGGLE_PRODUCT"; productId: string }
  | { type: "SET_DATE"; date: Date | null }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; message: string }
  | { type: "SUBMIT_ERROR"; message: string; errors?: Record<string, string> }
  | { type: "RESET_FORM" };

// Form state types for simple useActionState (keep for backward compatibility)
export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
  payload?: FormData;
};

export type BookingFormData = {
  selectedDate: Date | null;
  name: string;
  email: string;
  telephone: string;
  gender: "male" | "female";
  remarks: string;
  selectedServices: string[];
  selectedProducts: string[];
};

export type InitialData = {
  csrfToken: string;
  bookedSlots: BookingSlot[];
  services: Service[];
  products: Product[];
  productsPageData: PaginatedProductResponse;
};

export type BookingResponse = {
  id: string;
  date: string;
  end_time: string;
  name: string;
  email: string;
  telephone: string;
  gender: string;
  remarks: string;
  status: string;
  services?: Service[];
  products?: Product[];
  created_at: string;
  updated_at: string;
};

export type OpeningHours = {
  id: number;
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  status: "open" | "gesloten";
  open: string | null;
  close: string | null;
};
