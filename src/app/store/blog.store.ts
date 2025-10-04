// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { BlogType } from "../components/__organism/overlay/Overlay";
// import axios, { AxiosError } from "axios";
// import { useSignInStore } from "./sign-in.store";
// import { axiosInstance } from "../libs/axiosInstance";

// export interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

// export interface IBlogStore {
//   isLoading: boolean;
//   axiosError: string | null;
//   showOverlay: boolean;
//   blogsData: DbBlogType[];
//   take: number;
//   page: number;
//   blogsTotalLength: number;
//   sortBlogs: "newest" | "oldest";
//   setShowOverlay: (val: boolean) => void;
//   toggleOverlay: () => void;
//   createBlog: (
//     formData: BlogType,
//     file: File,
//     accessToken: string
//   ) => Promise<boolean>;
//   getFilePathFromAwsS3: (file: File) => Promise<string>;
//   getAllBlogs: () => Promise<void>;
// }

// export type DbBlogType = {
//   title: string;
//   filePath: string;

//   authorFName: "";
//   authorLName: "";
//   articles: [];
//   authorId: "";
//   _id: string;
//   createdAt: string;
// };

// export const useBlogStore = create<IBlogStore>()(
//   persist(
//     (set, get) => ({
//       isLoading: false,
//       showOverlay: false,
//       axiosError: null,
//       blogsData: [],
//       take: 5,
//       page: 1,
//       sortBlogs: "newest",
//       blogsTotalLength: 0,
//       setShowOverlay: (val) => set({ showOverlay: val }),
//       toggleOverlay: () => set({ showOverlay: !get().showOverlay }),

//       getFilePathFromAwsS3: async (file: File) => {
//         console.log(file, "file form Store");
//         const signInStore = useSignInStore.getState();
//         const { accessToken } = signInStore;
//         if (!file) {
//           set({ axiosError: "File is missing" });
//           return null;
//         }
//         if (!accessToken) {
//           set({ axiosError: "Access token is missing" });
//         }
//         if (!file.type.startsWith("image/")) {
//           set({ axiosError: "Only image files are allowed." });
//           return null;
//         }

//         set({ isLoading: true, axiosError: null });
//         try {
//           const formData = new FormData();
//           formData.append("file", file);
//           console.log(formData, "formdata from Store");
//           const res = await axiosInstance.patch("blog/upload-file", formData, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           if (res.status >= 200 && res.status <= 204) {
//             set({ isLoading: false });
//             return res.data;
//           }
//           set({ isLoading: false, axiosError: "Upload failed" });
//           return null;
//         } catch (e) {
//           set({
//             isLoading: false,
//             axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//           });
//           return null;
//         }
//       },

//       createBlog: async (formData, file, accessToken) => {
//         set({ isLoading: true, axiosError: null });
//         try {
//           const filePathFromAwsS3 = await get().getFilePathFromAwsS3(file);
//           console.log(filePathFromAwsS3, "filePathFromAwsS3");
//           if (!filePathFromAwsS3) {
//             set({
//               isLoading: false,
//               axiosError: "File upload failed, no path returned",
//             });
//             return false;
//           }

//           const updatedFormData = {
//             ...formData,
//             filePath: filePathFromAwsS3,

//             authorFName: "",
//             authorLName: "",
//             articles: [],
//             authorId: "",
//           };

//           //           const signInStore = useSignInStore.getState();
//           // const { accessToken } = signInStore;

//           const res = await axiosInstance.post("blog/", updatedFormData, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });

//           if (res.status >= 200 && res.status <= 204) {
//             await get().getAllBlogs();
//             set({ isLoading: false });
//             return true;
//           }
//           set({ isLoading: false });
//           return false;
//         } catch (e) {
//           set({
//             isLoading: false,
//             axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//           });
//         }
//         return false;
//       },

//       getAllBlogs: async () => {
//         const { take, page } = get();
//         set({ isLoading: true, axiosError: null });
//         const sortParam = get().sortBlogs === "newest" ? "desc" : "asc";
//         try {
//           const res = await axiosInstance.get(
//             `/blog?page=${page}&take=${take}&sort=${sortParam}`
//           );
//           if (res.status >= 200 && res.status <= 204) {
//             set({
//               axiosError: null,
//               isLoading: false,
//               // blogsData: res.data.blogs,
//               blogsData: res.data.updatedBlogs,
//               blogsTotalLength: res.data.totalCount,
//             });
//           }
//         } catch (e) {
//           set({
//             isLoading: false,
//             axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//           });
//         }
//       },
//     }),
//     {
//       name: "blog-store",
//     }
//   )
// );

//after cache

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BlogType } from "../components/__organism/overlay/Overlay";
import axios, { AxiosError } from "axios";
import { useSignInStore } from "./sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

export interface IBlogStore {
  isLoading: boolean;
  axiosError: string | null;
  showOverlay: boolean;
  blogsData: DbBlogType[];
  take: number;
  page: number;
  blogsTotalLength: number;
  sortBlogs: "newest" | "oldest";
  blogsForArticle: DbBlogType[];
  cacheKey: string;
  cachedBlogsData: Record<string, { blogs: DbBlogType[]; totalCount: number }>;
  // getCacheKey: (page: number, take: number, sort: string) => string;

  setSortBlogs: (order: "newest" | "oldest") => void;
  setPage: (newPage: number) => void;
  getFirstThreeBlogs: () => Promise<void>;
  setShowOverlay: (val: boolean) => void;
  toggleOverlay: () => void;
  createBlog: (
    formData: BlogType,
    file: File,
    accessToken: string
  ) => Promise<boolean>;
  getFilePathFromAwsS3: (file: File) => Promise<string>;
  getAllBlogs: () => Promise<void>;
  clearBlogsCache: () => void;
  resetBlogs: () => void;
}

export type DbBlogType = {
  title: string;
  filePath: string;
  authorFName: "";
  authorLName: "";
  articles: [];
  authorId: "";
  _id: string;
  createdAt: string;


    presignedUrl?: string;
};

const getCacheKey = (page: number, take: number, sort: string) =>
  `${page}-${take}-${sort}`;

export const useBlogStore = create<IBlogStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      showOverlay: false,
      axiosError: null,
      blogsData: [],
      take: 6,
      page: 1,
      sortBlogs: "newest",
      blogsTotalLength: 0,
      cacheKey: "",
      cachedBlogsData: {},
      blogsForArticle: [],

      setSortBlogs: (order: "newest" | "oldest") => {
        set({
          sortBlogs: order,
          blogsData: [],
          page: 1,
          cacheKey: "",
          blogsTotalLength: 0,
        });
        get().getAllBlogs();
      },

      setPage: (newPage) => set({ page: newPage }),
      setShowOverlay: (val) => set({ showOverlay: val }),
      toggleOverlay: () => set({ showOverlay: !get().showOverlay }),

      getFilePathFromAwsS3: async (file: File) => {
        console.log(file, "file form Store");
        const signInStore = useSignInStore.getState();
        const { accessToken } = signInStore;
        if (!file) {
          set({ axiosError: "File is missing" });
          return null;
        }
        if (!accessToken) {
          set({ axiosError: "Access token is missing" });
        }
        if (!file.type.startsWith("image/")) {
          set({ axiosError: "Only image files are allowed." });
          return null;
        }

        set({ isLoading: true, axiosError: null });
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axiosInstance.patch("blog/upload-file", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.status >= 200 && res.status <= 204) {
            set({ isLoading: false });
            return res.data;
          }
          set({ isLoading: false, axiosError: "Upload failed" });
          return null;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
          return null;
        }
      },

      createBlog: async (formData, file, accessToken) => {
        set({ isLoading: true, axiosError: null });
        try {
          const filePathFromAwsS3 = await get().getFilePathFromAwsS3(file);
          console.log(filePathFromAwsS3, "filePathFromAwsS3");
          if (!filePathFromAwsS3) {
            set({
              isLoading: false,
              axiosError: "File upload failed, no path returned",
            });
            return false;
          }

          const updatedFormData = {
            ...formData,
            filePath: filePathFromAwsS3,
            authorFName: "",
            authorLName: "",
            articles: [],
            authorId: "",
          };
          const res = await axiosInstance.post("blog/", updatedFormData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (res.status >= 200 && res.status <= 204) {
            // get().clearBlogsCache();

            // set({
            //   cachedBlogsData: {},
            //   page: 1,
            //   sortBlogs: "newest",
            //   blogsData: [],
            // });

            set({
              cachedBlogsData: {},
              page: 1,
              sortBlogs: "newest",
              blogsData: [],
              blogsTotalLength: 0,
              cacheKey: "",
            });

            await get().getAllBlogs();

            set({ isLoading: false });
            return true;
          }
          set({ isLoading: false });
          return false;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
        return false;
      },

      getAllBlogs: async () => {
        const { take, page, sortBlogs, blogsData, cachedBlogsData } = get();
        const pageToFetch = blogsData.length === 0 ? 1 : page + 1;
        console.log("pageToFetch", pageToFetch);
        const sortParam = sortBlogs === "newest" ? "desc" : "asc";
        console.log("sortParam", sortParam);
        const cacheKey = getCacheKey(pageToFetch, take, sortParam);
        console.log("cacheKey", cacheKey);

        console.log("Fetching:", { currentBlogsLength: blogsData.length });
        console.log(cachedBlogsData, "cachedBlogsData");
        // Check cache
        if (cachedBlogsData[cacheKey]) {
          const cached = cachedBlogsData[cacheKey];
          console.log("cached", cached);

          set({
            blogsData:
              blogsData.length === 0
                ? cached.blogs
                : [...blogsData, ...cached.blogs],
            blogsTotalLength: cached.totalCount,
            cacheKey,
            page: pageToFetch,
          });
          return;
        }
        console.log("blogsData", blogsData);
        console.log("blogsTotalLength", get().blogsTotalLength);
        console.log("cacheKey", cacheKey);
        console.log("pageToFetch", pageToFetch);

        set({ isLoading: true, axiosError: null });

        try {
          const res = await axiosInstance.get(
            `/blog?page=${pageToFetch}&take=${take}&sort=${sortParam}`
          );

          if (res.status >= 200 && res.status <= 204) {
            const newBlogs = res.data.updatedBlogs;
            const blogsTotalLength = res.data.totalCount;

            console.log("Received blogs:", {
              count: newBlogs.length,
              blogsTotalLength: blogsTotalLength,
              firstBlogDate: newBlogs[0]?.createdAt,
              lastBlogDate: newBlogs[newBlogs.length - 1]?.createdAt,
            });

            set({
              blogsData:
                blogsData.length === 0 ? newBlogs : [...blogsData, ...newBlogs],
              blogsTotalLength: blogsTotalLength,
              isLoading: false,
              page: pageToFetch,
              cacheKey,
              cachedBlogsData: {
                ...cachedBlogsData,
                [cacheKey]: {
                  blogs: newBlogs,
                  totalCount: blogsTotalLength,
                },
              },
            });
            console.log("blogsData", blogsData);
            console.log("blogsTotalLength", blogsTotalLength);
            console.log("page", page);
            console.log(cachedBlogsData, "cachedBlogsData");
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },

      clearBlogsCache: () => set({ cachedBlogsData: {}, page: 1 }),

      resetBlogs: () => {
        set({
          page: 0,
          blogsData: [],
          blogsTotalLength: 0,
          cacheKey: "",
          sortBlogs: "newest",
          isLoading: false,
          axiosError: null,
          cachedBlogsData: {},
        });
      },

      getFirstThreeBlogs: async () => {
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get("/blog/get-for-articles");

          console.log("Raw response:", res); // Log the full response
          console.log("Response data:", res.data); // Log just the data
          console.log("Response status:", res.status); // Log the status

          if (res.status >= 200 && res.status <= 204) {
            const blogs = res.data;

            // Check if blogs is an array
            if (!Array.isArray(blogs)) {
              console.error("Blogs is not an array:", blogs);
              set({
                blogsForArticle: [],
                isLoading: false,
                axiosError: "Invalid response format",
              });
              return;
            }

            console.log("Number of blogs fetched:", blogs.length);
            console.log("First blog:", blogs[0]);

            set({
              blogsForArticle: blogs,
              isLoading: false,
              axiosError: null,
            });
          } else {
            console.error("Unexpected status code:", res.status);
            set({
              blogsForArticle: [],
              isLoading: false,
              axiosError: `Unexpected status: ${res.status}`,
            });
          }
        } catch (e) {
          console.error("Error fetching blogs for articles:", e);
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
            blogsForArticle: [], // Add this to ensure it's always an array
          });
        }
      },
    }),

    {
      name: "blog-store",
      partialize: (state) => ({
        showOverlay: state.showOverlay,
        take: state.take,
        // page: state.page,
        // sortBlogs: state.sortBlogs,
      }),
      // partialize: (state) => {
      //   // Exclude cachedBlogsData from persistence

      //   const { cachedBlogsData, ...rest } = state;
      //   return rest;
      // },
    }
  )
);
