/**
 * Nexus Dashboard - Settings Page
 * Demonstrates form handling, state management, and user preferences
 */
'use client'

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Avatar,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material'
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material'

// Types
interface UserProfile {
  name: string
  email: string
  role: string
  avatar: string
}

interface AppSettings {
  notifications: boolean
  darkMode: boolean
  emailUpdates: boolean
  autoSave: boolean
}

// Custom Hook for Settings
const useSettings = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@nexusdashboard.com',
    role: 'Administrator',
    avatar: 'JD'
  })

  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    autoSave: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile)
    setIsEditing(false)
    setShowSuccess(true)
  }

  const handleSettingsUpdate = (updatedSettings: AppSettings) => {
    setSettings(updatedSettings)
    setShowSuccess(true)
  }

  return {
    profile,
    settings,
    isEditing,
    showSuccess,
    setIsEditing,
    setShowSuccess,
    handleProfileUpdate,
    handleSettingsUpdate
  }
}

// Profile Section Component
interface ProfileSectionProps {
  profile: UserProfile
  isEditing: boolean
  onEdit: () => void
  onSave: (profile: UserProfile) => void
  onCancel: () => void
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  isEditing,
  onEdit,
  onSave,
  onCancel
}) => {
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    onSave(editedProfile)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    onCancel()
  }

  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <CardContent>
        <Box className="flex items-center justify-between mb-4">
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Profile Information
          </Typography>
          {!isEditing ? (
            <IconButton 
              onClick={onEdit} 
              color="primary"
              sx={{
                '&:hover': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s'
              }}
            >
              <EditIcon />
            </IconButton>
          ) : (
            <Box>
              <IconButton 
                onClick={handleSave} 
                color="success"
                sx={{
                  mr: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                <SaveIcon />
              </IconButton>
              <IconButton 
                onClick={handleCancel} 
                color="error"
                sx={{
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    color: 'white',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box className="flex items-center gap-4 mb-6">
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '2rem',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}
          >
            {profile.avatar}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              {profile.role}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              value={isEditing ? editedProfile.name : profile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              disabled={!isEditing}
              variant={isEditing ? 'outlined' : 'filled'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email Address"
              value={isEditing ? editedProfile.email : profile.email}
              onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
              disabled={!isEditing}
              variant={isEditing ? 'outlined' : 'filled'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Role"
              value={profile.role}
              disabled
              variant="filled"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

// Settings Section Component
interface SettingsSectionProps {
  settings: AppSettings
  onUpdate: (settings: AppSettings) => void
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ settings, onUpdate }) => {
  const handleSettingChange = (key: keyof AppSettings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onUpdate({
      ...settings,
      [key]: event.target.checked
    })
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Application Settings
        </Typography>
        
        <Box className="space-y-3">
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={handleSettingChange('notifications')}
                color="primary"
              />
            }
            label="Enable Notifications"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={handleSettingChange('darkMode')}
                color="primary"
              />
            }
            label="Dark Mode"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.emailUpdates}
                onChange={handleSettingChange('emailUpdates')}
                color="primary"
              />
            }
            label="Email Updates"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.autoSave}
                onChange={handleSettingChange('autoSave')}
                color="primary"
              />
            }
            label="Auto Save"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

// Main Settings Component
const Settings: React.FC = () => {
  const {
    profile,
    settings,
    isEditing,
    showSuccess,
    setIsEditing,
    setShowSuccess,
    handleProfileUpdate,
    handleSettingsUpdate
  } = useSettings()

  return (
    <Box className="p-6 space-y-6">
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your profile and application preferences
        </Typography>
      </Box>

      {/* Content */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileSection
            profile={profile}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <SettingsSection
            settings={settings}
            onUpdate={handleSettingsUpdate}
          />
        </Grid>
      </Grid>

      {/* Success Notification */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success"
          variant="filled"
        >
          Settings updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Settings
