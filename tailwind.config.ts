/* tailwind.config.ts */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: '#1DEE7F',  // FileSlap green
        dark:  '#0D0D11',  // dark background
        grayty:'#262626',  // body text gray
      },
    },
  },
  plugins: [],
};

export default config;
