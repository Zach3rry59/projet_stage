import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Account, City, Center, Room, Key, Employee } from "./types/types";

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

export const useRoomStore = create(
  combine(
    {
      rooms: undefined as undefined | null | Room,
    },
    (set) => ({
      setRooms: (rooms: Room | null) => set({ rooms }),
    })
  )
);

export const useKeyStore = create(
  combine(
    {
      keys: undefined as undefined | null | Key,
    },
    (set) => ({
      setKeys: (keys: Key | null) => set({ keys }),
    })
  )
);

export const useEmployeeStore = create(
  combine(
    {
      employees: undefined as undefined | null | Employee,
    },
    (set) => ({
      setEmployees: (employees: Employee | null) => set({ employees }),
    })
  )
);
