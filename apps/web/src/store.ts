import { create } from "zustand";

interface SidebarStore {
  open: boolean;
  toggleSidebar: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  open: false,
  setOpen(open) {
    set({ open });
  },
  toggleSidebar() {
    set((state) => ({ open: !state.open }));
  },
}));
