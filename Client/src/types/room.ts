// types/room.ts
export interface RoomType {
  id: number;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  amenities: string[];
  guests: number;
  bedrooms: number;
  bathrooms: number;
  category: string;
  isNew?: boolean;
  discount?: number;
  size: number;
}

export interface RoomCardProps {
  room: RoomType;
  index: number;
  viewMode?: "grid" | "list";
}

export interface Host {
  name: string;
  avatar: string;
  verified: boolean;
  superhost: boolean;
  rating: number;
  reviews: number;
  properties: number;
  responseRate: number;
  responseTime: string;
  joinedDate: string;
  bio: string;
  location: string;
  languages: string[];
}

export interface HostProfileModalProps {
  host: Host;
  isOpen: boolean;
  onClose: () => void;
}

