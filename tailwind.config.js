/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    extend: {
      colors: {
        green: "#6aaa64",
        darkGreen: "#538d4e",
        yellow: "#b59f3b",
        gray: "#86888a",
        darkGray: "#3a3a3c",
        ligthGray: "#d3d6da",
        primary: {
          background: "var(--background)",
          foreground: "var(--foreground)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "shake-animate": {
          "20%": { transform: "translateX(-10px)" },
          "40%": { transform: "translateX(+10px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(+5px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake-animate": "shake-animate 0.3s ease-in",
      },
    },
    fontFamily: {
      Inter: ['"Inter"', "sans-serif"],
    },
  },
  plugins: [],
};
