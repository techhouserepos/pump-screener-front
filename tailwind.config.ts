/* eslint-disable @typescript-eslint/no-var-requires */

import type {Config} from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        magnolia: {
          DEFAULT: '#E9E5EF',
          100: '#2d243a',
          200: '#594774',
          300: '#8771a8',
          400: '#b8accc',
          500: '#e9e5ef',
          600: '#eeebf3',
          700: '#f2f0f6',
          800: '#f6f5f9',
          900: '#fbfafc',
        },
        moonstone: {
          DEFAULT: '#41B1BD',
          100: '#0d2326',
          200: '#1a474c',
          300: '#276a72',
          400: '#348e98',
          500: '#41b1bd',
          600: '#67c1cb',
          700: '#8dd0d8',
          800: '#b3e0e5',
          900: '#d9eff2',
        },
        silver_lake_blue: {
          DEFAULT: '#5389B6',
          100: '#101c25',
          200: '#20374a',
          300: '#30536f',
          400: '#406e95',
          500: '#5389b6',
          600: '#76a1c4',
          700: '#98b8d3',
          800: '#bad0e2',
          900: '#dde7f0',
        },
        steel_blue: {
          DEFAULT: '#4F80A1',
          100: '#101a20',
          200: '#203340',
          300: '#2f4d60',
          400: '#3f6680',
          500: '#4f80a1',
          600: '#6e9ab8',
          700: '#92b3c9',
          800: '#b7cddb',
          900: '#dbe6ed',
        },
        russian_violet: {
          DEFAULT: '#25193E',
          100: '#07050c',
          200: '#0f0a19',
          300: '#160f25',
          400: '#1d1432',
          500: '#25193e',
          600: '#48317b',
          700: '#6c49b7',
          800: '#9d86cf',
          900: '#cec2e7',
        },
      },

      fontFamily: {
        monoserrat: ['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
        lexend: ['var(--font-lexend)'],
      },

      screens: {
        xs: '480px',
      },
      
      backgroundSize: {
        // '75%': '75%',
        '30r': '30rem',
        '40r': '40rem',
        '50r': '50rem',
        '60r': '60rem',
        '70r': '70rem',
        '80r': '80rem',
        '90r': '90rem',
      },

      borderWidth: {
        px: '0.5px',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },

        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },

        'dot-flashing': {
          '0%, 100%': {opacity: '1'},
          '50%': {opacity: '0.5'},
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'dot-flashing': 'dot-flashing 1s infinite linear',
      },
    },
  },

  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')({nocompatible: true}),
  ],
} satisfies Config;

export default config;
