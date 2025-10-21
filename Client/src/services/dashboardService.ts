import api from "../lib/api";
import { Room } from "../types/room";
import { Car } from "../types/car";

export interface DashboardStats {
  totalProperties: number;
  totalReviews: number;
  averageRating: number;
}

export const getOwnerDashboardStats = async (
  ownerId: string
): Promise<DashboardStats> => {
  try {
    // Fetch owner's rooms and cars
    const [roomsResponse, carsResponse] = await Promise.all([
      api.get(`/rooms?owner=${ownerId}&limit=1000`),
      api.get(`/cars?owner=${ownerId}&limit=1000`),
    ]);
    const rooms: Room[] = roomsResponse.data?.data?.rooms || [];
    const cars: Car[] = carsResponse.data?.data?.cars || [];
    const totalProperties = rooms.length + cars.length;
    
    // console.log(cars, "asoijd", rooms)
    // Calculate total reviews and average rating
    let totalReviews = 0;
    let totalRatingSum = 0;

    [...rooms, ...cars].forEach((property: Room | Car) => {
      if (property.reviewCount) {
        totalReviews += property.reviewCount;
        totalRatingSum += (property.averageRating || 0) * property.reviewCount;
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
