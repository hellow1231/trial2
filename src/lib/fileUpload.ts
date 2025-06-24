// File upload utilities for handling PDF uploads
import { supabase } from './supabase';

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

export class FileUploadService {
  private static instance: FileUploadService;
  
  static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  async uploadPDF(
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<UploadResult> {
    // Generate a unique file path
    const filePath = `pdfs/${Date.now()}-${file.name}`;

    // Upload to Supabase Storage (bucket: 'publications')
    const { data, error } = await supabase.storage.from('publications').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw error;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from('publications').getPublicUrl(filePath);
    const url = publicUrlData.publicUrl;

    // Optionally, call onProgress with 100% when done
    onProgress?.(100);

    return {
      url,
      path: filePath,
      size: file.size,
      type: file.type,
    };
  }

  validatePDF(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return { valid: false, error: 'Please select a PDF file' };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
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

export const fileUploadService = FileUploadService.getInstance();