export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold' | 'cancelled';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  start_date: string;
  end_date?: string;
  location?: string;
  budget?: number;
  program_area_id?: string;
  created_at: string;
  updated_at: string;
  project_media?: ProjectMedia[];
  project_stakeholders?: ProjectStakeholder[];
  project_updates?: ProjectUpdate[];
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  created_at: string;
}

export interface ProjectStakeholder {
  id: string;
  project_id: string;
  name: string;
  role: string;
  organization?: string;
  email?: string;
  phone?: string;
  created_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  description: string;
  update_date: string;
  created_at: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  status: ProjectStatus;
  start_date: string;
  end_date?: string;
  location?: string;
  budget?: number;
  program_area_id?: string;
}