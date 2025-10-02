/**
 * Nexus Dashboard - Help & Documentation
 * Simple help page showcasing content organization
 */
'use client'

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Link
} from '@mui/material'
import {
  Article,
  LiveHelp,
  GitHub,
  Email,
  School,
  Speed
} from '@mui/icons-material'

// Help Topics Data
const helpTopics = [
  {
    icon: <Article color="primary" />,
    title: 'Getting Started',
    description: 'Learn the basics of using Nexus Dashboard',
    items: ['Installation', 'Configuration', 'First Steps']
  },
  {
    icon: <Speed color="secondary" />,
    title: 'Features',
    description: 'Explore key features and capabilities',
    items: ['Dashboard Overview', 'User Management', 'Settings']
  },
  {
    icon: <School color="success" />,
    title: 'Technical Guide',
    description: 'Deep dive into React/TypeScript concepts',
    items: ['Custom Hooks', 'State Management', 'TypeScript Types']
  }
]

const Help: React.FC = () => {
  return (
    <Box 
      className="p-6 space-y-6"
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
          Help & Documentation
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Everything you need to know about Nexus Dashboard
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              },
              transition: 'all 0.3s'
            }}
          >
            <CardContent>
              <Box className="flex items-center gap-3 mb-4">
                <Box 
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}
                >
                  <GitHub />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>View Source Code</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Explore the complete source code and implementation details on GitHub.
              </Typography>
              <Button
                variant="contained"
                startIcon={<GitHub />}
                href="https://github.com/yourusername/nexus-admin-dashboard"
                target="_blank"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                View on GitHub
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
              },
              transition: 'all 0.3s'
            }}
          >
            <CardContent>
              <Box className="flex items-center gap-3 mb-4">
                <Box 
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white'
                  }}
                >
                  <Email />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Support</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Have questions? Get in touch with our support team.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Email />}
                href="mailto:support@nexusdashboard.com"
                sx={{
                  borderColor: '#f093fb',
                  color: '#f093fb',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    borderColor: 'transparent',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                Email Support
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Help Topics */}
      <Grid container spacing={3}>
        {helpTopics.map((topic, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="h-full">
              <CardContent>
                <Box className="flex items-center gap-2 mb-3">
                  {topic.icon}
                  <Typography variant="h6">{topic.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {topic.description}
                </Typography>
                <List dense>
                  {topic.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} disablePadding>
                      <ListItemIcon>
                        <LiveHelp fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Technologies Used */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Technologies Demonstrated
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This portfolio project showcases modern React/TypeScript development practices:
          </Typography>
          <Box className="flex flex-wrap gap-2">
            <Chip label="React 18.3.1" color="primary" variant="outlined" />
            <Chip label="TypeScript 5.5.4" color="primary" variant="outlined" />
            <Chip label="Next.js 15.1.2" color="secondary" variant="outlined" />
            <Chip label="Material-UI 6.2.1" color="secondary" variant="outlined" />
            <Chip label="Custom Hooks" color="success" variant="outlined" />
            <Chip label="State Management" color="success" variant="outlined" />
            <Chip label="Responsive Design" color="info" variant="outlined" />
            <Chip label="TypeScript Types" color="info" variant="outlined" />
          </Box>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Key Features Implemented
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Article fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard with real-time data" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Article fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="User management system" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Article fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Settings with form handling" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Article fontSize="small" color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Authentication system" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Article fontSize="small" color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Responsive navigation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Article fontSize="small" color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Custom design system" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Help
