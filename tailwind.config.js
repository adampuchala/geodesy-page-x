const colors = require('tailwindcss/colors');

module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#440e00', // Primary color
                    alp: '#440e00aa', // Primary color
                    light: '#D7CCC8',  // Secondary color
                    accent: '#333',    // Accent color
                },
                white: colors.white, // Example of reusing Tailwind's default colors
            },
        },
    },
    plugins: [],
  }
