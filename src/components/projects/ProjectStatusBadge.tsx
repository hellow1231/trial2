import React from 'react';
import { CheckCircle, Clock, Play, Pause, XCircle } from 'lucide-react';
import type { ProjectStatus } from '../../types/project';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function ProjectStatusBadge({ status, size = 'md' }: ProjectStatusBadgeProps) {
  const getStatusConfig = (status: ProjectStatus) => {
    switch (status) {
      case 'planning':
        return {
          label: 'Planning',
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'active':
        return {
          label: 'Active',
          icon: Play,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle,
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'on_hold':
        return {
          label: 'On Hold',
          icon: Pause,
          className: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          label: 'Unknown',
          icon: Clock,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  const sizeClasses = getSizeClasses(size);

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.className} ${sizeClasses}`}>
      <Icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      {config.label}
    </span>
  );
}