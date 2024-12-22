import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require('daisyui')],
} satisfies Config;
