import { create } from "zustand";
import { persist } from "zustand/middleware";



export interface IBlogStore {
  showOverlay: boolean;
  setShowOverlay: (val: boolean) => void;
  toggleOverlay: () => void;
//   createBlog: (formData: BlogType, file: File) => Promise<boolean>;
}

export const useBlogStore = create<IBlogStore>()(
  persist(
    (set, get) => ({
      showOverlay: false,
      setShowOverlay: (val) => set({ showOverlay: val }),
      toggleOverlay: () => set({ showOverlay: !get().showOverlay }),
    //   createBlog: async (formData, file) => {

    //     return true;
    //   },
    }),
    {
      name: "blog-store",
    }
  )
);
