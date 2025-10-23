import { useState } from 'react';
import { ImageItem, ImageService } from '@/services/imageService';
import { UploadService } from '@/lib/upload';
import { updateRoomImages } from '@/services/roomService';
import { updateCarImages } from '@/services/carService';

export const useImageManager = (initialImages: string[] = []) => {
  const [images, setImages] = useState<ImageItem[]>(
    ImageService.urlsToImageItems(initialImages)
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Remove image from UI (doesn't delete from S3)
  const removeImage = (imageToRemove: ImageItem) => {
    setImages(prev => ImageService.removeImageFromArray(prev, imageToRemove));
  };

  // Delete image from S3 and remove from UI
  const deleteImage = async (imageToDelete: ImageItem) => {
    setLoading(true);
    try {
      await ImageService.deleteImage(imageToDelete);
      setImages(prev => ImageService.removeImageFromArray(prev, imageToDelete));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add new images with immediate upload
  const addImages = async (files: File[], type: 'rooms' | 'cars' | 'profiles') => {
    setUploading(true);
    
    // Create preview URLs immediately
    const previewItems: ImageItem[] = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      key: '',
      id: `preview-${Date.now()}-${index}`,
    }));
    
    // Add preview images to UI immediately
    setImages(prev => [...prev, ...previewItems]);
    
    try {
      // Upload files to S3
      const uploadResults = await UploadService.uploadMultiple(files, type);
      
      // Replace preview URLs with S3 URLs
      setImages(prev => {
        const withoutPreviews = prev.filter(img => !img.id?.startsWith('preview-'));
        const s3Items = uploadResults.map((result, index) => ({
          url: result.url,
          key: result.key,
          id: `s3-${Date.now()}-${index}`,
        }));
        return [...withoutPreviews, ...s3Items];
      });
      
      // Clean up blob URLs
      previewItems.forEach(item => URL.revokeObjectURL(item.url));
      
      return uploadResults;
    } catch (error) {
      // Remove preview images on error
      setImages(prev => prev.filter(img => !img.id?.startsWith('preview-')));
      previewItems.forEach(item => URL.revokeObjectURL(item.url));
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Save current images to room/car (only S3 URLs)
  const saveRoomImages = async (roomId: string) => {
    setLoading(true);
    try {
      const s3ImageUrls = getImageUrls(); // Only S3 URLs
      const result = await updateRoomImages(roomId, s3ImageUrls);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveCarImages = async (carId: string) => {
    setLoading(true);
    try {
      const s3ImageUrls = getImageUrls(); // Only S3 URLs
      const result = await updateCarImages(carId, s3ImageUrls);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reorder images
  const reorderImages = (startIndex: number, endIndex: number) => {
    setImages(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // Reset to initial state
  const resetImages = () => {
    setImages(ImageService.urlsToImageItems(initialImages));
  };

  // Get current image URLs (only S3 URLs, no blob URLs)
  const getImageUrls = () => {
    const s3Images = images.filter(img => !img.url.startsWith('blob:') && !img.id?.startsWith('preview-'));
    return ImageService.imageItemsToUrls(s3Images);
  };

  return {
    images,
    loading,
    uploading,
    removeImage,
    deleteImage,
    addImages,
    saveRoomImages,
    saveCarImages,
    reorderImages,
    resetImages,
    getImageUrls,
  };
};