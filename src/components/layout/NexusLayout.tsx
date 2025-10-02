/**
 * Nexus Admin Dashboard - Original Main Layout
 * Revolutionary admin layout with unique architectural patterns
 */
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Fab,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Grow,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { KeyboardArrowUp } from '@mui/icons-material'

import NexusHeader from './NexusHeader'
import NexusSidebar from './NexusSidebar'
import { nexusColors } from '../../configs/nexusDesignSystem'

// Styled components with innovative design
const NexusLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  position: 'relative',
  background: `linear-gradient(135deg, 
    ${theme.palette.mode === 'dark' ? '#0a0a0a' : '#f8faff'} 0%,
    ${theme.palette.mode === 'dark' ? '#1a1a2e' : '#ffffff'} 50%,
    ${theme.palette.mode === 'dark' ? '#16213e' : '#f0f7ff'} 100%)`,
  
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 80%, 
      ${theme.palette.primary.main}08 0%, 
      transparent 50%),
      radial-gradient(circle at 80% 20%, 
      ${theme.palette.secondary.main}08 0%, 
      transparent 50%)`,
    pointerEvents: 'none',
    zIndex: -1,
  },
}))

const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'sidebarOpen'
})<{ sidebarOpen?: boolean }>(({ theme, sidebarOpen }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(12), // Account for header height
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  
  [theme.breakpoints.up('md')]: {
    marginLeft: sidebarOpen ? 280 : 80,
  },

  // Animated background pattern
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 1px 1px, 
        ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'} 1px, 
        transparent 0)`,
    backgroundSize: '20px 20px',
    animation: 'nexus-grid-move 20s linear infinite',
    pointerEvents: 'none',
    zIndex: -1,
  },

  '@keyframes nexus-grid-move': {
    '0%': { transform: 'translate(0, 0)' },
    '100%': { transform: 'translate(20px, 20px)' },
  },
}))

const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '100%',
  
  // Content cards with glass morphism
  '& .nexus-content-card': {
    background: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.3)'}`,
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 12px 40px rgba(0, 0, 0, 0.4)'
        : '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
  },
}))

const ScrollToTopFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  zIndex: theme.zIndex.speedDial,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    transform: 'scale(1.1) rotate(360deg)',
    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
  },
  
  '&.hide': {
    transform: 'scale(0)',
    opacity: 0,
  },
}))

const LoadingOverlay = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(4px)',
}))

interface NexusLayoutProps {
  children: React.ReactNode
  title?: string
  loading?: boolean
}

interface NotificationState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

const NexusLayout: React.FC<NexusLayoutProps> = ({ 
  children, 
  title = 'Nexus Dashboard',
  loading = false 
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  // Layout state
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'info'
  })

  // Theme configuration
  const nexusTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: nexusColors.primary[500],
        light: nexusColors.primary[300],
        dark: nexusColors.primary[700],
      },
      secondary: {
        main: nexusColors.secondary[500],
        light: nexusColors.secondary[300],
        dark: nexusColors.secondary[700],
      },
      background: {
        default: isDarkMode ? '#0a0a0a' : nexusColors.background.default,
        paper: isDarkMode ? '#1a1a2e' : nexusColors.background.paper,
      },
      text: {
        primary: isDarkMode ? '#ffffff' : nexusColors.text.primary,
        secondary: isDarkMode ? '#b3b3b3' : nexusColors.text.secondary,
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  })

  // Event handlers
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const handleThemeToggle = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

  const handleMenuItemClick = useCallback((itemId: string) => {
    setActiveMenuItem(itemId)
    if (isMobile) {
      setSidebarOpen(false)
    }
    
    // Show feedback notification
    setNotification({
      open: true,
      message: `Navigated to ${itemId}`,
      severity: 'info'
    })
  }, [isMobile])

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const handleNotificationClose = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }))
  }, [])

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    const handleResize = () => {
      if (window.innerWidth < theme.breakpoints.values.md) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme.breakpoints.values.md])

  useEffect(() => {
    document.title = title
  }, [title])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'b':
            event.preventDefault()
            handleSidebarToggle()
            break
          case 't':
            event.preventDefault()
            handleThemeToggle()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleSidebarToggle, handleThemeToggle])

  return (
    <ThemeProvider theme={nexusTheme}>
      <CssBaseline />
      <NexusLayoutRoot>
        {/* Header */}
        <NexusHeader
          onMenuToggle={handleSidebarToggle}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
        />

        {/* Sidebar */}
        <NexusSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeMenuItem}
          onItemClick={handleMenuItemClick}
        />

        {/* Main Content */}
        <MainContent sidebarOpen={sidebarOpen}>
          <ContentContainer>
            {children}
          </ContentContainer>
        </MainContent>

        {/* Scroll to Top Button */}
        <Grow in={showScrollTop}>
          <ScrollToTopFab
            className={showScrollTop ? '' : 'hide'}
            onClick={handleScrollToTop}
            aria-label="scroll to top"
          >
            <KeyboardArrowUp />
          </ScrollToTopFab>
        </Grow>

        {/* Loading Overlay */}
        <LoadingOverlay open={loading}>
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{
              color: 'white',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        </LoadingOverlay>

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert 
            onClose={handleNotificationClose} 
            severity={notification.severity}
            variant="filled"
            sx={{
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </NexusLayoutRoot>
    </ThemeProvider>
  )
}

export default NexusLayout
