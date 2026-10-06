export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1A0E0A',
        'dark-deep': '#120a06',
        'dark-light': '#2c1810',
        cream: '#F5F1EA',
        'cream-muted': '#D9C6B3',
        amber: '#C97B36',
        'amber-light': '#E6B57B',
      },
      boxShadow: {
        amber: '0 20px 80px rgba(201, 123, 54, 0.25)',
        'amber-lg': '0 32px 120px rgba(201, 123, 54, 0.28)',
        card: '0 20px 60px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
