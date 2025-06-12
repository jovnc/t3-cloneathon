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
        // Brand Colors - Pastel Sky Blue palette
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#87ceeb", // Softer sky blue
          600: "#70b9d8",
          700: "#5aa4c5",
          800: "#4a8fb2",
          900: "#3a7a9f",
          950: "#2a658c",
        },
        // Custom Primary Colors - Pastel Lavender
        primary: {
          DEFAULT: "#b19cd9", // Soft lavender
          50: "#f8f6ff",
          100: "#f1ecff",
          200: "#e3d9ff",
          300: "#d5c6ff",
          400: "#c7b3ff",
          500: "#b19cd9",
          600: "#9f89c7",
          700: "#8d76b5",
          800: "#7b63a3",
          900: "#695091",
          950: "#573d7f",
          foreground: "#ffffff",
        },
        // Custom Secondary Colors - Pastel Gray
        secondary: {
          DEFAULT: "#b5b5b8", // Soft neutral gray
          50: "#f8f8f9",
          100: "#f1f1f3",
          200: "#e3e3e7",
          300: "#d5d5db",
          400: "#c7c7cf",
          500: "#b5b5b8",
          600: "#a3a3a6",
          700: "#919194",
          800: "#7f7f82",
          900: "#6d6d70",
          950: "#5b5b5e",
          foreground: "#ffffff",
        },
        // Accent Colors - Warm Gray
        accent: {
          DEFAULT: "#a8a5a0", // Warm gray with subtle brown undertone
          50: "#f9f8f7",
          100: "#f3f1ef",
          200: "#e7e3df",
          300: "#dbd5cf",
          400: "#cfc7bf",
          500: "#a8a5a0",
          600: "#96938e",
          700: "#84817c",
          800: "#726f6a",
          900: "#605d58",
          950: "#4e4b46",
          foreground: "#ffffff",
        },
        // Success, Warning, Error colors - Pastel versions
        success: {
          DEFAULT: "#a8d0a8", // Brighter but still pastel green
          50: "#f6fbf6",
          100: "#edf7ed",
          200: "#dbefdb",
          300: "#c9e7c9",
          400: "#b7dfb7",
          500: "#a8d0a8",
          600: "#96bc96",
          700: "#84a884",
          800: "#729472",
          900: "#608060",
          950: "#4e6c4e",
        },
        warning: {
          DEFAULT: "#f5d76e", // Brighter pastel yellow
          50: "#fefdf7",
          100: "#fdfbef",
          200: "#fbf7df",
          300: "#f9f3cf",
          400: "#f7efbf",
          500: "#f5d76e",
          600: "#e3c562",
          700: "#d1b356",
          800: "#bfa14a",
          900: "#ad8f3e",
          950: "#9b7d32",
        },
        error: {
          DEFAULT: "#e6a3a3", // Brighter pastel rose
          50: "#fdf5f5",
          100: "#fbebeb",
          200: "#f7d7d7",
          300: "#f3c3c3",
          400: "#efafaf",
          500: "#e6a3a3",
          600: "#d49191",
          700: "#c27f7f",
          800: "#b06d6d",
          900: "#9e5b5b",
          950: "#8c4949",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "Monaco", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 0.6s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
