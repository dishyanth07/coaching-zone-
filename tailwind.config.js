/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#005bbf",
          container: "#1a73e8",
        },
        secondary: {
          DEFAULT: "#006b5f",
          container: "#8df5e4",
        },
        tertiary: {
          DEFAULT: "#006d2c",
          container: "#008939",
        },
        surface: {
          DEFAULT: "#ffffff",
          background: "#f7f9fc",
          container: "#eceef1",
          dim: "#d8dadd",
        },
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'premium': '0 4px 40px -4px rgba(25, 28, 30, 0.06)',
        'premium-hover': '0 12px 60px -8px rgba(25, 28, 30, 0.1)',
      },
    },
  },
  plugins: [],
}
