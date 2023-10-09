import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Account, City } from "./types/types";

export const useAccountStore = create(
  combine(
    {
      account: undefined as undefined | null | Account,
    },
    (set) => ({
      setAccount: (account: Account | null) => set({ account }),
    })
  )
);

export const useCityStore = create(
  combine(
    {
      cities: undefined as undefined | null | City,
    },
    (set) => ({
      setCities: (cities: City | null) => set({ cities }),
    })
  )
);
