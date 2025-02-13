/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            theme: {
                50: '#f7f3f0',
                100: '#B5A192',
                300: '#D0B9A7',
                400: '#e3dbcd',
                500: '#B9937B',
                700: '#B08463',
                800: '#714329',
                900: '#46230f'
            }
        }
      },
    },
    plugins: [],
  }

