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
  blogByParams: DbBlogType | null;
  cachedArticles: Record<string, DbBlogType>;

  cachedBlogsForArticle: DbBlogType[] | null;

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
  createArticle: (
    blogId: string,
    formData: BlogType,
    files: File[],
    accessToken: string
  ) => Promise<boolean>;
  uploadManyFiles: (files: File[], accessToken: string) => Promise<boolean>;
  getBlogById: (id: string) => Promise<void>;
}

export type DbBlogType = {
  title: string;
  filePath: string;
  authorFName: "";
  authorLName: "";
  articles: ArticleType[] | [];
  authorId: "";
  _id: string;
  createdAt: string;

  presignedUrl?: string;
};

export type ArticleType = {
  _id: string;
  articleTitle: string;
  context: string;
  createdAt: string;
  filePath: string[];
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
      blogByParams: null,
      cachedArticles: {},
      cachedBlogsForArticle: null,

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
            set({
              cachedBlogsData: {},
              cachedBlogsForArticle: null,
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
        const sortParam = sortBlogs === "newest" ? "desc" : "asc";
        const cacheKey = getCacheKey(pageToFetch, take, sortParam);
        if (cachedBlogsData[cacheKey]) {
          const cached = cachedBlogsData[cacheKey];
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
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get(
            `/blog?page=${pageToFetch}&take=${take}&sort=${sortParam}`
          );

          if (res.status >= 200 && res.status <= 204) {
            const newBlogs = res.data.updatedBlogs;
            const blogsTotalLength = res.data.totalCount;

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
          cachedArticles: {},
          blogByParams: null,
          blogsForArticle: [],
          cachedBlogsForArticle: null,
        });
      },

      getFirstThreeBlogs: async () => {
        const { cachedBlogsForArticle } = get();
        if (cachedBlogsForArticle) {
          set({ blogsForArticle: cachedBlogsForArticle });
          return;
        }

        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get("/blog/get-for-articles");
          if (res.status >= 200 && res.status <= 204) {
            const blogs = res.data;
            if (!Array.isArray(blogs)) {
              set({
                blogsForArticle: [],
                isLoading: false,
                axiosError: "Invalid response format",
              });
              return;
            }
            set({
              blogsForArticle: blogs,
              cachedBlogsForArticle: blogs,
              isLoading: false,
              axiosError: null,
            });
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
            blogsForArticle: [],
          });
        }
      },

      createArticle: async (blogId, formData, files, accessToken) => {
        set({ isLoading: true, axiosError: null });

        try {
          const uploadedPaths = await get().uploadManyFiles(files, accessToken);
          if (!uploadedPaths || !Array.isArray(uploadedPaths)) {
            set({ isLoading: false, axiosError: "File upload failed" });
            return false;
          }
          const updatedForm = {
            articleTitle: formData.articleTitle,
            context: formData.context,
            filePath: uploadedPaths,
          };

          const res = await axiosInstance.patch(
            `/blog/${blogId}/add-article`,
            updatedForm,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (res.status >= 200 && res.status <= 204) {
            const { cachedArticles } = get();
            // const { [blogId]: _, ...restCache } = cachedArticles;
            const { [blogId]: _unused, ...restCache } = cachedArticles;
            set({ cachedArticles: restCache });
            await get().getBlogById(blogId);
            set({ isLoading: false });
            return true;
          }
          set({ isLoading: false, axiosError: "Failed to add article" });
          return false;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
            blogsForArticle: [],
          });
          return true;
        }
      },

      uploadManyFiles: async (files: File[], accessToken: string) => {
        set({ isLoading: true, axiosError: null });
        if (!accessToken) {
          set({ axiosError: "Access token is missing" });
          return;
        }

        const hasNonImage = Array.from(files).some(
          (file) => !file.type.startsWith("image/")
        );

        if (hasNonImage) {
          set({ axiosError: "Only image files are allowed." });
          return null;
        }

        if (!files || files.length === 0) {
          set({ axiosError: "No files selected", isLoading: false });
          return null;
        }
        try {
          const formData = new FormData();
          files.forEach((file) => formData.append("files", file));
          const res = await axiosInstance.post("/blog/upload-many", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (res.status >= 200 && res.status <= 204) {
            set({ isLoading: false, axiosError: null });
            return res.data.uploadedPaths;
          } else {
            set({ isLoading: false, axiosError: "Upload fails" });
            return null;
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }

        return false;
      },

      // getBlogById: async (blogId: string) => {
      //   set({ isLoading: true, axiosError: null });

      //   try {
      //     const res = await axiosInstance.get(`/blog/${blogId}`);

      //     if (res.status >= 200 && res.status <= 204) {
      //       set({ isLoading: false, axiosError: null, blogByParams: res.data });
      //     }
      //   } catch (e) {
      //     set({
      //       isLoading: false,
      //       axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      //     });
      //   }
      // },

      getBlogById: async (blogId: string) => {
        const { cachedArticles } = get();
        if (cachedArticles[blogId]) {
          set({ blogByParams: cachedArticles[blogId] });
          return;
        }
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get(`/blog/${blogId}`);
          if (res.status >= 200 && res.status <= 204) {
            set({
              isLoading: false,
              axiosError: null,
              blogByParams: res.data,
              cachedArticles: {
                ...cachedArticles,
                [blogId]: res.data,
              },
            });
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },
    }),

    {
      name: "blog-store",
      partialize: (state) => ({
        showOverlay: state.showOverlay,
        take: state.take,
      }),
    }
  )
);
