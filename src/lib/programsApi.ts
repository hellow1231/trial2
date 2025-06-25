import { supabase } from './supabase'

export interface Program {
  id: string
  title: string
  slug: string
  description?: string
  overview?: string
  objectives?: string[]
  approach?: string
  hero_image?: string
  status: string
  start_date?: string
  end_date?: string
  budget?: string
  beneficiaries?: string
  location?: string
  is_featured: boolean
  created_at: string
  updated_at: string
  team_members?: ProgramTeamMember[]
  partners?: ProgramPartner[]
  projects?: ProgramProject[]
}

export interface ProgramTeamMember {
  id: string
  program_id: string
  name: string
  title?: string
  role?: string
  image?: string
  email?: string
  bio?: string
  order_index: number
  created_at: string
}

export interface ProgramPartner {
  id: string
  program_id: string
  name: string
  logo?: string
  website?: string
  description?: string
  order_index: number
  created_at: string
}

export interface ProgramProject {
  id: string
  program_id: string
  title: string
  description?: string
  location?: string
  duration?: string
  status: string
  budget?: string
  beneficiaries?: string
  impact_metrics?: string[]
  image?: string
  order_index: number
  created_at: string
}

// Programs API
export const programsApi = {
  // Get all programs
  async getPrograms(filters?: {
    featured?: boolean;
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Program[]
  },

  // Get single program with all related data
  async getProgram(slug: string) {
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (programError) throw programError

    // Get team members
    const { data: teamMembers, error: teamError } = await supabase
      .from('program_team_members')
      .select('*')
      .eq('program_id', program.id)
      .order('order_index')

    if (teamError) throw teamError

    // Get partners
    const { data: partners, error: partnersError } = await supabase
      .from('program_partners')
      .select('*')
      .eq('program_id', program.id)
      .order('order_index')

    if (partnersError) throw partnersError

    // Get projects
    const { data: projects, error: projectsError } = await supabase
      .from('program_projects')
      .select('*')
      .eq('program_id', program.id)
      .order('order_index')

    if (projectsError) throw projectsError

    return {
      ...program,
      team_members: teamMembers,
      partners: partners,
      projects: projects
    } as Program
  },

  // Create program
  async createProgram(program: Omit<Program, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('programs')
      .insert(program)
      .select()
      .single()

    if (error) throw error
    return data as Program
  },

  // Update program
  async updateProgram(id: string, updates: Partial<Program>) {
    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Program
  },

  // Delete program
  async deleteProgram(id: string) {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Team Members
  async addTeamMember(teamMember: Omit<ProgramTeamMember, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('program_team_members')
      .insert(teamMember)
      .select()
      .single()

    if (error) throw error
    return data as ProgramTeamMember
  },

  async updateTeamMember(id: string, updates: Partial<ProgramTeamMember>) {
    const { data, error } = await supabase
      .from('program_team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ProgramTeamMember
  },

  async deleteTeamMember(id: string) {
    const { error } = await supabase
      .from('program_team_members')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Partners
  async addPartner(partner: Omit<ProgramPartner, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('program_partners')
      .insert(partner)
      .select()
      .single()

    if (error) throw error
    return data as ProgramPartner
  },

  async updatePartner(id: string, updates: Partial<ProgramPartner>) {
    const { data, error } = await supabase
      .from('program_partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ProgramPartner
  },

  async deletePartner(id: string) {
    const { error } = await supabase
      .from('program_partners')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Projects
  async addProject(project: Omit<ProgramProject, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('program_projects')
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data as ProgramProject
  },

  async updateProject(id: string, updates: Partial<ProgramProject>) {
    const { data, error } = await supabase
      .from('program_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ProgramProject
  },

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('program_projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}