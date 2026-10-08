import { FilterCategory } from "@/types";
import { create } from "zustand";

interface FilterState {
  category: FilterCategory;
  setCategory: (category: FilterCategory) => void;
  reset: () => void;
}

export const useWorksFilterStore = create<FilterState>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
  reset: () => set({ category: "all" }),
}));
