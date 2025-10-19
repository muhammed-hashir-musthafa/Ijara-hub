export interface Room {
  _id: string
  roomNumber: string
  title: string
  description?: string
  category: 'hotel' | 'apartment' | 'villa' | 'studio' | 'penthouse'
  type: 'single' | 'double' | 'suite' | 'deluxe' | 'presidential'
  rooms: {
    bedroom: number
    bathroom: number
  }
  areaSqft?: number
  pricePerNight: number
  capacity: number
  floor: number
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

export interface CreateRoomPayload {
  roomNumber: string
  title: string
  description?: string
  category: 'hotel' | 'apartment' | 'villa' | 'studio' | 'penthouse'
  type: 'single' | 'double' | 'suite' | 'deluxe' | 'presidential'
  rooms: {
    bedroom: number
    bathroom: number
  }
  areaSqft?: number
  pricePerNight: number
  capacity: number
  floor: number
  location: 'dubai-marina' | 'downtown-dubai' | 'business-bay' | 'jumeirah' | 'deira' | 'abu-dhabi' | 'sharjah'
  address: {
    place?: string
    pincode?: number
  }
  amenities: string[]
  images: string[]
}

export type UpdateRoomPayload = Partial<CreateRoomPayload>

export interface RoomQueryParams {
  page?: number
  limit?: number
  category?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  status?: string
}

// Legacy interface for existing components
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

