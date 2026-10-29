import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#F5B942',
          muted: '#D9A737',
          soft: '#FFF3D6',
        }
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        script: ['var(--font-allura)', 'cursive'],
        machina: ['Neue-Machina', 'sans-serif'],
        satoshi: ['satoshi', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;
