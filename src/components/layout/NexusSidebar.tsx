/**
 * Nexus Admin Dashboard - Original Sidebar Component
 * Innovative navigation with modern design patterns
 */
'use client'

import React, { useState, useEffect } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Typography,
  Divider,
  Chip,
  alpha,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  ShoppingCart as EcommerceIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Folder as ProjectsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  ExpandLess,
  ExpandMore,
  Circle,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Notifications
} from '@mui/icons-material'

const SIDEBAR_WIDTH = 280
const SIDEBAR_COLLAPSED_WIDTH = 80

// Styled components with original Nexus design
const NexusDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed'
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    background: `linear-gradient(180deg, 
      ${theme.palette.mode === 'dark' ? '#1a1a2e' : '#ffffff'} 0%,
      ${theme.palette.mode === 'dark' ? '#16213e' : '#f8f9ff'} 100%)`,
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #1976d2 0%, #4caf50 50%, #1976d2 100%)',
      backgroundSize: '200% 100%',
      animation: 'nexus-gradient-flow 3s ease-in-out infinite',
    },
    '@keyframes nexus-gradient-flow': {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
}))

const BrandSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '2px',
    background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
  },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}))

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius * 2,
  background: 'linear-gradient(135deg, #1976d2 0%, #4caf50 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'rotate(360deg) scale(1.1)',
    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
  },
}))

const StyledListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'collapsed'
})<{ active?: boolean; collapsed?: boolean }>(({ theme, active, collapsed }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius * 2,
  minHeight: 48,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  ...(active && {
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.main, 0.15)} 0%, 
      ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      borderRadius: '0 2px 2px 0',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 8,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
    },
  }),

  '&:hover': {
    background: active 
      ? `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.2)} 0%, 
          ${alpha(theme.palette.primary.main, 0.12)} 100%)`
      : alpha(theme.palette.action.hover, 0.08),
    transform: 'translateX(4px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
  },

  ...(collapsed && {
    justifyContent: 'center',
    '& .MuiListItemText-root': {
      display: 'none',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
    },
  }),
}))

const SubMenuItem = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.25, 1),
  minHeight: 40,
  transition: 'all 0.2s ease',
  
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.08),
    paddingLeft: theme.spacing(7),
  },

  '&.active': {
    background: alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}))

const StatusChip = styled(Chip)(({ theme }) => ({
  height: 20,
  fontSize: '0.75rem',
  fontWeight: 600,
  '&.new': {
    background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
    color: 'white',
  },
  '&.updated': {
    background: 'linear-gradient(45deg, #ff9800 30%, #ffc107 90%)',
    color: 'white',
  },
}))

interface MenuItem {
  id: string
  title: string
  icon: React.ReactNode
  path?: string
  badge?: string
  badgeType?: 'new' | 'updated'
  children?: MenuItem[]
}

interface NexusSidebarProps {
  open: boolean
  onClose: () => void
  activeItem: string
  onItemClick: (id: string) => void
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    badge: 'Updated',
    badgeType: 'updated'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: <TrendingUp />,
    children: [
      { id: 'overview', title: 'Overview', icon: <Circle sx={{ fontSize: 8 }} />, path: '/analytics/overview' },
      { id: 'reports', title: 'Reports', icon: <Circle sx={{ fontSize: 8 }} />, path: '/analytics/reports' },
      { id: 'insights', title: 'Insights', icon: <Circle sx={{ fontSize: 8 }} />, path: '/analytics/insights', badge: 'New', badgeType: 'new' },
    ]
  },
  {
    id: 'users',
    title: 'User Management',
    icon: <PeopleIcon />,
    children: [
      { id: 'all-users', title: 'All Users', icon: <Circle sx={{ fontSize: 8 }} />, path: '/users/all' },
      { id: 'roles', title: 'Roles & Permissions', icon: <Circle sx={{ fontSize: 8 }} />, path: '/users/roles' },
      { id: 'user-activity', title: 'Activity Logs', icon: <Circle sx={{ fontSize: 8 }} />, path: '/users/activity' },
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    icon: <EcommerceIcon />,
    children: [
      { id: 'products', title: 'Products', icon: <Circle sx={{ fontSize: 8 }} />, path: '/ecommerce/products' },
      { id: 'orders', title: 'Orders', icon: <Circle sx={{ fontSize: 8 }} />, path: '/ecommerce/orders', badge: '12', badgeType: 'new' },
      { id: 'customers', title: 'Customers', icon: <Circle sx={{ fontSize: 8 }} />, path: '/ecommerce/customers' },
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    icon: <EmailIcon />,
    children: [
      { id: 'inbox', title: 'Inbox', icon: <Circle sx={{ fontSize: 8 }} />, path: '/communication/inbox' },
      { id: 'notifications', title: 'Notifications', icon: <Circle sx={{ fontSize: 8 }} />, path: '/communication/notifications' },
      { id: 'broadcast', title: 'Broadcast', icon: <Circle sx={{ fontSize: 8 }} />, path: '/communication/broadcast' },
    ]
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: <CalendarIcon />,
    path: '/calendar'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <ProjectsIcon />,
    path: '/projects',
    badge: 'Beta',
    badgeType: 'new'
  },
  {
    id: 'security',
    title: 'Security',
    icon: <SecurityIcon />,
    children: [
      { id: 'audit-logs', title: 'Audit Logs', icon: <Circle sx={{ fontSize: 8 }} />, path: '/security/audit' },
      { id: 'permissions', title: 'Permissions', icon: <Circle sx={{ fontSize: 8 }} />, path: '/security/permissions' },
      { id: 'backup', title: 'Backup & Recovery', icon: <Circle sx={{ fontSize: 8 }} />, path: '/security/backup' },
    ]
  },
]

const NexusSidebar: React.FC<NexusSidebarProps> = ({
  open,
  onClose,
  activeItem,
  onItemClick
}) => {
  const theme = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard'])

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleExpandClick = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      handleExpandClick(item.id)
    } else {
      onItemClick(item.id)
    }
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const isActive = activeItem === item.id

    return (
      <React.Fragment key={item.id}>
        <StyledListItem
          active={isActive}
          collapsed={collapsed}
          onClick={() => handleItemClick(item)}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          
          {!collapsed && (
            <>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                }}
              />
              
              {item.badge && (
                <StatusChip 
                  label={item.badge} 
                  size="small"
                  className={item.badgeType}
                />
              )}
              
              {hasChildren && (
                isExpanded ? <ExpandLess /> : <ExpandMore />
              )}
            </>
          )}
        </StyledListItem>

        {hasChildren && isExpanded && !collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => (
                <SubMenuItem
                  key={child.id}
                  className={activeItem === child.id ? 'active' : ''}
                  onClick={() => onItemClick(child.id)}
                >
                  <ListItemIcon sx={{ minWidth: 24, color: 'inherit' }}>
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={child.title}
                    primaryTypographyProps={{
                      fontSize: '0.85rem',
                    }}
                  />
                  {child.badge && (
                    <StatusChip 
                      label={child.badge} 
                      size="small"
                      className={child.badgeType}
                    />
                  )}
                </SubMenuItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    )
  }

  return (
    <NexusDrawer
      variant="permanent"
      collapsed={collapsed}
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      {/* Brand Section */}
      <BrandSection>
        <LogoContainer>
          <LogoIcon>N</LogoIcon>
          {!collapsed && (
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary">
                Nexus
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin Dashboard
              </Typography>
            </Box>
          )}
        </LogoContainer>
        
        <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement="right">
          <IconButton 
            onClick={handleToggleCollapse}
            size="small"
            sx={{
              background: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </BrandSection>

      {/* Quick Stats */}
      {!collapsed && (
        <Box sx={{ p: 2 }}>
          <Box 
            sx={{
              background: `linear-gradient(135deg, 
                ${alpha(theme.palette.primary.main, 0.08)} 0%, 
                ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
              borderRadius: 2,
              p: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              TODAY'S OVERVIEW
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Box>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  247
                </Typography>
                <Typography variant="caption">Active Users</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="secondary" fontWeight={700}>
                  18
                </Typography>
                <Typography variant="caption">New Orders</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <List>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Bottom Section */}
      {!collapsed && (
        <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
          <StyledListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Settings"
              primaryTypographyProps={{ fontSize: '0.9rem' }}
            />
          </StyledListItem>
          
          <StyledListItem>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Help & Support"
              primaryTypographyProps={{ fontSize: '0.9rem' }}
            />
          </StyledListItem>
        </Box>
      )}
    </NexusDrawer>
  )
}

export default NexusSidebar
