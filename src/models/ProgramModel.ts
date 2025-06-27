import { Program, FilterOptions } from '../types';
import apiService from '../services/api';

export class ProgramModel {
  private programs: Program[] = [];
  private loading = false;
  private error: string | null = null;

  // Getters
  getPrograms(): Program[] {
    return this.programs;
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): string | null {
    return this.error;
  }

  // Load programs
  async loadPrograms(status?: string): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const response = await apiService.getPrograms(status);
      
      if (response.error) {
        this.error = response.error;
      } else if (response.data) {
        this.programs = response.data;
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load programs';
    } finally {
      this.loading = false;
    }
  }

  // Get single program
  async getProgram(slug: string): Promise<Program | null> {
    try {
      const response = await apiService.getProgram(slug);
      
      if (response.error) {
        this.error = response.error;
        return null;
      }
      
      return response.data;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load program';
      return null;
    }
  }

  // Get featured programs
  async getFeaturedPrograms(): Promise<Program[]> {
    try {
      const response = await apiService.getFeaturedPrograms();
      
      if (response.error) {
        this.error = response.error;
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load featured programs';
      return [];
    }
  }

  // Filter programs
  filterPrograms(options: FilterOptions): Program[] {
    let filtered = [...this.programs];

    // Filter by status
    if (options.status && options.status !== 'all') {
      filtered = filtered.filter(program => program.status === options.status);
    }

    // Search filter
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchTerm) ||
        (program.description && program.description.toLowerCase().includes(searchTerm)) ||
        (program.location && program.location.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  }

  // Get programs by status
  getProgramsByStatus(status: string): Program[] {
    return this.programs.filter(program => program.status === status);
  }

  // Get programs by location
  getProgramsByLocation(location: string): Program[] {
    return this.programs.filter(program => 
      program.location && program.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Get unique locations
  getUniqueLocations(): string[] {
    const locations = this.programs
      .map(program => program.location)
      .filter((location): location is string => location !== null && location !== undefined);
    
    return [...new Set(locations)].sort();
  }

  // Get unique statuses
  getUniqueStatuses(): string[] {
    const statuses = this.programs.map(program => program.status);
    return [...new Set(statuses)].sort();
  }

  // Search programs
  async searchPrograms(query: string): Promise<Program[]> {
    try {
      const response = await apiService.searchPrograms(query);
      
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

  // Get program statistics
  getProgramStats(): { 
    total: number; 
    active: number; 
    completed: number; 
    planning: number;
    featured: number;
  } {
    const total = this.programs.length;
    const active = this.programs.filter(p => p.status === 'Active').length;
    const completed = this.programs.filter(p => p.status === 'Completed').length;
    const planning = this.programs.filter(p => p.status === 'Planning').length;
    const featured = this.programs.filter(p => p.is_featured).length;

    return { total, active, completed, planning, featured };
  }

  // Get programs by budget range
  getProgramsByBudgetRange(minBudget: number, maxBudget: number): Program[] {
    return this.programs.filter(program => {
      if (!program.budget) return false;
      
      // Extract numeric value from budget string (e.g., "$1.5M" -> 1500000)
      const budgetStr = program.budget.replace(/[$,]/g, '');
      const multiplier = budgetStr.includes('M') ? 1000000 : budgetStr.includes('K') ? 1000 : 1;
      const budget = parseFloat(budgetStr.replace(/[MK]/g, '')) * multiplier;
      
      return budget >= minBudget && budget <= maxBudget;
    });
  }

  // Get recent programs
  getRecentPrograms(limit: number = 5): Program[] {
    return this.programs
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  // Clear error
  clearError(): void {
    this.error = null;
  }
}

export const programModel = new ProgramModel(); 