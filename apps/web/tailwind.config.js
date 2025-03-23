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
        border: "inset 0 0 0 1px var(--gray-a7)"
      },
      borderRadius: {
        default: "max(var(--radius-2), var(--radius-full))"
      },
      backgroundColor: {
        "light": "hsl(48deg 25% 92.16%)",
        "text-field": "var(--color-surface)",
        "panel-translucent": "var(--color-panel-translucent)",
        "panel-solid": "var(--color-panel-solid)"
      }
    },
  },
  plugins: [],
};
