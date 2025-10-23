import { AxiosResponse } from 'axios';
import api from './api';

export interface UploadResponse {
  url: string;
  key: string;
}

export interface UploadApiResponse {
  success: boolean;
  message: string;
  data: {
    url?: string;
    key?: string;
    files?: UploadResponse[];
    pagination: null;
  };
}

export class UploadService {
  static async uploadSingle(file: File, type: 'rooms' | 'cars' | 'profiles'): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response: AxiosResponse<UploadApiResponse> = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = response.data;
    return {
      url: data.url!,
      key: data.key!,
    };
  }

  static async uploadMultiple(files: File[], type: 'rooms' | 'cars' | 'profiles'): Promise<UploadResponse[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('type', type);

    const response: AxiosResponse<UploadApiResponse> = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data.files || [];
  }

  static async getFileUrl(key: string): Promise<UploadResponse> {
    const response: AxiosResponse<UploadApiResponse> = await api.get(`/upload/url/${encodeURIComponent(key)}`);
    const { data } = response.data;
    return {
      url: data.url!,
      key: data.key!,
    };
  }

  static async deleteFile(key: string): Promise<void> {
    await api.delete(`/upload/${encodeURIComponent(key)}`);
  }
}