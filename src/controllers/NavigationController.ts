import { NavItem, DropdownItem } from '../types';
import { NAV_ITEMS, DROPDOWN_ITEMS } from '../constants/navigation';

export class NavigationController {
  private activeDropdown: string | null = null;
  private currentPath: string = '';

  // Getters
  getActiveDropdown(): string | null {
    return this.activeDropdown;
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  // Set current path
  setCurrentPath(path: string): void {
    this.currentPath = path;
  }

  // Toggle dropdown
  toggleDropdown(key: string): void {
    this.activeDropdown = this.activeDropdown === key ? null : key;
  }

  // Close dropdown
  closeDropdown(): void {
    this.activeDropdown = null;
  }

  // Check if path is active
  isActivePath(path: string, key: string): boolean {
    if (this.currentPath === path) return true;
    if (key && this.currentPath.startsWith(`/${key}/`)) return true;
    return false;
  }

  // Get navigation items
  getNavItems(): NavItem[] {
    return NAV_ITEMS;
  }

  // Get dropdown items for a specific key
  getDropdownItems(key: string): DropdownItem[] {
    return DROPDOWN_ITEMS[key] || [];
  }

  // Handle navigation click
  handleNavClick(href: string): void {
    this.closeDropdown();
    
    // Handle different types of navigation
    if (href.startsWith('/#')) {
      // Home page section
      this.navigateToSection(href);
    } else if (href.includes('#')) {
      // Section on specific page
      this.navigateToPageSection(href);
    } else {
      // Regular page navigation
      this.navigateToPage(href);
    }
  }

  // Navigate to home page section
  private navigateToSection(href: string): void {
    const sectionId = href.substring(2); // Remove '/#'
    
    if (this.currentPath !== '/') {
      // Navigate to home page first
      window.location.href = '/';
      // Scroll to section after navigation
      setTimeout(() => {
        this.scrollToSection(sectionId);
      }, 100);
    } else {
      // Already on home page, just scroll
      this.scrollToSection(sectionId);
    }
  }

  // Navigate to page with section
  private navigateToPageSection(href: string): void {
    const [path, hash] = href.split('#');
    
    if (this.currentPath === path) {
      // Already on the correct page, just scroll to section
      this.scrollToSection(hash);
    } else {
      // Navigate to page first
      window.location.href = href;
    }
  }

  // Navigate to page
  private navigateToPage(href: string): void {
    window.location.href = href;
  }

  // Scroll to section
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Handle keyboard navigation
  handleKeyDown(event: KeyboardEvent, key: string): void {
    if (event.key === 'Escape') {
      this.closeDropdown();
    } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
      this.toggleDropdown(key);
    }
  }

  // Get breadcrumb navigation
  getBreadcrumbs(): { name: string; path: string }[] {
    const breadcrumbs = [{ name: 'Home', path: '/' }];
    
    // Find current nav item
    const currentNavItem = NAV_ITEMS.find(item => 
      this.currentPath === item.path || this.currentPath.startsWith(`/${item.key}/`)
    );

    if (currentNavItem) {
      breadcrumbs.push({ name: currentNavItem.name, path: currentNavItem.path });
    }

    return breadcrumbs;
  }

  // Check if dropdown should be open
  shouldShowDropdown(key: string): boolean {
    return this.activeDropdown === key;
  }

  // Get dropdown animation delay
  getDropdownAnimationDelay(index: number): number {
    return index * 100; // 100ms delay between items
  }

  // Handle mobile menu toggle
  toggleMobileMenu(): void {
    // This could be extended for mobile-specific navigation
    // For now, it's the same as desktop dropdown
  }

  // Reset navigation state
  reset(): void {
    this.activeDropdown = null;
    this.currentPath = '';
  }
}

export const navigationController = new NavigationController(); 