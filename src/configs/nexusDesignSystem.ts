/**
 * Nexus Design System - Original Color Palette & Design Tokens
 * A completely custom design system with unique color schemes
 */

export const nexusColors = {
  // Primary Brand Colors (Deep Ocean Blue Theme)
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#1976d2',  // Main brand color
    600: '#1565c0',
    700: '#0d47a1',
    800: '#0a3d91',
    900: '#062e70',
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#0d47a1'
  },

  // Secondary Colors (Emerald Green)
  secondary: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',  // Main secondary
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c'
  },

  // Status Colors
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c'
  },

  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    main: '#f44336',
    light: '#ef5350',
    dark: '#d32f2f'
  },

  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    main: '#ffc107',
    light: '#ffca28',
    dark: '#f57c00'
  },

  info: {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4',
    main: '#03a9f4',
    light: '#29b6f6',
    dark: '#0288d1'
  },

  // Neutral Gray Scale
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },

  // Background Colors
  background: {
    paper: '#ffffff',
    default: '#f8fafc',
    level1: '#ffffff',
    level2: '#f8fafc',
    level3: '#f1f5f9'
  },

  // Text Colors
  text: {
    primary: '#1a202c',
    secondary: '#4a5568',
    disabled: '#a0aec0',
    hint: '#718096'
  },

  // Divider Colors
  divider: '#e2e8f0',

  // Action Colors
  action: {
    active: '#4a5568',
    hover: '#f7fafc',
    selected: '#edf2f7',
    disabled: '#e2e8f0',
    disabledBackground: '#f7fafc',
    focus: '#bee3f8'
  }
}

// Design Tokens
export const nexusTokens = {
  // Spacing Scale (in px)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64
  },

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Fira Code', 'monospace']
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px'
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
}

// Component-specific tokens
export const componentTokens = {
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px'
    },
    padding: {
      sm: '8px 16px',
      md: '12px 20px',
      lg: '16px 24px'
    }
  },
  
  input: {
    height: {
      sm: '36px',
      md: '44px',
      lg: '52px'
    },
    borderWidth: '1px',
    focusBorderWidth: '2px'
  },

  card: {
    padding: {
      sm: '16px',
      md: '24px',
      lg: '32px'
    },
    borderRadius: '12px'
  },

  header: {
    height: '64px',
    zIndex: 1100
  },

  sidebar: {
    width: '280px',
    collapsedWidth: '80px',
    zIndex: 1000
  }
}

export default {
  colors: nexusColors,
  tokens: nexusTokens,
  components: componentTokens
}
