import { RenderStore } from "@/lib/schema_types";
import { create } from "zustand";

export const useRender = create<RenderStore>((set, get) => ({
    render: false,
    setRender: () => set({ render: !get().render }),
}))