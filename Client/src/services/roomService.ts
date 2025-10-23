import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Room, CreateRoomPayload, UpdateRoomPayload, RoomQueryParams } from '../types/room';
import { UploadService } from '../lib/upload';

// Room Service
export const getRooms = async (params?: RoomQueryParams): Promise<{ success: boolean; message: string; data: { rooms: Room[]; pagination: { currentPage: number; totalPages: number; totalItems: number } } }> => {
  const response: AxiosResponse = await api.get('/rooms', { params });
  return response.data;
};

export const getRoomById = async (id: string): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  const response: AxiosResponse = await api.get(`/rooms/${id}`);
  return response.data;
};

export const createRoom = async (payload: CreateRoomPayload): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  const response: AxiosResponse = await api.post('/rooms', payload);
  return response.data;
};

export const updateRoom = async (id: string, payload: UpdateRoomPayload): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  const response: AxiosResponse = await api.put(`/rooms/${id}`, payload);
  return response.data;
};

export const deleteRoom = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response: AxiosResponse = await api.delete(`/rooms/${id}`);
  return response.data;
};

// Combined service: Upload images + Create room
export const createRoomWithImages = async (
  roomData: Omit<CreateRoomPayload, 'images'>,
  imageFiles: File[]
): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  let uploadResults: { url: string; key: string }[] = [];
  
  try {
    // Upload images first
    if (imageFiles.length > 0) {
      uploadResults = await UploadService.uploadMultiple(imageFiles, 'rooms');
    }

    // Create room with S3 URLs
    const payload: CreateRoomPayload = {
      ...roomData,
      images: uploadResults.map(result => result.url),
    };

    return await createRoom(payload);
  } catch (error) {
    // Cleanup uploaded images if room creation fails
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

// Combined service: Upload images + Update room
export const updateRoomWithImages = async (
  id: string,
  roomData: Omit<UpdateRoomPayload, 'images'>,
  imageFiles?: File[]
): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  let uploadResults: { url: string; key: string }[] = [];
  
  try {
    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      uploadResults = await UploadService.uploadMultiple(imageFiles, 'rooms');
    }

    // Update room with new image URLs (if any)
    const payload: UpdateRoomPayload = {
      ...roomData,
      ...(uploadResults.length > 0 && { images: uploadResults.map(result => result.url) }),
    };

    return await updateRoom(id, payload);
  } catch (error) {
    // Cleanup uploaded images if room update fails
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

// Update room with specific image URLs (for editing existing images)
export const updateRoomImages = async (
  id: string,
  imageUrls: string[]
): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  const payload: UpdateRoomPayload = { images: imageUrls };
  return await updateRoom(id, payload);
};

// Add new images to existing room
export const addRoomImages = async (
  id: string,
  imageFiles: File[]
): Promise<{ success: boolean; message: string; data: { room: Room } }> => {
  try {
    // Get current room
    const currentRoom = await getRoomById(id);
    const existingImages = currentRoom.data.room.images || [];

    // Upload new images
    const uploadResults = await UploadService.uploadMultiple(imageFiles, 'rooms');
    const newImageUrls = uploadResults.map(result => result.url);

    // Combine existing and new images
    const allImages = [...existingImages, ...newImageUrls];

    return await updateRoomImages(id, allImages);
  } catch (error) {
    throw error;
  }
};