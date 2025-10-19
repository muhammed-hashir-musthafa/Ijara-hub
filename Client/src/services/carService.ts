import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Car, CreateCarPayload, UpdateCarPayload, CarQueryParams } from '../types/car';

// Car Service
export const getCars = async (params?: CarQueryParams): Promise<{ success: boolean; message: string; data: { cars: Car[]; pagination: { currentPage: number; totalPages: number; totalItems: number } } }> => {
  const response: AxiosResponse = await api.get('/cars', { params });
  return response.data;
};

export const getCarById = async (id: string): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  const response: AxiosResponse = await api.get(`/cars/${id}`);
  return response.data;
};

export const createCar = async (payload: CreateCarPayload): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  const response: AxiosResponse = await api.post('/cars', payload);
  return response.data;
};

export const updateCar = async (id: string, payload: UpdateCarPayload): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  const response: AxiosResponse = await api.put(`/cars/${id}`, payload);
  return response.data;
};

export const deleteCar = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response: AxiosResponse = await api.delete(`/cars/${id}`);
  return response.data;
};