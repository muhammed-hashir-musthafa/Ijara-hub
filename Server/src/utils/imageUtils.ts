import s3Service from "../service/s3Service";
import config from "../config/config";

export class ImageUtils {
  // Validate if URLs are from our S3 bucket
  static validateImageUrls(urls: string[]): boolean {
    const bucketName = config.aws.s3Bucket;
    const region = config.aws.region;
    
    // console.log('Validating URLs:', urls);
    // console.log('Bucket:', bucketName, 'Region:', region);
    
    return urls.every(url => {
      // console.log('Testing URL:', url);
      
      // Support multiple S3 URL formats
      const patterns = [
        `https://${bucketName}.s3.${region}.amazonaws.com/`,
        `https://${bucketName}.s3.amazonaws.com/`,
        `https://s3.${region}.amazonaws.com/${bucketName}/`,
        `https://s3.amazonaws.com/${bucketName}/`
      ];
      
      // console.log('Against patterns:', patterns);
      
      const isValid = patterns.some(pattern => {
        const matches = url.startsWith(pattern);
        // console.log(`Pattern ${pattern} matches: ${matches}`);
        return matches;
      });
      
      // console.log('URL validation result:', isValid);
      return isValid;
    });
  }

  // Extract S3 keys from URLs
  static extractKeysFromUrls(urls: string[]): string[] {
    const bucketName = config.aws.s3Bucket;
    const region = config.aws.region;
    
    return urls.map(url => {
      // Handle different S3 URL formats
      const patterns = [
        `https://${bucketName}.s3.${region}.amazonaws.com/`,
        `https://${bucketName}.s3.amazonaws.com/`,
        `https://s3.${region}.amazonaws.com/${bucketName}/`,
        `https://s3.amazonaws.com/${bucketName}/`
      ];
      
      for (const pattern of patterns) {
        if (url.startsWith(pattern)) {
          return url.replace(pattern, '');
        }
      }
      
      // Fallback: return the URL as-is if no pattern matches
      return url;
    });
  }

  // Delete multiple images from S3
  static async deleteImages(imageUrls: string[]): Promise<void> {
    if (!imageUrls || imageUrls.length === 0) return;
    
    const keys = this.extractKeysFromUrls(imageUrls);
    await Promise.all(keys.map(key => s3Service.deleteFile(key)));
  }

  // Validate image URLs belong to correct type folder
  static validateImageType(urls: string[], expectedType: 'rooms' | 'cars' | 'profiles'): boolean {
    const keys = this.extractKeysFromUrls(urls);
    return keys.every(key => key.startsWith(`${expectedType}/`));
  }
}