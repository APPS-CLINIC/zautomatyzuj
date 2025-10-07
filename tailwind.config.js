/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
          primary: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--brand-secondary-rgb) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent-rgb) / <alpha-value>)',
          
          // Skale kolorów
          'primary-50': 'var(--brand-primary-50)',
          'primary-100': 'var(--brand-primary-100)',
          'primary-200': 'var(--brand-primary-200)',
          'primary-300': 'var(--brand-primary-300)',
          'primary-400': 'var(--brand-primary-400)',
          'primary-500': 'var(--brand-primary-500)',
          'primary-600': 'var(--brand-primary-600)',
          'primary-700': 'var(--brand-primary-700)',
          'primary-800': 'var(--brand-primary-800)',
          'primary-900': 'var(--brand-primary-900)',
          
          'secondary-50': 'var(--brand-secondary-50)',
          'secondary-100': 'var(--brand-secondary-100)',
          'secondary-200': 'var(--brand-secondary-200)',
          'secondary-300': 'var(--brand-secondary-300)',
          'secondary-400': 'var(--brand-secondary-400)',
          'secondary-500': 'var(--brand-secondary-500)',
          'secondary-600': 'var(--brand-secondary-600)',
          'secondary-700': 'var(--brand-secondary-700)',
          'secondary-800': 'var(--brand-secondary-800)',
          'secondary-900': 'var(--brand-secondary-900)',
          
          'accent-50': 'var(--brand-accent-50)',
          'accent-100': 'var(--brand-accent-100)',
          'accent-200': 'var(--brand-accent-200)',
          'accent-300': 'var(--brand-accent-300)',
          'accent-400': 'var(--brand-accent-400)',
          'accent-500': 'var(--brand-accent-500)',
          'accent-600': 'var(--brand-accent-600)',
          'accent-700': 'var(--brand-accent-700)',
          'accent-800': 'var(--brand-accent-800)',
          'accent-900': 'var(--brand-accent-900)',
        },
        
        // Kolory dla light mode
        'brand-light': {
          primary: 'var(--brand-primary-light)',
          secondary: 'var(--brand-secondary-light)',
          accent: 'var(--brand-accent-light)',
        }
      },
      
      gradientColorStops: {
        brand: {
          from: 'var(--brand-gradient-from)',
          via: 'var(--brand-gradient-via)',
          to: 'var(--brand-gradient-to)',
        }
      },
      
      boxShadow: {
        'brand-glow': 'var(--brand-glow)',
        'brand-glow-lg': '0 0 32px color-mix(in oklab, var(--brand-primary), white 20%)',
        'brand-glow-xl': '0 0 64px color-mix(in oklab, var(--brand-primary), white 20%)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-brand': 'pulseBrand 2s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'gradient-xy': 'gradientXY 3s ease infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseBrand: {
          '0%, 100%': { 
            boxShadow: '0 0 16px color-mix(in oklab, var(--brand-primary), white 20%)' 
          },
          '50%': { 
            boxShadow: '0 0 32px color-mix(in oklab, var(--brand-primary), white 40%)' 
          },
        },
        gradientX: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        gradientY: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        gradientXY: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
        },
      },
      
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-via), var(--brand-gradient-to))',
        'gradient-brand-radial': 'radial-gradient(circle, var(--brand-gradient-from), var(--brand-gradient-via), var(--brand-gradient-to))',
        'gradient-brand-conic': 'conic-gradient(from 180deg at 50% 50%, var(--brand-gradient-from), var(--brand-gradient-via), var(--brand-gradient-to))',
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
