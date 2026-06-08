/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0066CC',
          'primary-light': '#4D9FFF',
          'primary-dark': '#0052A3',
        },
        surface: {
          primary: '#F0F8FF',
          white: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.8)',
          'glass-subtle': 'rgba(245, 251, 255, 0.6)',
        },
        accent: {
          secondary: '#00B4D8',
          tertiary: '#0096D1',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
          disabled: '#D1D5DB',
        },
        border: {
          default: '#E0EBFF',
          glass: 'rgba(0, 102, 204, 0.15)',
        },
        state: {
          error: '#DC2626',
          success: '#10B981',
          warning: '#F59E0B',
          destructive: '#7F1D1D',
        },
        dark: {
          brand: {
            primary: '#4D9FFF',
            'primary-light': '#80B3FF',
            'primary-dark': '#3A7ACC',
          },
          surface: {
            primary: '#1A2332',
            white: '#1E2E3E',
            glass: 'rgba(30, 46, 62, 0.8)',
            'glass-subtle': 'rgba(15, 24, 32, 0.6)',
          },
          text: {
            primary: '#F5F5F5',
            secondary: '#A0A8B8',
            disabled: '#4B5563',
          },
          border: {
            default: '#2A3A4E',
            glass: 'rgba(77, 159, 255, 0.25)',
          },
        },
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-sm': ['36px', { lineHeight: '44px', fontWeight: '600', letterSpacing: '-0.015em' }],
        'heading-1': ['28px', { lineHeight: '36px', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'heading-4': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400', letterSpacing: '0.5px' }],
        'body-regular': ['14px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.25px' }],
        'body-sm': ['12px', { lineHeight: '18px', fontWeight: '400', letterSpacing: '0.4px' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.4px' }],
        'label': ['11px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.8px' }],
        'overline': ['10px', { lineHeight: '14px', fontWeight: '700', letterSpacing: '1.5px' }],
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 102, 204, 0.08)',
        md: '0 4px 16px rgba(0, 102, 204, 0.1), 0 8px 24px rgba(0, 102, 204, 0.05)',
        lg: '0 8px 32px rgba(0, 102, 204, 0.12), 0 16px 48px rgba(0, 102, 204, 0.08)',
        xl: '0 16px 64px rgba(0, 102, 204, 0.15), 0 24px 80px rgba(0, 102, 204, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 1600ms ease-in-out infinite',
        'slide-up': 'slideUp 350ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        out: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
