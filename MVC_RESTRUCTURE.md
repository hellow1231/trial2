# GEI Project - MVC Restructuring

## Overview
The GEI project has been restructured to follow the Model-View-Controller (MVC) architecture pattern, making the codebase more organized, maintainable, and scalable.

## New Directory Structure

```
src/
├── models/          # Data models and business logic
│   ├── PublicationModel.ts
│   └── ProgramModel.ts
├── views/           # React components (UI layer)
│   └── Header.tsx
├── controllers/     # Logic that connects models and views
│   └── NavigationController.ts
├── services/        # API calls and external services
│   └── api.ts
├── utils/           # Helper functions and utilities
│   └── helpers.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── constants/       # App constants and configuration
│   ├── navigation.ts
│   └── app.ts
└── components/      # Legacy components (to be migrated)
```

## Architecture Components

### 1. Models (`/models`)
**Purpose**: Handle business logic and data management

#### PublicationModel.ts
- Manages publication data and operations
- Handles filtering, searching, and statistics
- Provides clean API for publication-related functionality

**Usage**:
```typescript
import { publicationModel } from '../models/PublicationModel';

// Load publications
await publicationModel.loadPublications();

// Get filtered publications
const filtered = publicationModel.filterPublications({ category: 'climate' });

// Get statistics
const stats = publicationModel.getCitationStats();
```

#### ProgramModel.ts
- Manages program data and operations
- Handles program filtering, status management, and statistics
- Provides clean API for program-related functionality

**Usage**:
```typescript
import { programModel } from '../models/ProgramModel';

// Load programs
await programModel.loadPrograms();

// Get programs by status
const activePrograms = programModel.getProgramsByStatus('Active');

// Get program statistics
const stats = programModel.getProgramStats();
```

### 2. Views (`/views`)
**Purpose**: React components that handle UI rendering

#### Header.tsx
- Modern, production-ready navigation component
- Uses NavigationController for logic
- Beautiful full-screen dropdown overlays
- Responsive design with smooth animations

**Features**:
- Full-screen dropdown overlays
- Smooth animations and transitions
- Keyboard accessibility (Escape to close)
- Active state management
- Beautiful gradient backgrounds

### 3. Controllers (`/controllers`)
**Purpose**: Handle logic that connects models and views

#### NavigationController.ts
- Manages navigation state and logic
- Handles dropdown toggling and active states
- Provides navigation utilities and helpers
- Manages breadcrumb generation

**Usage**:
```typescript
import { navigationController } from '../controllers/NavigationController';

// Set current path
navigationController.setCurrentPath('/about');

// Toggle dropdown
navigationController.toggleDropdown('about');

// Handle navigation
navigationController.handleNavClick('/about#mission');
```

### 4. Services (`/services`)
**Purpose**: Handle external API calls and data fetching

#### api.ts
- Centralized API service for all HTTP requests
- Handles Supabase integration
- Provides type-safe API responses
- Includes error handling and loading states

**Usage**:
```typescript
import { apiService } from '../services/api';

// Get publications
const response = await apiService.getPublications();

// Get single publication
const pub = await apiService.getPublication('id');

// Upload file
const upload = await apiService.uploadFile(file);
```

### 5. Types (`/types`)
**Purpose**: TypeScript type definitions for the entire application

#### index.ts
- Comprehensive type definitions
- Navigation, Publication, Program, and other data types
- API response types and form types
- Filter and pagination types

### 6. Constants (`/constants`)
**Purpose**: Application constants and configuration

#### navigation.ts
- Navigation structure and dropdown items
- Centralized navigation configuration

#### app.ts
- Application configuration
- Social links, impact stats, and section IDs

### 7. Utils (`/utils`)
**Purpose**: Helper functions and utilities

#### helpers.ts
- Date and number formatting
- String utilities and validation
- Color utilities for categories and statuses
- Animation and scroll utilities
- Local storage helpers

## Migration Guide

### 1. Update Imports
Replace old component imports with new MVC structure:

```typescript
// Old
import Header from './components/Header';

// New
import Header from './views/Header';
```

### 2. Use Models for Data Operations
Instead of direct API calls, use models:

```typescript
// Old
const [publications, setPublications] = useState([]);
useEffect(() => {
  fetch('/api/publications').then(res => res.json()).then(setPublications);
}, []);

// New
const [publications, setPublications] = useState([]);
useEffect(() => {
  publicationModel.loadPublications().then(() => {
    setPublications(publicationModel.getPublications());
  });
}, []);
```

### 3. Use Controllers for Logic
Instead of inline logic, use controllers:

```typescript
// Old
const handleNavClick = (href) => {
  if (href.includes('#')) {
    window.location.href = href;
  } else {
    navigate(href);
  }
};

// New
const handleNavClick = (href) => {
  navigationController.handleNavClick(href);
};
```

### 4. Use Constants for Configuration
Instead of hardcoded values, use constants:

```typescript
// Old
const navItems = [
  { name: 'About', path: '/about' },
  // ...
];

// New
import { NAV_ITEMS } from '../constants/navigation';
const navItems = NAV_ITEMS;
```

## Benefits of MVC Structure

### 1. Separation of Concerns
- **Models**: Handle data and business logic
- **Views**: Handle UI rendering
- **Controllers**: Handle user interactions and state management

### 2. Maintainability
- Clear file organization
- Easy to find and modify specific functionality
- Reduced code duplication

### 3. Scalability
- Easy to add new features
- Modular architecture
- Reusable components and logic

### 4. Testing
- Models can be tested independently
- Controllers can be unit tested
- Views can be component tested

### 5. Type Safety
- Comprehensive TypeScript types
- Better IDE support
- Fewer runtime errors

## Next Steps

### 1. Migrate Remaining Components
- Move existing components to appropriate MVC layers
- Update imports throughout the application
- Ensure all components use the new structure

### 2. Add More Models
- Create models for other data types (Team, Contact, etc.)
- Implement caching and state management
- Add more business logic

### 3. Enhance Controllers
- Add more controllers for different features
- Implement state management patterns
- Add more navigation and interaction logic

### 4. Improve Services
- Add more API endpoints
- Implement caching strategies
- Add error handling and retry logic

### 5. Add Tests
- Unit tests for models
- Component tests for views
- Integration tests for controllers

## Usage Examples

### Creating a New Feature

1. **Define Types** (`/types/index.ts`):
```typescript
export interface NewFeature {
  id: string;
  name: string;
  description: string;
}
```

2. **Create Model** (`/models/NewFeatureModel.ts`):
```typescript
export class NewFeatureModel {
  private features: NewFeature[] = [];
  
  async loadFeatures(): Promise<void> {
    // Implementation
  }
  
  getFeatures(): NewFeature[] {
    return this.features;
  }
}
```

3. **Create Controller** (`/controllers/NewFeatureController.ts`):
```typescript
export class NewFeatureController {
  private model = new NewFeatureModel();
  
  async loadData(): Promise<void> {
    await this.model.loadFeatures();
  }
  
  getData(): NewFeature[] {
    return this.model.getFeatures();
  }
}
```

4. **Create View** (`/views/NewFeatureView.tsx`):
```typescript
const NewFeatureView: React.FC = () => {
  const controller = new NewFeatureController();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    controller.loadData().then(() => {
      setData(controller.getData());
    });
  }, []);
  
  return (
    <div>
      {/* UI Implementation */}
    </div>
  );
};
```

This MVC structure provides a solid foundation for building scalable, maintainable React applications with clear separation of concerns and excellent developer experience. 