/**
 * Nexus Admin Dashboard - Original Header Component
 * Custom header design with innovative navigation patterns
 */
'use client'

import React, { useState, useEffect } from 'react'
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Badge,
  Tooltip,
  Box,
  Typography,
  InputBase,
  alpha
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { 
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  AccountCircle,
  Logout
} from '@mui/icons-material'

// Styled components with original Nexus design
const NexusAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
    animation: 'nexus-shimmer 3s ease-in-out infinite',
  },
  '@keyframes nexus-shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
}))

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 3,
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    minWidth: '300px',
  },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    boxShadow: `0 0 0 2px ${alpha(theme.palette.common.white, 0.5)}`,
    transform: 'translateY(-1px)',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.8),
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.95rem',
    fontWeight: 400,
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.7),
      opacity: 1,
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}))

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.9),
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)',
  },
}))

const NexusAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
  border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
  },
}))

interface NexusHeaderProps {
  onMenuToggle: () => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

const NexusHeader: React.FC<NexusHeaderProps> = ({
  onMenuToggle,
  isDarkMode,
  onThemeToggle
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [notificationCount, setNotificationCount] = useState(3)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null)

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotificationCount(prev => prev + 1)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget)
    setNotificationCount(0) // Mark as read
  }

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue)
      // Implement search functionality
    }
  }

  return (
    <NexusAppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px !important' }}>
        {/* Left Section - Menu & Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ActionButton onClick={onMenuToggle}>
            <MenuIcon />
          </ActionButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              fontSize: '1.5rem',
              background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Nexus
          </Typography>
        </Box>

        {/* Center Section - Search */}
        <Box sx={{ flexGrow: 1, maxWidth: 500, mx: 2 }}>
          <form onSubmit={handleSearchSubmit}>
            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search across dashboard..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </SearchContainer>
          </form>
        </Box>

        {/* Right Section - Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Toggle Theme" arrow>
            <ActionButton onClick={onThemeToggle} size="small">
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </ActionButton>
          </Tooltip>

          <Tooltip title="Settings" arrow>
            <ActionButton size="small">
              <SettingsIcon />
            </ActionButton>
          </Tooltip>

          <Tooltip title="Notifications" arrow>
            <ActionButton 
              onClick={handleNotificationMenuOpen}
              size="small"
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </ActionButton>
          </Tooltip>

          <Tooltip title="User Profile" arrow>
            <NexusAvatar
              onClick={handleUserMenuOpen}
              sx={{ width: 40, height: 40, ml: 1 }}
            >
              <AccountCircle />
            </NexusAvatar>
          </Tooltip>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          onClick={handleUserMenuClose}
          PaperProps={{
            elevation: 8,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <AccountCircle sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem>
            <SettingsIcon sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          <MenuItem>
            <Logout sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationMenuAnchor}
          open={Boolean(notificationMenuAnchor)}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            elevation: 8,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              minWidth: 280,
              maxHeight: 400,
              borderRadius: 2,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Typography variant="body2">
              New user registration received
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="body2">
              System backup completed successfully
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="body2">
              Monthly report is ready for review
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </NexusAppBar>
  )
}

export default NexusHeader
