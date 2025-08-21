/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          main: '#00AEEF',
          2: '#0085B7',
          3: '#EBFAFF',
          white: '#FFFFFF',
        },
        neutral: {
          50: '#EFEFEF',
          100: '#DBDBDB',
          200: '#BEBEBE',
          300: '#9E9E9E',
          400: '#7C7C7C',
          500: '#5C5C5C',
          600: '#4B4B4B',
          700: '#353535',
          800: '#2C2C2C',
          900: '#1A1A1A',
          950: '#0B0B0B',
        },
        line: '#CACACA',
      },

      fontFamily: {
        pretendard: [
          'Pretendard',
          'system-ui',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
