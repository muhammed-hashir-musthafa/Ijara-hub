import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Car, CreateCarPayload, UpdateCarPayload, CarQueryParams } from '../types/car';
import { UploadService } from '../lib/upload';

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

// Combined service: Upload images + Create car
export const createCarWithImages = async (
  carData: Omit<CreateCarPayload, 'images'>,
  imageFiles: File[]
): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  let uploadResults: { url: string; key: string }[] = [];
  
  try {
    // Upload images first
    if (imageFiles.length > 0) {
      uploadResults = await UploadService.uploadMultiple(imageFiles, 'cars');
    }

    // Create car with S3 URLs
    const payload: CreateCarPayload = {
      ...carData,
      images: uploadResults.map(result => result.url),
    };

    return await createCar(payload);
  } catch (error) {
    // Cleanup uploaded images if car creation fails
    if (uploadResults.length > 0) {
      try {
        await Promise.all(uploadResults.map(result => UploadService.deleteFile(result.key)));
      } catch (cleanupError) {
        console.error('Failed to cleanup uploaded images:', cleanupError);
      }
    }
    throw error;
  }
};

// Combined service: Upload images + Update car
export const updateCarWithImages = async (
  id: string,
  carData: Omit<UpdateCarPayload, 'images'>,
  imageFiles?: File[]
): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  let uploadResults: { url: string; key: string }[] = [];
  
  try {
    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      uploadResults = await UploadService.uploadMultiple(imageFiles, 'cars');
    }

    // Update car with new image URLs (if any)
    const payload: UpdateCarPayload = {
      ...carData,
      ...(uploadResults.length > 0 && { images: uploadResults.map(result => result.url) }),
    };

    return await updateCar(id, payload);
  } catch (error) {
    // Cleanup uploaded images if car update fails
    if (uploadResults.length > 0) {
      try {
        await Promise.all(uploadResults.map(result => UploadService.deleteFile(result.key)));
      } catch (cleanupError) {
        console.error('Failed to cleanup uploaded images:', cleanupError);
      }
    }
    throw error;
  }
};

// Update car with specific image URLs (for editing existing images)
export const updateCarImages = async (
  id: string,
  imageUrls: string[]
): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  const payload: UpdateCarPayload = { images: imageUrls };
  return await updateCar(id, payload);
};

// Add new images to existing car
export const addCarImages = async (
  id: string,
  imageFiles: File[]
): Promise<{ success: boolean; message: string; data: { car: Car } }> => {
  try {
    // Get current car
    const currentCar = await getCarById(id);
    const existingImages = currentCar.data.car.images || [];

    // Upload new images
    const uploadResults = await UploadService.uploadMultiple(imageFiles, 'cars');
    const newImageUrls = uploadResults.map(result => result.url);

    // Combine existing and new images
    const allImages = [...existingImages, ...newImageUrls];

    return await updateCarImages(id, allImages);
  } catch (error) {
    throw error;
  }
};