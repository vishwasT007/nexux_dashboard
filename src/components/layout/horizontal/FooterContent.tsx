'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p className="flex items-center gap-2">
        <span>{`© 2025 Nexus Dashboard.`}</span>
        <span className="text-primary font-medium">Built with React & TypeScript</span>
        <span>{`⚡`}</span>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='https://github.com/yourusername/nexus-dashboard' target='_blank' className='text-primary hover:text-primary-dark transition-colors'>
            GitHub
          </Link>
          <Link href='https://linkedin.com/in/yourprofile' target='_blank' className='text-primary hover:text-primary-dark transition-colors'>
            LinkedIn
          </Link>
          <Link
            href='https://yourportfolio.com'
            target='_blank'
            className='text-primary hover:text-primary-dark transition-colors'
          >
            Portfolio
          </Link>
          <Link href='mailto:your.email@domain.com' className='text-primary hover:text-primary-dark transition-colors'>
            Contact
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
