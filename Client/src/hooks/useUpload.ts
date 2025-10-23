import { useState } from 'react';
import { UploadService, UploadResponse } from '@/lib/upload';
import { createRoomWithImages, updateRoomWithImages } from '@/services/roomService';
import { createCarWithImages, updateCarWithImages } from '@/services/carService';
import { CreateRoomPayload, UpdateRoomPayload } from '@/types/room';
import { CreateCarPayload, UpdateCarPayload } from '@/types/car';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadSingle = async (file: File, type: 'rooms' | 'cars' | 'profiles'): Promise<UploadResponse> => {
    setUploading(true);
    setProgress(0);
    
    try {
      const result = await UploadService.uploadSingle(file, type);
      setProgress(100);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadMultiple = async (files: File[], type: 'rooms' | 'cars' | 'profiles'): Promise<UploadResponse[]> => {
    setUploading(true);
    setProgress(0);
    
    try {
      const result = await UploadService.uploadMultiple(files, type);
      setProgress(100);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const createRoomWithFiles = async (
    roomData: Omit<CreateRoomPayload, 'images'>,
    imageFiles: File[]
  ) => {
    setUploading(true);
    setProgress(0);
    
    try {
      const result = await createRoomWithImages(roomData, imageFiles);
      setProgress(100);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const updateRoomWithFiles = async (
    id: string,
    roomData: Omit<UpdateRoomPayload, 'images'>,
    imageFiles?: File[]
  ) => {
    setUploading(true);
    setProgress(0);
    
    try {
      const result = await updateRoomWithImages(id, roomData, imageFiles);
      setProgress(100);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const createCarWithFiles = async (
    carData: Omit<CreateCarPayload, 'images'>,
    imageFiles: File[]
  ) => {
    setUploading(true);
    setProgress(0);
    
    try {
      const result = await createCarWithImages(carData, imageFiles);
      setProgress(100);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const updateCarWithFiles = async (
    id: string,
    carData: Omit<UpdateCarPayload, 'images'>,
    imageFiles?: File[]
  ) => {
    setUploading(true);
    setProgress(0);
    
    try {
      const result = await updateCarWithImages(id, carData, imageFiles);
      setProgress(100);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const deleteFile = async (key: string): Promise<void> => {
    setUploading(true);
    
    try {
      await UploadService.deleteFile(key);
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    progress,
    uploadSingle,
    uploadMultiple,
    deleteFile,
    createRoomWithFiles,
    updateRoomWithFiles,
    createCarWithFiles,
    updateCarWithFiles,
  };
};