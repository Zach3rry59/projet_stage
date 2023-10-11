import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Account, City, Center } from "./types/types";

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

export const useCenterStore = create(
  combine(
    {
      centers: undefined as undefined | null | Center,
    },
    (set) => ({
      setCenters: (centers: Center | null) => set({ centers }),
    })
  )
);
