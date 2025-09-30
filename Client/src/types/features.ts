export type FeaturedListing = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: Amenity[];
  guests?: number;
  passengers?: number;
  type: "room" | "car";
};

export type Amenity =
  | "Wifi"
  | "Coffee"
  | "TV"
  | "AC"
  | "GPS"
  | "Insurance"
  | "24/7 Support"
  | "Chauffeur";
