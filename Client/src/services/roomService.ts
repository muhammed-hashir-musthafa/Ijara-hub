import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Room, CreateRoomPayload, UpdateRoomPayload, RoomQueryParams } from '../types/room';

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