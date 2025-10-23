export interface CreateReviewPayload {
  rating: number;
  comment: string;
  propertyType: 'room' | 'car';
  propertyId: string;
}

export interface UpdateReviewPayload {
  rating: number;
  comment: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  propertyType: 'room' | 'car';
  propertyId: string;
  reviewer: {
    _id: string;
    fname: string;
    lname: string;
    profileImage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReviewQueryParams {
  page?: number;
  limit?: number;
}