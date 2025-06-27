export const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about',
    dropdown: [
      { label: 'Our Mission', href: '/about#mission' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Our History', href: '/about#history' },
      { label: 'Partners', href: '/about#partners' },
    ],
  },
  {
    label: 'Our Work',
    href: '/our-work',
    dropdown: [
      { label: 'Environmental Health', href: '/program-area/environmental-health' },
      { label: 'Community Development', href: '/program-area/community-development' },
      { label: 'Research & Innovation', href: '/program-area/research-innovation' },
      { label: 'Policy & Advocacy', href: '/program-area/policy-advocacy' },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Publications',
    href: '/publications',
  },
  {
    label: 'Ideas',
    href: '/ideas',
  },
] as const;