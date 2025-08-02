import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUseAddressStore {
  editAddress: boolean;
  addressType: string | null;
  setEditAddress: (editAddress: boolean) => void;
  setAddressType: (addressType: string) => void;
}

export const useAddressStore = create<IUseAddressStore>()(
  persist(
    (set) => ({
      editAddress: false,
      addressType: "",
      setAddressType: (addressType) => set({addressType}),
      setEditAddress: (editAddress: boolean) => set({ editAddress }),
    }),
    {
      name: "address-storage",
    }
  )
);
