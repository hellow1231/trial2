// Image upload utilities for handling program images
import { supabase } from './supabase';

export interface ImageUploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

export class ImageUploadService {
  private static instance: ImageUploadService;
  
  static getInstance(): ImageUploadService {
    if (!ImageUploadService.instance) {
      ImageUploadService.instance = new ImageUploadService();
    }
    return ImageUploadService.instance;
  }

  async uploadImage(
    file: File, 
    folder: string = 'programs',
    onProgress?: (progress: number) => void
  ): Promise<ImageUploadResult> {
    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from('images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw error;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
    const url = publicUrlData.publicUrl;

    // Call onProgress with 100% when done
    onProgress?.(100);

    return {
      url,
      path: filePath,
      size: file.size,
      type: file.type,
    };
  }

  validateImage(file: File): { valid: boolean; error?: string } {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Please select a valid image file (JPEG, PNG, or WebP)' };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 5MB' };
    }

    // Check if file is not empty
    if (file.size === 0) {
      return { valid: false, error: 'File cannot be empty' };
    }

    return { valid: true };
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const imageUploadService = ImageUploadService.getInstance();