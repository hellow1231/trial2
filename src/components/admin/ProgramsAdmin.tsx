import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, Target, Users, Building, FolderOpen, Eye } from 'lucide-react';
import { usePrograms } from '../../hooks/usePrograms';
import { programsApi } from '../../lib/programsApi';
import { imageUploadService } from '../../lib/imageUpload';
import ImageUpload from './ImageUpload';
import type { Program, ProgramTeamMember, ProgramPartner, ProgramProject } from '../../lib/programsApi';

const ProgramsAdmin = () => {
  const { programs, loading, refetch } = usePrograms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Image upload states
  const [selectedHeroImage, setSelectedHeroImage] = useState<globalThis.File | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [heroImageProgress, setHeroImageProgress] = useState(0);
  const [heroImageError, setHeroImageError] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    overview: '',
    objectives: [''],
    approach: '',
    hero_image: '',
    status: 'Active',
    start_date: '',
    end_date: '',
    budget: '',
    beneficiaries: '',
    location: '',
    is_featured: false
  });

  const [teamMembers, setTeamMembers] = useState<Partial<ProgramTeamMember>[]>([]);
  const [partners, setPartners] = useState<Partial<ProgramPartner>[]>([]);
  const [projects, setProjects] = useState<Partial<ProgramProject>[]>([]);

  const openModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        slug: program.slug,
        description: program.description || '',
        overview: program.overview || '',
        objectives: program.objectives || [''],
        approach: program.approach || '',
        hero_image: program.hero_image || '',
        status: program.status,
        start_date: program.start_date || '',
        end_date: program.end_date || '',
        budget: program.budget || '',
        beneficiaries: program.beneficiaries || '',
        location: program.location || '',
        is_featured: program.is_featured
      });
      setTeamMembers(program.team_members || []);
      setPartners(program.partners || []);
      setProjects(program.projects || []);
    } else {
      setEditingProgram(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        overview: '',
        objectives: [''],
        approach: '',
        hero_image: '',
        status: 'Active',
        start_date: '',
        end_date: '',
        budget: '',
        beneficiaries: '',
        location: '',
        is_featured: false
      });
      setTeamMembers([]);
      setPartners([]);
      setProjects([]);
    }
    
    // Reset image upload states
    setSelectedHeroImage(null);
    setUploadingHeroImage(false);
    setHeroImageProgress(0);
    setHeroImageError('');
    
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
    setSelectedHeroImage(null);
    setHeroImageError('');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleHeroImageSelect = (file: globalThis.File) => {
    const validation = imageUploadService.validateImage(file);
    if (!validation.valid) {
      setHeroImageError(validation.error || 'Invalid file');
      return;
    }
    
    setSelectedHeroImage(file);
    setHeroImageError('');
  };

  const handleHeroImageRemove = () => {
    setSelectedHeroImage(null);
    setFormData(prev => ({ ...prev, hero_image: '' }));
    setHeroImageError('');
  };

  const uploadHeroImage = async (): Promise<string> => {
    if (!selectedHeroImage) return formData.hero_image;

    setUploadingHeroImage(true);
    setHeroImageProgress(0);

    try {
      const result = await imageUploadService.uploadImage(
        selectedHeroImage, 
        'programs/hero', 
        setHeroImageProgress
      );
      return result.url;
    } catch (error) {
      setHeroImageError('Failed to upload image. Please try again.');
      throw error;
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    setTeamMembers(prev => [...prev, {
      name: '',
      title: '',
      role: 'TEAM MEMBER',
      image: '',
      email: '',
      bio: '',
      order_index: prev.length
    }]);
  };

  const updateTeamMember = (index: number, field: string, value: string | number) => {
    setTeamMembers(prev => prev.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ));
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== index));
  };

  const addPartner = () => {
    setPartners(prev => [...prev, {
      name: '',
      logo: '',
      website: '',
      description: '',
      order_index: prev.length
    }]);
  };

  const updatePartner = (index: number, field: string, value: string | number) => {
    setPartners(prev => prev.map((partner, i) => 
      i === index ? { ...partner, [field]: value } : partner
    ));
  };

  const removePartner = (index: number) => {
    setPartners(prev => prev.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects(prev => [...prev, {
      title: '',
      description: '',
      location: '',
      duration: '',
      status: 'Active',
      budget: '',
      beneficiaries: '',
      impact_metrics: [''],
      image: '',
      order_index: prev.length
    }]);
  };

  const updateProject = (index: number, field: string, value: string | number | string[]) => {
    setProjects(prev => prev.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (index: number) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHeroImageError('');

    try {
      // Upload hero image if selected
      const heroImageUrl = await uploadHeroImage();

      const programData = {
        ...formData,
        hero_image: heroImageUrl,
        objectives: formData.objectives.filter(obj => obj.trim() !== '')
      };

      let program: Program;

      if (editingProgram) {
        program = await programsApi.updateProgram(editingProgram.id, programData);
      } else {
        program = await programsApi.createProgram(programData);
      }

      // Handle team members, partners, and projects
      // Note: In a real implementation, you'd want to handle these updates more carefully
      // For now, we'll just refresh the data

      await refetch();
      closeModal();
    } catch (error) {
      console.error('Failed to save program:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        alert(`Failed to save program: ${(error as any).message}`);
      } else {
        alert('Failed to save program. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      await programsApi.deleteProgram(id);
      await refetch();
    } catch (error) {
      console.error('Failed to delete program:', error);
      alert('Failed to delete program. Please try again.');
    }
  };

  const viewProgram = (program: Program) => {
    window.open(`/programs/${program.slug}`, '_blank');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'partners', label: 'Partners', icon: Building },
    { id: 'projects', label: 'Projects', icon: FolderOpen }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Programs Admin</h1>
                <p className="text-gray-600">Manage programs, team members, partners, and projects</p>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Program
              </button>
            </div>
          </div>

          {/* Programs List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Programs</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-20">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Programs Yet</h3>
                <p className="text-gray-600 mb-6">Get started by adding your first program.</p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Program
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {programs.map((program) => (
                  <div key={program.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        {/* Program Image */}
                        {program.hero_image && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={program.hero_image}
                              alt={program.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {program.title}
                            </h3>
                            {program.is_featured && (
                              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                Featured
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              program.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : program.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {program.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            {program.location && (
                              <>
                                <span>{program.location}</span>
                                <span>•</span>
                              </>
                            )}
                            {program.budget && (
                              <>
                                <span className="text-blue-600 font-semibold">{program.budget}</span>
                                <span>•</span>
                              </>
                            )}
                            {program.beneficiaries && (
                              <span>{program.beneficiaries}</span>
                            )}
                          </div>

                          {program.description && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                              {program.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => viewProgram(program)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Program"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(program)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Program"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(program.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mt-6">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter program title"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="program-slug"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Image
                      </label>
                      <ImageUpload
                        onImageSelect={handleHeroImageSelect}
                        onImageRemove={handleHeroImageRemove}
                        selectedImage={selectedHeroImage}
                        currentImageUrl={formData.hero_image}
                        uploading={uploadingHeroImage}
                        uploadProgress={heroImageProgress}
                        error={heroImageError}
                        label="Upload Hero Image"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Brief description"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overview
                      </label>
                      <textarea
                        rows={4}
                        value={formData.overview}
                        onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Detailed program overview"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Planning">Planning</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Program location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., $2.5M"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Beneficiaries
                      </label>
                      <input
                        type="text"
                        value={formData.beneficiaries}
                        onChange={(e) => setFormData(prev => ({ ...prev, beneficiaries: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 25,000+ people"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.is_featured}
                          onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Featured Program</span>
                      </label>
                    </div>

                    {/* Objectives */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Objectives
                      </label>
                      <div className="space-y-3">
                        {formData.objectives.map((objective, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={objective}
                              onChange={(e) => updateObjective(index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={`Objective ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeObjective(index)}
                              className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addObjective}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          + Add Objective
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approach
                      </label>
                      <textarea
                        rows={4}
                        value={formData.approach}
                        onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Describe the program approach and methodology"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingHeroImage}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting || uploadingHeroImage ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {uploadingHeroImage ? 'Uploading...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {editingProgram ? 'Update' : 'Create'} Program
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsAdmin;