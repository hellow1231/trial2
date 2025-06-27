import { supabase } from './supabase'

export interface ProgramArea {
  id: string
  name: string
  slug: string
  description?: string
  hero_image?: string
  seo_title?: string
  seo_description?: string
  order_index: number
  created_at: string
  updated_at: string
  team_members?: ProgramAreaTeamMember[]
  partners?: ProgramAreaPartner[]
  projects?: Project[]
}

export interface Project {
  id: string
  program_area_id: string
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

export interface ProgramAreaTeamMember {
  id: string
  program_area_id: string
  name: string
  title?: string
  role?: string
  image?: string
  email?: string
  bio?: string
  order_index: number
  created_at: string
}

export interface ProgramAreaPartner {
  id: string
  program_area_id: string
  name: string
  logo?: string
  website?: string
  description?: string
  order_index: number
  created_at: string
}

// Program Areas API
export const programAreasApi = {
  // Get all program areas
  async getProgramAreas(filters?: {
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('program_areas')
      .select('*')
      .order('order_index', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1)
    }

    const { data, error } = await query
    if (error) throw error
    return data as ProgramArea[]
  },

  // Get single program area with all related data
  async getProgramArea(slug: string) {
    const { data: programArea, error: programAreaError } = await supabase
      .from('program_areas')
      .select('*')
      .eq('slug', slug)
      .single()

    if (programAreaError) throw programAreaError

    // Get team members
    const { data: teamMembers, error: teamError } = await supabase
      .from('program_area_team_members')
      .select('*')
      .eq('program_area_id', programArea.id)
      .order('order_index')

    if (teamError) throw teamError

    // Get partners
    const { data: partners, error: partnersError } = await supabase
      .from('program_area_partners')
      .select('*')
      .eq('program_area_id', programArea.id)
      .order('order_index')

    if (partnersError) throw partnersError

    // Get projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('program_area_id', programArea.id)
      .order('order_index')

    if (projectsError) throw projectsError

    return {
      ...programArea,
      team_members: teamMembers,
      partners: partners,
      projects: projects
    } as ProgramArea
  },

  // Create program area
  async createProgramArea(programArea: Omit<ProgramArea, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('program_areas')
      .insert(programArea)
      .select()
      .single()

    if (error) throw error
    return data as ProgramArea
  },

  // Update program area
  async updateProgramArea(id: string, updates: Partial<ProgramArea>) {
    const { data, error } = await supabase
      .from('program_areas')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ProgramArea
  },

  // Delete program area
  async deleteProgramArea(id: string) {
    const { error } = await supabase
      .from('program_areas')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Projects API
export const projectsApi = {
  // Get projects by program area
  async getProjectsByProgramArea(programAreaId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('program_area_id', programAreaId)
      .order('order_index')

    if (error) throw error
    return data as Project[]
  },

  // Create project
  async createProject(project: Omit<Project, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // Update project
  async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // Delete project
  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}