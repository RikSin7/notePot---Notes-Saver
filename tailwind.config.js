/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBg: '#d5b9b9',
        darkBg: '#1B1C1E',
        lightText: '#000000',
        darkText: '#ffffff',
        bgInDark: '#2D3031',
        inputBg: '#F9ECE8'
      },
      fontFamily: {
        rancho: ['Rancho', 'sans-serif']
      },
      screens: {
        xs: { max: '410px' },
        xss: { max: '360px' }
      },
      transitionProperty: {
        bg: 'background-color'
      }
    }
  },
  plugins: []
}
