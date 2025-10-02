/**
 * Advanced User Management Component with real-world features
 * Demonstrates: Data tables, filtering, search, pagination, CRUD operations
 */
'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Paper,
  Grid,
  Alert,
  Tabs,
  Tab
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon
} from '@mui/icons-material'

import { useDebounce } from '@/hooks/useDebounce'
import useLocalStorage from '@/hooks/useLocalStorage'
import { usePerformance } from '@/hooks/usePerformance'
import type { 
  User, 
  UserRole, 
  UserStatus, 
  TableColumn, 
  TableFilter, 
  TableSort 
} from '@/types/advanced'

// Mock data for demonstration
const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  email: `user${i + 1}@example.com`,
  name: `User ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  role: ['admin', 'manager', 'user', 'guest'][i % 4] as UserRole,
  status: ['active', 'inactive', 'suspended', 'pending'][i % 4] as UserStatus,
  createdAt: new Date(2024, 0, 1 + i).toISOString(),
  updatedAt: new Date(2024, 0, 1 + i).toISOString(),
  lastLoginAt: new Date(2024, 11, 1 + (i % 30)).toISOString(),
  permissions: [],
  preferences: {
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    notifications: {
      email: true,
      push: false,
      sms: false
    }
  }
}))

interface UserManagementProps {
  onUserCreate?: (user: Partial<User>) => void
  onUserUpdate?: (id: string, user: Partial<User>) => void
  onUserDelete?: (id: string) => void
}

const UserManagement: React.FC<UserManagementProps> = ({
  onUserCreate,
  onUserUpdate,
  onUserDelete
}) => {
  const { startMeasure, endMeasure } = usePerformance('UserManagement')
  
  // Performance measurement
  React.useEffect(() => {
    startMeasure()
    return () => endMeasure()
  })

  // State management
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<TableFilter[]>([])
  const [sortConfig, setSortConfig] = useLocalStorage<TableSort | null>('userTableSort', null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Table columns configuration
  const columns: TableColumn<User>[] = [
    {
      id: 'name',
      label: 'User',
      sortable: true,
      render: (value, user) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={user.avatar} alt={user.name}>
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {user.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <Chip 
          label={value} 
          size="small" 
          color={value === 'admin' ? 'error' : value === 'manager' ? 'warning' : 'default'}
        />
      )
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Chip 
          label={value} 
          size="small" 
          color={value === 'active' ? 'success' : value === 'inactive' ? 'default' : 'error'}
        />
      )
    },
    {
      id: 'lastLoginAt',
      label: 'Last Login',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Never'
    },
    {
      id: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ]

  // Filtered and sorted data
  const processedUsers = useMemo(() => {
    let result = [...users]

    // Apply search filter
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase()
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    }

    // Apply filters
    filters.forEach(filter => {
      result = result.filter(user => {
        const fieldValue = user[filter.field as keyof User]
        switch (filter.operator) {
          case 'equals':
            return fieldValue === filter.value
          case 'contains':
            return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase())
          default:
            return true
        }
      })
    })

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.field as keyof User]
        const bValue = b[sortConfig.field as keyof User]
        
        // Handle undefined values
        if (aValue == null && bValue == null) return 0
        if (aValue == null) return 1
        if (bValue == null) return -1
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [users, debouncedSearchTerm, filters, sortConfig])

  // Paginated data
  const paginatedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage
    return processedUsers.slice(startIndex, startIndex + rowsPerPage)
  }, [processedUsers, page, rowsPerPage])

  // Event handlers
  const handleSort = useCallback((field: string) => {
    const newDirection = 
      sortConfig?.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    
    setSortConfig({ field, direction: newDirection })
  }, [sortConfig, setSortConfig])

  const handleSelectAll = useCallback((checked: boolean) => {
    setSelectedUsers(checked ? paginatedUsers.map(user => user.id) : [])
  }, [paginatedUsers])

  const handleSelectUser = useCallback((userId: string, checked: boolean) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    )
  }, [])

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user)
    setDialogOpen(true)
  }, [])

  const handleDeleteUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
    onUserDelete?.(userId)
  }, [onUserDelete])

  const handleBulkDelete = useCallback(() => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }, [selectedUsers])

  const handleExport = useCallback(() => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Created', 'Last Login'],
      ...processedUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        new Date(user.createdAt).toLocaleDateString(),
        user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    URL.revokeObjectURL(url)
  }, [processedUsers])

  const addFilter = useCallback((field: string, operator: string, value: any) => {
    setFilters(prev => [...prev, { field, operator: operator as any, value, type: 'text' }])
  }, [])

  const removeFilter = useCallback((index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              User Management
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage users, roles, and permissions
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="All Users" />
            <Tab label="Active Users" />
            <Tab label="Inactive Users" />
            <Tab label="Pending Users" />
          </Tabs>

          {/* Toolbar */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                >
                  Export
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setDialogOpen(true)}
                >
                  Add User
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Filters */}
          {showFilters && (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Active Filters
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {filters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={`${filter.field} ${filter.operator} ${filter.value}`}
                    onDelete={() => removeFilter(index)}
                    size="small"
                  />
                ))}
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <FormControl size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value=""
                    onChange={(e) => addFilter('role', 'equals', e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="guest">Guest</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value=""
                    onChange={(e) => addFilter('status', 'equals', e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="suspended">Suspended</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>
                  {selectedUsers.length} user(s) selected
                </Typography>
                <Button
                  color="error"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </Button>
              </Box>
            </Alert>
          )}

          {/* Table */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      {column.sortable ? (
                        <TableSortLabel
                          active={sortConfig?.field === column.id}
                          direction={sortConfig?.field === column.id ? sortConfig.direction : 'asc'}
                          onClick={() => handleSort(String(column.id))}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={String(column.id)}>
                        {column.render 
                          ? column.render(user[column.id], user)
                          : String(user[column.id])
                        }
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditUser(user)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={processedUsers.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </CardContent>
      </Card>

      {/* User Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          {/* User form would go here */}
          <Typography>User form implementation...</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserManagement
