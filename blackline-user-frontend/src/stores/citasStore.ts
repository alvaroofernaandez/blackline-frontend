import { create } from 'zustand';

export const useCitasStore = create((set) => ({
  selectedDesign: null,
  setSelectedDesign: (design: string | null) => set({ selectedDesign: design }),
  clearSelectedDesign: () => set({ selectedDesign: null }),
}));
