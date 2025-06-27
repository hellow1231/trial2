import { Publication, Program, ResearchCategory, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

class ApiService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': API_KEY,
      'Authorization': `Bearer ${API_KEY}`,
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}/rest/v1/${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, loading: false };
    } catch (error) {
      return { 
        data: null as T, 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      };
    }
  }

  // Publications
  async getPublications(category?: string): Promise<ApiResponse<Publication[]>> {
    let endpoint = 'publications?select=*,research_categories(*),publication_authors(*,authors(*))&order=publication_year.desc';
    
    if (category && category !== 'all') {
      endpoint += `&research_categories.slug=eq.${category}`;
    }

    return this.request<Publication[]>(endpoint);
  }

  async getPublication(id: string): Promise<ApiResponse<Publication | null>> {
    const endpoint = `publications?select=*,research_categories(*),publication_authors(*,authors(*))&id=eq.${id}`;
    const response = await this.request<Publication[]>(endpoint);
    
    if (response.data && response.data.length > 0) {
      return { data: response.data[0], loading: false };
    }
    
    return { data: null, error: 'Publication not found', loading: false };
  }

  async getCategories(): Promise<ApiResponse<ResearchCategory[]>> {
    return this.request<ResearchCategory[]>('research_categories?select=*&order=name.asc');
  }

  // Programs
  async getPrograms(status?: string): Promise<ApiResponse<Program[]>> {
    let endpoint = 'programs?select=*&order=created_at.desc';
    
    if (status && status !== 'all') {
      endpoint += `&status=eq.${status}`;
    }

    return this.request<Program[]>(endpoint);
  }

  async getProgram(slug: string): Promise<ApiResponse<Program | null>> {
    const endpoint = `programs?select=*&slug=eq.${slug}`;
    const response = await this.request<Program[]>(endpoint);
    
    if (response.data && response.data.length > 0) {
      return { data: response.data[0], loading: false };
    }
    
    return { data: null, error: 'Program not found', loading: false };
  }

  async getFeaturedPrograms(): Promise<ApiResponse<Program[]>> {
    return this.request<Program[]>('programs?select=*&is_featured=eq.true&order=created_at.desc');
  }

  // Search
  async searchPublications(query: string): Promise<ApiResponse<Publication[]>> {
    const endpoint = `publications?select=*,research_categories(*),publication_authors(*,authors(*))&or=(title.ilike.%${query}%,abstract.ilike.%${query}%)&order=publication_year.desc`;
    return this.request<Publication[]>(endpoint);
  }

  async searchPrograms(query: string): Promise<ApiResponse<Program[]>> {
    const endpoint = `programs?select=*&or=(title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%)&order=created_at.desc`;
    return this.request<Program[]>(endpoint);
  }

  // File Upload
  async uploadFile(file: File, bucket: string = 'public'): Promise<ApiResponse<{ path: string } | null>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/storage/v1/object/${bucket}/${file.name}`, {
        method: 'POST',
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      return { data: { path: data.path }, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Upload failed',
        loading: false 
      };
    }
  }
}

export const apiService = new ApiService();
export default apiService; 