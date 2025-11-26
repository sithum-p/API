import { create } from "zustand";

interface SidebarState {
  isMinimized: boolean;
  toggleSidebar: () => void;
}

export const useSidebar = create<SidebarState>()((set) => ({
  isMinimized: false,
  toggleSidebar: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));