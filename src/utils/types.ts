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

// Form state types for useActionState
export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
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
