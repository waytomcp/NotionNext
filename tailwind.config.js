const BLOG = require('./blog.config')
const { fontFamilies } = require('./lib/font')

module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './themes/**/*.js'
  ],
  darkMode: BLOG.APPEARANCE === 'class' ? 'media' : 'class', // or 'media' or 'class'
  theme: {
    fontFamily: fontFamilies,
    screens: {
      sm: '540px',
      // => @media (min-width: 576px) { ... }
      md: '720px',
      // => @media (min-width: 768px) { ... }
      lg: '960px',
      // => @media (min-width: 992px) { ... }
      xl: '1140px',
      // => @media (min-width: 1200px) { ... }
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.BACKGROUND_LIGHT || '#ffffff'
        },
        night: {
          DEFAULT: BLOG.BACKGROUND_DARK || '#111827'
        },
        hexo: {
          'background-gray': '#f5f5f5',
          'black-gray': '#101414',
          'light-gray': '#e5e5e5'
        },
        brown: {
          50:  '#efebe9',
          100: '#d7ccc8',
          200: '#bcaaa4',
          300: '#a1887f',
          400: '#8d6e63',
          500: '#795548', // 标准 brown
          600: '#6d4c41',
          700: '#5d4037',
          800: '#4e342e',
          900: '#3e2723',
        },
        // black: '#212b36',
        'dark-700': '#090e34b3',
        dark: {
          DEFAULT: '#111928',
          2: '#1F2A37',
          3: '#374151',
          4: '#4B5563',
          5: '#6B7280',
          6: '#9CA3AF',
          7: '#D1D5DB',
          8: '#E5E7EB'
        },
        primary: '#3758F9',
        'blue-dark': '#1B44C8',
        secondary: '#13C296',
        'body-color': '#637381',
        'body-secondary': '#8899A8',
        warning: '#FBBF24',
        stroke: '#DFE4EA',
        'gray-1': '#F9FAFB',
        'gray-2': '#F3F4F6',
        'gray-7': '#CED4DA'
      },
      maxWidth: {
        side: '14rem',
        '9/10': '90%',
        'screen-3xl': '1440px',
        'screen-4xl': '1560px'
      },
      boxShadow: {
        input: '0px 7px 20px rgba(0, 0, 0, 0.03)',
        form: '0px 1px 55px -11px rgba(0, 0, 0, 0.01)',
        pricing: '0px 0px 40px 0px rgba(0, 0, 0, 0.08)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        testimonial: '0px 10px 20px 0px rgba(92, 115, 160, 0.07)',
        'testimonial-btn': '0px 8px 15px 0px rgba(72, 72, 138, 0.08)',
        1: '0px 1px 3px 0px rgba(166, 175, 195, 0.40)',
        2: '0px 5px 12px 0px rgba(0, 0, 0, 0.10)'
      }
    }
  },
  safelist: [
    "bg-orange-100","text-orange-800",
    "bg-red-100","text-red-800",
    "bg-green-100","text-green-800",
    "bg-purple-100","text-purple-800",
    "bg-blue-100","text-blue-800",
    "bg-yellow-100","text-yellow-800",
    "bg-brown-100","text-brown-800",
    "bg-pink-100","text-pink-800",
    "from-blue-50",
  ],
  variants: {
    extend: {}
  },
  plugins: []
}
