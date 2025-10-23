import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { CreateReviewPayload, UpdateReviewPayload, Review } from '../types/review';

// Review Service
export const createReview = async (payload: CreateReviewPayload): Promise<{ success: boolean; message: string; data: { review: Review } }> => {
  const response: AxiosResponse = await api.post('/reviews', payload);
  return response.data;
};

export const getReviewsByProperty = async (propertyType: 'room' | 'car', propertyId: string, params?: { page?: number; limit?: number }): Promise<{ success: boolean; message: string; data: { reviews: Review[]; pagination: { currentPage: number; totalPages: number; totalItems: number } } }> => {
  const response: AxiosResponse = await api.get(`/reviews/${propertyType}/${propertyId}`, { params });
  return response.data;
};

export const updateReview = async (reviewId: string, payload: UpdateReviewPayload): Promise<{ success: boolean; message: string; data: { review: Review } }> => {
  const response: AxiosResponse = await api.put(`/reviews/${reviewId}`, payload);
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<{ success: boolean; message: string }> => {
  const response: AxiosResponse = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};