export interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface Filters {
  search: string;
  city: string;
  priceRange: [number, number];
  rating: number;
  selectedStyles: string[];
  sortBy: "price-low" | "price-high" | "rating-high" | "recently-added";
}

export interface PhotographerStore {
  loading: boolean;
  photographer: Photographer | null;
  photographers: Photographer[];
  filters: Filters;
  getPhotographer: (id: number | string) => Promise<Photographer | void>;
  getPhotographers: () => Promise<void>;
  setFilters: (filters: Filters) => void;
}
