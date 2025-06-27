export interface Project {
  id: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  location?: string;
  latitude?: number;
  longitude?: number;
  program_area_id?: string;
  created_at: string;
  updated_at: string;
  program_areas?: {
    id: string;
    name: string;
  };
  project_media?: ProjectMedia[];
  project_stakeholders?: ProjectStakeholder[];
  project_updates?: ProjectUpdate[];
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  file_url: string;
  file_type: 'image' | 'document';
  file_name?: string;
  file_size?: number;
  caption?: string;
  created_at: string;
}

export interface ProjectStakeholder {
  id: string;
  project_id: string;
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  role?: string;
  type: 'team_member' | 'partner' | 'beneficiary';
  created_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  update_date: string;
  milestone: boolean;
  created_by?: string;
  created_at: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: 'active' | 'completed' | 'on_hold' | 'cancelled';
  location?: string;
  latitude?: number;
  longitude?: number;
  program_area_id?: string;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}