/**
 * Nexus Admin Dashboard - Original Tailwind Configuration
 * Custom Tailwind plugin integrating our design system
 */
import plugin from 'tailwindcss/plugin'

import { nexusColors, nexusTokens } from '../../configs/nexusDesignSystem'

export default plugin(function ({ addUtilities, addComponents, theme }) {
  // Add custom utilities
  addUtilities({
    '.nexus-scroll': {
      '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme('colors.gray.300'),
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: theme('colors.gray.400'),
        },
      },
    },
    
    '.nexus-card': {
      backgroundColor: theme('colors.white'),
      borderRadius: theme('borderRadius.lg'),
      boxShadow: theme('boxShadow.md'),
      border: `1px solid ${theme('colors.gray.200')}`,
    },

    '.nexus-glass': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },

    '.nexus-gradient-primary': {
      background: `linear-gradient(135deg, ${theme('colors.primary.500')} 0%, ${theme('colors.primary.600')} 100%)`,
    },

    '.nexus-gradient-secondary': {
      background: `linear-gradient(135deg, ${theme('colors.secondary.500')} 0%, ${theme('colors.secondary.600')} 100%)`,
    }
  })

  // Add custom components
  addComponents({
    '.nexus-btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme('borderRadius.md'),
      fontWeight: theme('fontWeight.medium'),
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
      
      '&-sm': {
        padding: '6px 12px',
        fontSize: theme('fontSize.sm'),
        height: '32px',
      },
      
      '&-md': {
        padding: '8px 16px',
        fontSize: theme('fontSize.base'),
        height: '40px',
      },
      
      '&-lg': {
        padding: '12px 20px',
        fontSize: theme('fontSize.lg'),
        height: '48px',
      },
      
      '&-primary': {
        backgroundColor: theme('colors.primary.500'),
        color: theme('colors.white'),
        
        '&:hover': {
          backgroundColor: theme('colors.primary.600'),
          transform: 'translateY(-1px)',
          boxShadow: theme('boxShadow.lg'),
        },
      },
      
      '&-secondary': {
        backgroundColor: theme('colors.secondary.500'),
        color: theme('colors.white'),
        
        '&:hover': {
          backgroundColor: theme('colors.secondary.600'),
          transform: 'translateY(-1px)',
          boxShadow: theme('boxShadow.lg'),
        },
      },
      
      '&-outline': {
        backgroundColor: 'transparent',
        border: `2px solid ${theme('colors.primary.500')}`,
        color: theme('colors.primary.500'),
        
        '&:hover': {
          backgroundColor: theme('colors.primary.500'),
          color: theme('colors.white'),
        },
      },
    },

    '.nexus-input': {
      width: '100%',
      padding: '12px 16px',
      border: `1px solid ${theme('colors.gray.300')}`,
      borderRadius: theme('borderRadius.md'),
      fontSize: theme('fontSize.base'),
      transition: 'all 0.2s ease-in-out',
      
      '&:focus': {
        outline: 'none',
        borderColor: theme('colors.primary.500'),
        boxShadow: `0 0 0 3px ${theme('colors.primary.100')}`,
      },
      
      '&::placeholder': {
        color: theme('colors.gray.400'),
      },
      
      '&:disabled': {
        backgroundColor: theme('colors.gray.50'),
        cursor: 'not-allowed',
      },
    },

    '.nexus-badge': {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px',
      borderRadius: theme('borderRadius.full'),
      fontSize: theme('fontSize.xs'),
      fontWeight: theme('fontWeight.medium'),
      
      '&-primary': {
        backgroundColor: theme('colors.primary.100'),
        color: theme('colors.primary.800'),
      },
      
      '&-secondary': {
        backgroundColor: theme('colors.secondary.100'),
        color: theme('colors.secondary.800'),
      },
      
      '&-success': {
        backgroundColor: theme('colors.success.100'),
        color: theme('colors.success.800'),
      },
      
      '&-error': {
        backgroundColor: theme('colors.error.100'),
        color: theme('colors.error.800'),
      },
      
      '&-warning': {
        backgroundColor: theme('colors.warning.100'),
        color: theme('colors.warning.800'),
      },
    }
  })
}, {
  theme: {
    extend: {
      colors: {
        primary: nexusColors.primary,
        secondary: nexusColors.secondary,
        success: nexusColors.success,
        error: nexusColors.error,
        warning: nexusColors.warning,
        info: nexusColors.info,
        gray: nexusColors.gray,
        
        // Background colors
        'bg-primary': nexusColors.background.paper,
        'bg-secondary': nexusColors.background.default,
        'bg-level1': nexusColors.background.level1,
        'bg-level2': nexusColors.background.level2,
        'bg-level3': nexusColors.background.level3,
        
        // Text colors
        'text-primary': nexusColors.text.primary,
        'text-secondary': nexusColors.text.secondary,
        'text-disabled': nexusColors.text.disabled,
        'text-hint': nexusColors.text.hint,
        
        // Border colors
        'border-primary': nexusColors.divider,
        'border-secondary': nexusColors.gray[200],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        'xs': `${nexusTokens.borderRadius.sm}px`,
        'sm': `${nexusTokens.borderRadius.md}px`,
        'md': `${nexusTokens.borderRadius.lg}px`,
        'lg': `${nexusTokens.borderRadius.xl}px`,
        'xl': '20px',
        '2xl': '24px',
      },
      
      boxShadow: {
        'xs': nexusTokens.shadows.sm,
        'sm': nexusTokens.shadows.md,
        'md': nexusTokens.shadows.lg,
        'lg': nexusTokens.shadows.xl,
        'xl': nexusTokens.shadows.xxl,
        'nexus': '0 4px 20px rgba(25, 118, 210, 0.15)',
      },
      
      fontFamily: {
        sans: nexusTokens.typography.fontFamily.sans,
        serif: nexusTokens.typography.fontFamily.serif,
        mono: nexusTokens.typography.fontFamily.mono,
      },
      
      fontSize: {
        'xs': nexusTokens.typography.fontSize.xs,
        'sm': nexusTokens.typography.fontSize.sm,
        'base': nexusTokens.typography.fontSize.base,
        'lg': nexusTokens.typography.fontSize.lg,
        'xl': nexusTokens.typography.fontSize.xl,
        '2xl': nexusTokens.typography.fontSize['2xl'],
        '3xl': nexusTokens.typography.fontSize['3xl'],
        '4xl': nexusTokens.typography.fontSize['4xl'],
        '5xl': nexusTokens.typography.fontSize['5xl'],
      },
      
      zIndex: {
        'hide': nexusTokens.zIndex.hide.toString(),
        'auto': 'auto',
        'base': nexusTokens.zIndex.base.toString(),
        'docked': nexusTokens.zIndex.docked.toString(),
        'dropdown': nexusTokens.zIndex.dropdown.toString(),
        'sticky': nexusTokens.zIndex.sticky.toString(),
        'banner': nexusTokens.zIndex.banner.toString(),
        'overlay': nexusTokens.zIndex.overlay.toString(),
        'modal': nexusTokens.zIndex.modal.toString(),
        'popover': nexusTokens.zIndex.popover.toString(),
        'skipLink': nexusTokens.zIndex.skipLink.toString(),
        'toast': nexusTokens.zIndex.toast.toString(),
        'tooltip': nexusTokens.zIndex.tooltip.toString(),
      },
      
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
})
