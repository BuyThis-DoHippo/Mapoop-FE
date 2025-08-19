/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Hex 코드 대신 var() 함수로 CSS 변수를 참조합니다.
        'main': 'var(--Main-Main)',
        'main-2': 'var(--Main-Main-2)',
        'main-3': 'var(--Main-Main-3)',
        
        'gray-0': 'var(--grayscale-gray0)',
        'gray-1': 'var(--grayscale-gray1)',
        'gray-2': 'var(--grayscale-gray2)',
        'gray-3': 'var(--grayscale-gray3)',
        'gray-4': 'var(--grayscale-gray4)',
        'gray-5': 'var(--grayscale-gray5)',
        'gray-6': 'var(--grayscale-gray6)',
        'gray-7': 'var(--grayscale-gray7)',
        'gray-8': 'var(--grayscale-gray8)',
        'gray-9': 'var(--grayscale-gray9)',
        'gray-10': 'var(--grayscale-gray10)',
        // white와 fontFamily 등 다른 설정은 그대로 둡니다.
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