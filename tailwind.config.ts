import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px'
      },
      colors: {
        'mana-green': '#6EE890',
        'mana-red': '#E79864',
        'mana-yellow': '#E9C68B',
        'mana-gray': '#D2D2D2',
        'mana-blue': '#6AC1EC',
        'main-white': '#F8F8F8',
        'main-black': '#141414',
        'main-black-lighter': '#222121',
        'main-gray': '#727272',
        'main-red': '#C52929'
      }
    },
  },
  plugins: [],
}
export default config
