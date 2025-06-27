import { Publication, ResearchCategory, FilterOptions } from '../types';
import apiService from '../services/api';

export class PublicationModel {
  private publications: Publication[] = [];
  private categories: ResearchCategory[] = [];
  private loading = false;
  private error: string | null = null;

  // Getters
  getPublications(): Publication[] {
    return this.publications;
  }

  getCategories(): ResearchCategory[] {
    return this.categories;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): string | null {
    return this.error;
  }

  // Load publications
  async loadPublications(category?: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const response = await apiService.getPublications(category);
      
      if (response.error) {
        this.error = response.error;
      } else if (response.data) {
        this.publications = response.data;
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load publications';
    } finally {
      this.loading = false;
    }
  }

  // Load categories
  async loadCategories(): Promise<void> {
    try {
      const response = await apiService.getCategories();
      
      if (response.error) {
        this.error = response.error;
      } else if (response.data) {
        this.categories = response.data;
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load categories';
    }
  }

  // Get single publication
  async getPublication(id: string): Promise<Publication | null> {
    try {
      const response = await apiService.getPublication(id);
      
      if (response.error) {
        this.error = response.error;
        return null;
      }
      
      return response.data;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load publication';
      return null;
    }
  }

  // Filter publications
  filterPublications(options: FilterOptions): Publication[] {
    let filtered = [...this.publications];

    // Filter by category
    if (options.category && options.category !== 'all') {
      filtered = filtered.filter(pub => 
        pub.research_categories?.slug === options.category
      );
    }

    // Filter by year
    if (options.year) {
      filtered = filtered.filter(pub => 
        pub.publication_year === options.year
      );
    }

    // Search filter
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm)) ||
        (pub.journal && pub.journal.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  }

  // Get featured publications
  getFeaturedPublications(): Publication[] {
    return this.publications.filter(pub => pub.is_featured);
  }

  // Get publications by year
  getPublicationsByYear(year: number): Publication[] {
    return this.publications.filter(pub => pub.publication_year === year);
  }

  // Get unique years
  getUniqueYears(): number[] {
    const years = this.publications
      .map(pub => pub.publication_year)
      .filter((year): year is number => year !== null && year !== undefined);
    
    return [...new Set(years)].sort((a, b) => b - a);
  }

  // Get publications by category
  getPublicationsByCategory(categorySlug: string): Publication[] {
    return this.publications.filter(pub => 
      pub.research_categories?.slug === categorySlug
    );
  }

  // Search publications
  async searchPublications(query: string): Promise<Publication[]> {
    try {
      const response = await apiService.searchPublications(query);
      
      if (response.error) {
        this.error = response.error;
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Search failed';
      return [];
    }
  }

  // Get citation statistics
  getCitationStats(): { total: number; average: number; max: number } {
    if (this.publications.length === 0) {
      return { total: 0, average: 0, max: 0 };
    }

    const citations = this.publications.map(pub => pub.citations);
    const total = citations.reduce((sum, count) => sum + count, 0);
    const average = total / this.publications.length;
    const max = Math.max(...citations);

    return { total, average: Math.round(average), max };
  }

  // Clear error
  clearError(): void {
    this.error = null;
  }
}

export const publicationModel = new PublicationModel(); 