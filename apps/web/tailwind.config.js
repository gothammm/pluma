/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        inset: "var(--shadow-1)",
        classic: "var(--shadow-2)",
        "classic-lg": "var(--shadow-3)",
        "overlay-sm": "var(--shadow-4)",
        "overlay-lg": "var(--shadow-5)",
        dialog: "var(--shadow-6)",
        border: "inset 0 0 0 1px var(--gray-a7)",
      },
      borderRadius: {
        default: "max(var(--radius-2), var(--radius-full))",
      },
      backgroundColor: {
        light: "hsl(48deg 25% 92.16%)",
        "text-field": "var(--color-surface)",
        "panel-translucent": "var(--color-panel-translucent)",
        "panel-solid": "var(--color-panel-solid)",
      },
      keyframes: {
        wave: {
          "0%": { transform: "scale(1.5) translateY(0)" },
          "50%": { transform: "scale(1.5) translateY(-10px)" },
          "100%": { transform: "scale(1.5) translateY(0)" },
        },
        equalizer1: {
          "0%, 100%": { transform: "scaleY(0.9)" },
          "50%": { transform: "scaleY(1.3)" },
        },
        equalizer2: {
          "0%, 100%": { transform: "scaleY(1.2)" },
          "50%": { transform: "scaleY(0.8)" },
        },
        equalizer3: {
          "0%, 100%": { transform: "scaleY(1.1)" },
          "50%": { transform: "scaleY(0.95)" },
        },
      },
      animation: {
        wave: "wave 4s ease-in-out infinite",
        equalizer1: "equalizer1 2.5s ease-in-out infinite",
        equalizer2: "equalizer2 3s ease-in-out infinite",
        equalizer3: "equalizer3 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
