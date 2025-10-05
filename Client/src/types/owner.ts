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
   location: string;
   category: string;
   images: string[];
   amenities: string[];
 }
 
 export interface RoomForm extends BasePropertyForm {
   bedrooms: string;
   bathrooms: string;
   area: string;
 }
 
 export interface CarForm extends BasePropertyForm {
   brand: string;
   model: string;
   year: string;
   fuelType: string;
   transmission: string;
 }
 
 export type PropertyForm = RoomForm | CarForm;
 