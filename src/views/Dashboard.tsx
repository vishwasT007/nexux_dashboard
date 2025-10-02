/**
 * Nexus Dashboard - Main Dashboard View
 * Simple, focused dashboard showcasing key React/TypeScript concepts
 */
'use client'

import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  Groups,
  ShoppingBag,
  AccountBalanceWallet,
  Star,
  MoreVert,
  Timeline,
  Assessment
} from '@mui/icons-material'

// Custom Types
interface DashboardStats {
  id: string
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

interface RecentActivity {
  id: string
  user: string
  action: string
  timestamp: string
  avatar: string
  status: 'success' | 'warning' | 'info'
}

// Sample Data
const dashboardStats: DashboardStats[] = [
  {
    id: '1',
    title: 'Active Users',
    value: '2,847',
    change: 12.5,
    icon: <Groups />,
    color: 'primary'
  },
  {
    id: '2',
    title: 'Total Orders',
    value: 156,
    change: -5.2,
    icon: <ShoppingBag />,
    color: 'secondary'
  },
  {
    id: '3',
    title: 'Revenue',
    value: '$45,230',
    change: 8.7,
    icon: <AccountBalanceWallet />,
    color: 'success'
  },
  {
    id: '4',
    title: 'Avg. Rating',
    value: '4.8',
    change: 3.2,
    icon: <Star />,
    color: 'warning'
  }
]

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'Created new user account',
    timestamp: '2 minutes ago',
    avatar: 'JD',
    status: 'success'
  },
  {
    id: '2',
    user: 'Sarah Wilson',
    action: 'Updated product inventory',
    timestamp: '15 minutes ago',
    avatar: 'SW',
    status: 'info'
  },
  {
    id: '3',
    user: 'Mike Johnson',
    action: 'Processed payment refund',
    timestamp: '1 hour ago',
    avatar: 'MJ',
    status: 'warning'
  },
  {
    id: '4',
    user: 'Emily Davis',
    action: 'Generated monthly report',
    timestamp: '2 hours ago',
    avatar: 'ED',
    status: 'success'
  }
]

// Custom Hook for Dashboard Data
const useDashboardData = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats[]>([])
  const [activities, setActivities] = useState<RecentActivity[]>([])

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats(dashboardStats)
      setActivities(recentActivities)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { loading, stats, activities }
}

// Stats Card Component
interface StatsCardProps {
  stat: DashboardStats
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const isPositive = stat.change > 0
  
  const getGradientBackground = (color: string) => {
    const gradients = {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      warning: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      error: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    }
    return gradients[color as keyof typeof gradients] || gradients.primary
  }
  
  return (
    <Card 
      className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          borderColor: `${stat.color}.main`,
        }
      }}
    >
      <CardContent sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: getGradientBackground(stat.color),
            opacity: 0.1,
          }}
        />
        
        <Box className="flex items-center justify-between">
          <Box>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                background: getGradientBackground(stat.color),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="font-medium">
              {stat.title}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              p: 2,
              borderRadius: 2,
              background: getGradientBackground(stat.color),
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            {stat.icon}
          </Box>
        </Box>
        
        {stat.change !== 0 && (
          <Box className="flex items-center mt-4 p-2 rounded-lg" sx={{ bgcolor: 'grey.50' }}>
            {isPositive ? (
              <TrendingUp className="text-green-500 mr-2" fontSize="small" />
            ) : (
              <TrendingDown className="text-red-500 mr-2" fontSize="small" />
            )}
            <Typography 
              variant="body2" 
              className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {Math.abs(stat.change)}%
            </Typography>
            <Typography variant="body2" color="text.secondary" className="ml-1">
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

// Recent Activity Component
interface ActivityListProps {
  activities: RecentActivity[]
  loading: boolean
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, loading }) => {
  if (loading) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activities
          </Typography>
          <LinearProgress sx={{ borderRadius: 1 }} />
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#4caf50'
      case 'warning': return '#ff9800'
      case 'info': return '#2196f3'
      default: return '#9e9e9e'
    }
  }

  const getAvatarGradient = (initials: string) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ]
    const index = initials.charCodeAt(0) % gradients.length
    return gradients[index]
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box className="flex items-center justify-between mb-4">
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Recent Activities
          </Typography>
          <Tooltip title="More options">
            <IconButton 
              size="small" 
              sx={{ 
                '&:hover': { 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s'
              }}
            >
              <MoreVert />
            </IconButton>
          </Tooltip>
        </Box>
        
        <TableContainer 
          component={Paper} 
          variant="outlined" 
          sx={{ 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow 
                  key={activity.id} 
                  hover
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'grey.50',
                      transform: 'scale(1.01)',
                      transition: 'all 0.2s'
                    },
                    borderLeft: `4px solid ${getStatusColor(activity.status)}`,
                  }}
                >
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          background: getAvatarGradient(activity.avatar),
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.875rem'
                        }}
                      >
                        {activity.avatar}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.user}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {activity.action}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {activity.timestamp}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      color={activity.status === 'success' ? 'success' : 
                             activity.status === 'warning' ? 'warning' : 'info'}
                      size="small"
                      sx={{ 
                        fontWeight: 'medium',
                        minWidth: 80
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const { loading, stats, activities } = useDashboardData()

  return (
    <Box 
      className="p-6 space-y-8"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        borderRadius: 2
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          textAlign: 'center',
          py: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4}>
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <LinearProgress sx={{ borderRadius: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.id}>
              <StatsCard stat={stat} />
            </Grid>
          ))
        )}
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ActivityList activities={activities} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
