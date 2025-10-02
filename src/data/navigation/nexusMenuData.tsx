// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

// Simplified Navigation for Portfolio Demo
const nexusVerticalMenuData = (): VerticalMenuDataType[] => [
  // Dashboard
  {
    label: 'Dashboard',
    icon: 'ri-dashboard-line',
    href: '/dashboard'
  },
  
  // User Management - Showcases CRUD operations
  {
    label: 'User Management',
    icon: 'ri-group-line',
    href: '/user-management'
  },

  // Settings - Showcases form handling and state management
  {
    label: 'Settings',
    icon: 'ri-settings-line',
    href: '/settings'
  },

  // Help - Simple static page
  {
    label: 'Help & Support',
    icon: 'ri-customer-service-line',
    children: [
      {
        label: 'Documentation',
        href: '/help/docs'
      },
      {
        label: 'Contact Support',
        href: '/help/contact'
      }
    ]
  }
]

export default nexusVerticalMenuData
