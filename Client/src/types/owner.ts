export type MetricCardProps = {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
  prefix?: string;
  suffix?: string;
};

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  category: PropertyCategory;
  location: string;
  price: number;
  currency: string;
  status: PropertyStatus;
  images: string[];
  rating: number;
  reviewCount: number;
  bookings: number;
  revenue: number;
  createdAt: string;
  amenities: string[];
  guests?: number;
  passengers?: number;
  description?: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  lastUpdated?: string;
  owner?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    properties: number;
    responseTime: string;
    joinedYear: string;
    verified: boolean;
    languages: string[];
    about: string;
  };
}

export type PropertyType = "room" | "car";
export type PropertyStatus = "active" | "inactive" | "pending";
export type PropertyCategory = "luxury" | "premium" | "standard" | "economy";

export interface Filters {
  search: string;
  type: string;
  status: string;
  location: string;
  category: string;
}

export interface BasePropertyForm {
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  amenities: string[];
}

export interface RoomForm extends BasePropertyForm {
  roomNumber: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  capacity: string;
  floor: string;
  place: string;
  pincode: string;
}

export interface CarForm extends BasePropertyForm {
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: string;
  color: string;
  place: string;
  pincode: string;
}

export type PropertyForm = RoomForm | CarForm;
