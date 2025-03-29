import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<Theme>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode() {
        set((state) => ({ darkMode: !state.darkMode }));
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);
