/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "brand-red": "#DC2626",
        "card-gray": "#D0D0D0",
        "field-gray": "#F3F3F4",
        "text-dark": "#141313",
        "label-blue": "#132353",
      },
    },
  },
  plugins: [],
};
