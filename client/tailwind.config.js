/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050517',
        primary: '#F4E3B2',
        secondary: '#EFC88B',
        darkBackground: '#212233',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      scale: {
        98: '0.98',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
}

