module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#282828',
        secondary: '#1F4B6E',
        accent: '#F59E0B',
        active: '#4CAF50',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        128: '32rem',
      },
      screens: {
        xs: '480px',
      },
      height: {
        'screen-70': '70vh', // Altezza al 70% dello schermo
        'screen-30': '30vh', // Altezza al 30% dello schermo
      },
    },
  },
  plugins: [],
}
