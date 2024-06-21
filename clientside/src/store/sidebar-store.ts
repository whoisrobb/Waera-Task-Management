import { sidebarNav } from "@/lib/side-bar";
import { create } from "zustand";

export type SidebarNav = {
    name: string;
    items: {
        title: string;
        href: string;
        icon: string;
    }[];
}

type SidebarStore = {
    navItems: SidebarNav[];
    sheetIsOpen: boolean;
    sheetOpenChange: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
    navItems: sidebarNav,
    sheetIsOpen: false,
    sheetOpenChange: () => {
        set((state) => ({ ...state, sheetIsOpen: !state.sheetIsOpen }))
    }
}));