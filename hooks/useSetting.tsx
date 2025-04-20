import { SettingStore } from "@/lib/schema_types";
import { create } from "zustand";

export const useSetting = create<SettingStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))