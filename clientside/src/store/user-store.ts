import { User } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  userData: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      setUser: (user) => set({ userData: user }),
      removeUser: () => set({ userData: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
