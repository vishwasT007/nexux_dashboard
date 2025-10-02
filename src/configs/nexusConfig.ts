/**
 * Nexus Admin Dashboard - Original Theme Configuration
 * A completely custom design system with original color schemes and design tokens
 */

// Type Imports
import type { Mode, Skin, Layout, LayoutComponentPosition, LayoutComponentWidth } from '@core/types'

type Navbar = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  floating: boolean
  detached: boolean
  blur: boolean
}

type Footer = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  detached: boolean
}

export type Config = {
  appName: string
  appVersion: string
  homePageUrl: string
  settingsCookieName: string
  mode: Mode
  skin: Skin
  semiDark: boolean
  layout: Layout
  layoutPadding: number
  navbar: Navbar
  contentWidth: LayoutComponentWidth
  compactContentWidth: number
  footer: Footer
  disableRipple: boolean
  toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  toastAutoHideDuration: number
}

/**
 * Nexus Admin Dashboard Configuration
 * Original configuration with custom branding and settings
 */
const nexusConfig: Config = {
  // App Identity
  appName: 'Nexus Admin',
  appVersion: '1.0.0',
  homePageUrl: '/dashboard/analytics',
  
  // Theme Settings
  settingsCookieName: 'nexus-admin-settings',
  mode: 'light',
  skin: 'default',
  semiDark: false,
  
  // Layout Configuration
  layout: 'vertical',
  layoutPadding: 24,
  
  // Navigation Bar
  navbar: {
    type: 'fixed',
    contentWidth: 'wide',
    floating: false,
    detached: false,
    blur: true
  },
  
  // Content Settings
  contentWidth: 'wide',
  compactContentWidth: 1440,
  
  // Footer Configuration
  footer: {
    type: 'static',
    contentWidth: 'wide',
    detached: false
  },
  
  // UI Preferences
  disableRipple: false,
  toastPosition: 'top-right',
  toastAutoHideDuration: 5000
}

export default nexusConfig
