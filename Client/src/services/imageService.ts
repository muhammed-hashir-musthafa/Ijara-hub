import { UploadService } from '../lib/upload';

export interface ImageItem {
  url: string;
  key: string;
  id?: string; // For temporary client-side tracking
}

export class ImageService {
  // Extract key from S3 URL
  static extractKeyFromUrl(url: string): string {
    // Support multiple S3 URL formats
    const patterns = [
      /https:\/\/[^\/]+\.s3\.[^\/]+\.amazonaws\.com\/(.+)/, // bucket.s3.region.amazonaws.com/key
      /https:\/\/[^\/]+\.s3\.amazonaws\.com\/(.+)/, // bucket.s3.amazonaws.com/key
      /https:\/\/s3\.[^\/]+\.amazonaws\.com\/[^\/]+\/(.+)/, // s3.region.amazonaws.com/bucket/key
      /https:\/\/s3\.amazonaws\.com\/[^\/]+\/(.+)/ // s3.amazonaws.com/bucket/key
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return '';
  }

  // Convert URLs to ImageItems
  static urlsToImageItems(urls: string[]): ImageItem[] {
    return urls.map((url, index) => ({
      url,
      key: this.extractKeyFromUrl(url),
      id: `img-${Date.now()}-${index}`,
    }));
  }

  // Convert ImageItems back to URLs (filter out blob URLs)
  static imageItemsToUrls(items: ImageItem[]): string[] {
    return items
      .filter(item => !item.url.startsWith('blob:'))
      .map(item => item.url);
  }

  // Check if URL is a blob URL
  static isBlobUrl(url: string): boolean {
    return url.startsWith('blob:');
  }

  // Check if URL is an S3 URL
  static isS3Url(url: string): boolean {
    return url.includes('amazonaws.com') && !url.startsWith('blob:');
  }

  // Delete single image
  static async deleteImage(imageItem: ImageItem): Promise<void> {
    if (imageItem.key) {
      await UploadService.deleteFile(imageItem.key);
    }
  }

  // Delete multiple images
  static async deleteImages(imageItems: ImageItem[]): Promise<void> {
    await Promise.all(
      imageItems
        .filter(item => item.key)
        .map(item => UploadService.deleteFile(item.key))
    );
  }

  // Remove image from array without deleting from S3
  static removeImageFromArray(images: ImageItem[], imageToRemove: ImageItem): ImageItem[] {
    return images.filter(img => img.id !== imageToRemove.id);
  }

  // Add new images to existing array
  static addImagesToArray(existingImages: ImageItem[], newUrls: string[]): ImageItem[] {
    const newImages = this.urlsToImageItems(newUrls);
    return [...existingImages, ...newImages];
  }
}