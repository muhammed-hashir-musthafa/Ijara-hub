import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { User, UpdateUserPayload } from '../types/auth';
import { OwnerProfile } from '../types/owner';

// User Service
export const getUsers = async (): Promise<{ users: User[] }> => {
  const response: AxiosResponse = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: string): Promise<{ data: { user: User } }> => {
  const response: AxiosResponse = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<{ message: string; user: User }> => {
  const response: AxiosResponse = await api.put(`/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const response: AxiosResponse = await api.delete(`/users/${id}`);
  return response.data;
};

export const getOwnerProfile = async (id: string): Promise<{ data: { owner: OwnerProfile } }> => {
  const response: AxiosResponse = await api.get(`/users/${id}/profile`);
  return response.data;
};