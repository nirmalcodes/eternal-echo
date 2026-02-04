import type {Config} from 'tailwindcss';

// This file is kept for compatibility with shadcn-ui CLI.
// The main Tailwind CSS configuration is now in src/app/globals.css.
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config;
