/**
 * Nexus Dashboard - Custom Layout Implementation
 * Integrates our original Nexus components with the existing layout system
 */
'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'
import type { SystemMode } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'

// Component Imports  
import Providers from '@components/Providers'
import AuthGuard from '@/hocs/AuthGuard'

// Dynamic imports for performance
const NexusLayout = dynamic(() => import('@components/layout/NexusLayout'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  )
})

interface NexusLayoutWrapperProps extends ChildrenType {
  locale: Locale
  direction: 'ltr' | 'rtl'
  systemMode: SystemMode
}

const NexusLayoutWrapper: React.FC<NexusLayoutWrapperProps> = ({
  children,
  locale,
  direction,
  systemMode
}) => {
  return (
    <Providers direction={direction}>
      <AuthGuard locale={locale}>
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <NexusLayout title="Nexus Dashboard">
              {children}
            </NexusLayout>
          }
          horizontalLayout={
            <NexusLayout title="Nexus Dashboard">
              {children}
            </NexusLayout>
          }
        />
      </AuthGuard>
    </Providers>
  )
}

export default NexusLayoutWrapper
