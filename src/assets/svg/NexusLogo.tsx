/**
 * Nexus Dashboard - Original SVG Logo Component
 * Custom brand identity with unique visual design
 */
import React from 'react'

interface NexusLogoProps {
  width?: number
  height?: number
  className?: string
  variant?: 'icon' | 'full' | 'text'
  color?: 'primary' | 'secondary' | 'white' | 'dark'
}

const NexusLogo: React.FC<NexusLogoProps> = ({
  width = 40,
  height = 40,
  className = '',
  variant = 'icon',
  color = 'primary'
}) => {
  const colors = {
    primary: '#1976d2',
    secondary: '#4caf50',
    white: '#ffffff',
    dark: '#333333'
  }

  const currentColor = colors[color]

  if (variant === 'icon') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="nexus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1976d2" />
            <stop offset="50%" stopColor="#2196f3" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
          <filter id="nexus-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Ring */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#nexus-gradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        
        {/* Inner Circle */}
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="url(#nexus-gradient)"
          filter="url(#nexus-glow)"
        />
        
        {/* N Letter */}
        <path
          d="M12 12 L12 28 L14 28 L14 18 L22 28 L24 28 L24 12 L22 12 L22 22 L14 12 Z"
          fill="white"
          fontWeight="bold"
        />
        
        {/* Connecting Dots */}
        <circle cx="8" cy="8" r="2" fill={currentColor} opacity="0.6" />
        <circle cx="32" cy="8" r="2" fill={currentColor} opacity="0.6" />
        <circle cx="8" cy="32" r="2" fill={currentColor} opacity="0.6" />
        <circle cx="32" cy="32" r="2" fill={currentColor} opacity="0.6" />
        
        {/* Connection Lines */}
        <line x1="10" y1="8" x2="18" y2="16" stroke={currentColor} strokeWidth="1" opacity="0.4" />
        <line x1="30" y1="8" x2="22" y2="16" stroke={currentColor} strokeWidth="1" opacity="0.4" />
        <line x1="10" y1="32" x2="18" y2="24" stroke={currentColor} strokeWidth="1" opacity="0.4" />
        <line x1="30" y1="32" x2="22" y2="24" stroke={currentColor} strokeWidth="1" opacity="0.4" />
      </svg>
    )
  }

  if (variant === 'full') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="nexus-text-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1976d2" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
        
        {/* Icon Part */}
        <circle cx="20" cy="20" r="16" fill="url(#nexus-text-gradient)" />
        <path
          d="M12 12 L12 28 L14 28 L14 18 L22 28 L24 28 L24 12 L22 12 L22 22 L14 12 Z"
          fill="white"
        />
        
        {/* Text Part */}
        <text
          x="50"
          y="26"
          fontFamily="Inter, sans-serif"
          fontSize="18"
          fontWeight="700"
          fill="url(#nexus-text-gradient)"
        >
          NEXUS
        </text>
        
        <text
          x="50"
          y="34"
          fontFamily="Inter, sans-serif"
          fontSize="8"
          fontWeight="400"
          fill={currentColor}
          opacity="0.7"
        >
          ADMIN DASHBOARD
        </text>
      </svg>
    )
  }

  // text variant
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="nexus-text-only-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1976d2" />
          <stop offset="100%" stopColor="#4caf50" />
        </linearGradient>
      </defs>
      
      <text
        x="0"
        y="20"
        fontFamily="Inter, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="url(#nexus-text-only-gradient)"
      >
        NEXUS
      </text>
    </svg>
  )
}

export default NexusLogo
