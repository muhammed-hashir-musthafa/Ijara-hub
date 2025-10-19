export interface CarFilters {
  priceRange?: [number, number];
  categories?: string[];
  brands?: string[];
  fuelTypes?: string[];
  search?: string;
}

export interface Car {
  _id: string
  title: string
  description?: string
  brand: string
  model: string
  year: number
  licensePlate: string
  dailyRate: number
  category: 'economy' | 'compact' | 'midsize' | 'luxury' | 'suv' | 'sports' | 'convertible'
  transmission: 'manual' | 'automatic' | 'cvt'
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  seatingCapacity: number
  color: string
  location: 'dubai-marina' | 'downtown-dubai' | 'business-bay' | 'jumeirah' | 'deira' | 'abu-dhabi' | 'sharjah'
  address: {
    place?: string
    pincode?: number
  }
  amenities: string[]
  images: string[]
  status: 'active' | 'inactive' | 'pending'
  owner: string
  averageRating?: number
  reviewCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateCarPayload {
  title: string
  description?: string
  brand: string
  model: string
  year: number
  licensePlate: string
  dailyRate: number
  category: 'economy' | 'compact' | 'midsize' | 'luxury' | 'suv' | 'sports' | 'convertible'
  transmission: 'manual' | 'automatic' | 'cvt'
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  seatingCapacity: number
  color: string
  location: 'dubai-marina' | 'downtown-dubai' | 'business-bay' | 'jumeirah' | 'deira' | 'abu-dhabi' | 'sharjah'
  address: {
    place?: string
    pincode?: number
  }
  amenities: string[]
  images: string[]
}

export type UpdateCarPayload = Partial<CreateCarPayload>

export interface CarQueryParams {
  page?: number
  limit?: number
  category?: string
  brand?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  fuelType?: string
  transmission?: string
  status?: string
}

// Legacy interface for existing components
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
