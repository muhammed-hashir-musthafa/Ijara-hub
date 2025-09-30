export interface CarFilters {
  priceRange?: [number, number];
  categories?: string[];
  brands?: string[];
  fuelTypes?: string[];
  search?: string;
}

export interface CarType {
  id: number  | string;
  brand: string;
  model: string;
  title?: string;
  year: number;
  category: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  passengers: number;
  fuelType: string;
  transmission: string;
  features: string[];
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  discount?: number;
  isElectric?: boolean;
}

export interface CarCardProps {
  car: CarType;
  index: number;
  viewMode?: "grid" | "list";
}

export interface BookingCardProps {
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  title?: string;
}
