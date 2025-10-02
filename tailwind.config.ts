import tailwindcssLogical from 'tailwindcss-logical'
import type { Config } from 'tailwindcss'

import nexusPlugin from './src/@core/tailwind/nexusPlugin'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [tailwindcssLogical, nexusPlugin],
  theme: {
    extend: {}
  }
}

export default config
