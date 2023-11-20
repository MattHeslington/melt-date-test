/** @type {import('tailwindcss').Config} */
const { createPlugin } = require("windy-radix-palette");
const colors = createPlugin();

export default {
    darkMode: 'class',
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
          fontFamily: {
                  'inter': ['Inter Variable', 'sans-serif'],
              }
        },
    },
    plugins: [colors.plugin],
}

