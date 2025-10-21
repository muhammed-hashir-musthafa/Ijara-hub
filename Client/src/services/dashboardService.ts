import api from "../lib/api";
import { Room } from "../types/room";
import { Car } from "../types/car";
import { Review } from "../types/review";

export interface DashboardStats {
  totalProperties: number;
  totalReviews: number;
  averageRating: number;
}

export const getOwnerDashboardStats = async (
  ownerId: string
): Promise<DashboardStats> => {
  try {
    // Fetch owner's rooms and cars with populated reviews
    const [roomsResponse, carsResponse] = await Promise.all([
      api.get(`/rooms?owner=${ownerId}&limit=1000`),
      api.get(`/cars?owner=${ownerId}&limit=1000`),
    ]);
    
    const rooms: Room[] = roomsResponse.data?.data?.rooms || [];
    const cars: Car[] = carsResponse.data?.data?.cars || [];
    const totalProperties = rooms.length + cars.length;
    
    // Calculate total reviews and average rating
    let totalReviews = 0;
    let totalRatingSum = 0;

    [...rooms, ...cars].forEach((property: Room | Car) => {
      // Check if reviews exist and are populated
      if (property.reviews && Array.isArray(property.reviews)) {
        const reviewCount = property.reviews.length;
        totalReviews += reviewCount;
        
        // Calculate rating sum for this property
        if (reviewCount > 0) {
          const propertyRatingSum = property.reviews.reduce((sum: number, review: Review) => {
            return sum + (review.rating || 0);
          }, 0);
          totalRatingSum += propertyRatingSum;
        }
      }
    });

    const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

    return {
      totalProperties,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
};
