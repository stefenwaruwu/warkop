/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#2C1810',
          light: '#3d2416',
          deep: '#1a0e0a',
        },
        amber: {
          DEFAULT: '#C97B36',
          light: '#d9913f',
          dark: '#a85f22',
          glow: '#e8a855',
        },
        cream: {
          DEFAULT: '#F5F1EA',
          dark: '#e8e2d8',
          muted: '#c4b9a8',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-overlay': 'linear-gradient(to bottom, rgba(44,24,16,0.6) 0%, rgba(44,24,16,0.85) 60%, rgba(44,24,16,1) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'ticker': 'ticker 25s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201,123,54,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(201,123,54,0.7)' },
        },
      },
      boxShadow: {
        'amber': '0 4px 20px rgba(201, 123, 54, 0.3)',
        'amber-lg': '0 8px 40px rgba(201, 123, 54, 0.4)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card': '0 2px 20px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
