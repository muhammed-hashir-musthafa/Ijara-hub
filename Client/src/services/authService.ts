import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { LoginPayload, SignupPayload, AdminLoginPayload, User } from '../types/auth';

// Auth Service
export const adminLogin = async (payload: AdminLoginPayload): Promise<{ success: boolean; message: string; data: { token: string; user: User } }> => {
  const response: AxiosResponse = await api.post('/auth/admin/login', payload);
  return response.data;
};

export const login = async (payload: LoginPayload): Promise<{ success: boolean; message: string; data: { token: string; user: User } }> => {
  const response: AxiosResponse = await api.post('/auth/login', payload);
  return response.data;
};

export const ownerSignup = async (payload: SignupPayload): Promise<{ success: boolean; message: string; data: { token: string; user: User } }> => {
  const response: AxiosResponse = await api.post('/auth/owner/signup', payload);
  return response.data;
};

export const renterSignup = async (payload: SignupPayload): Promise<{ success: boolean; message: string; data: { token: string; user: User } }> => {
  const response: AxiosResponse = await api.post('/auth/renter/signup', payload);
  return response.data;
};

export const logout = async (): Promise<{ success: boolean; message: string }> => {
  const response: AxiosResponse = await api.post('/auth/logout');
  return response.data;
};

export const getProfile = async (): Promise<{ success: boolean; message: string; data: { user: User } }> => {
  const response: AxiosResponse = await api.get('/auth/profile');
  return response.data;
};