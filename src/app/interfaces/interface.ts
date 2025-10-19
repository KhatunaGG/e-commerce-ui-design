import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import {
  blogSchema,
  checkoutSchema,
  mailSchema,
  myAccountSchema,
  myAccountShippingSchema,
  questionSchema,
  reviewSchema,
  signInSchema,
  signUpSchema,
} from "../schema/shema";
import z from "zod";

export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface PageProps {
  params: Promise<{ id: string }>;
}

export type ChevronLeftType = {
  dark?: boolean;
};

export type ChevronRightPropsType = {
  width?: string;
  height?: string;
};

export type CloseProps = {
  isBlogPage?: boolean;
  setShowOverlay?: (val: boolean) => void;
  blogId?: string;
  mobileMenu?: boolean;
  setMobileMenu?: (val: boolean) => void;
};

export type ChevronDownPropsType = {
  styles?: string;
};

export type HeartPropsType = {
  wishlist?: boolean;
};

export type UserProps = {
  blogId?: string;
  style?: string;
  mobileMenu?: boolean;
};

export type AddToCartButtonPropsType = {
  onClick?: (id: string, color?: string | null, qty?: number) => void;
  params?: string;
  selectedQty?: number;
  selectedColor?: string | null;
  isAccountWishlistPage?: boolean;
};

export type CheckboxPropsType = {
  id: string;
  checked: boolean;
  onChange: () => void;
};

export type InputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  isCheckoutPage?: boolean;
  isMyAccountPage?: boolean;
  page?: string;
};

export type LabelPropsType = {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  details: string | "";
  _id: string;
  newProduct?: boolean;
  wishlist?: boolean;
};

export type MoreButtonPropsType = {
  handleMoreProducts?: () => void;
  styleClass: string;
  label?: string;
};

export type NavLinkProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "footer";
};

export type PhoneNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  isCheckoutPage?: boolean;
  isMyAccountPage?: boolean;
};

export type RouterButtonPropsType = {
  accountLinks: string[];
};

export type ShowMoreButtonPropsType = {
  isWishlistPage?: boolean;
  isAccountWishlistPage?: boolean;
  isBlogPage?: boolean;
};

export type SimplePaginationPromsType = {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
  totalPages: number;
};

export type SortByProps = {
  isBlogPage?: boolean;
};

export type SortSelectProps = {
  value: "newest" | "oldest";
  onChange: (value: "newest" | "oldest") => void;
  isBlogPage?: boolean;
};

export type SubmitPropsType = {
  isSubmitting?: boolean;
};

export type SubTextPropsType = {
  isWishlistPage?: boolean;
};

export type MyAccountType = z.infer<typeof myAccountSchema>;

export type AccountDetailsPropsType = {
  register: UseFormRegister<MyAccountType>;
  errors: FieldErrors<MyAccountType>;
  isMyAccountPage: boolean;
};

export type AccountPasswordPropsType = {
  register: UseFormRegister<MyAccountType>;
  errors: FieldErrors<MyAccountType>;
  isMyAccountPage: boolean;
};

export type MyAccountShippingFormType = z.infer<typeof myAccountShippingSchema>;

export type AnswerPropsType = {
  _key: string;
  answerText: string;
  answerOwnerLastName?: string;
  answerOwnerName?: string;
  createdAt: string;
};

export type ArticleProps = {
  articleTitle: string;
  context: string;
  filePath: string[];
  blogOwenName: string;
  blogOwnerLastName: string;
  createdAt: string;
  blogId: string;
};

export type ArticlesType = {
  blogId?: string;
};

export type ImagesPropsTypes = {
  images: IImageData[];
};

export type BlogListProps = {
  page: string;
};

export type BlogListItemProps = {
  title: string;
  filePath: string;
  authorFName: "";
  authorLName: "";
  articles: ArticleType[];
  authorId: "";
  _id: string;
  createdAt: string;
  sortByTwoHorizontally: boolean;
  page: string;
};

export type CartItemPropsType = {
  isLastItem: boolean;
  isFirstItem: boolean;
  _id: string;
  productName: string;
  price: number;
  purchasedQty: number;
  color: string | null;
  presignedUrl?: string;
  isCartPage?: boolean;
  show?: boolean;
  isNotSelected?: boolean;
  colors?: string[];
  handleSelectColor?: (id: string, color: string) => void;
  isCheckoutPage?: boolean;
};

export type CheckoutType = z.infer<typeof checkoutSchema>;

export type ClientReviewsItemPropsType = {
  activeReviewId: string | null;
  setActiveReviewId: React.Dispatch<React.SetStateAction<string | null>>;
  rating: number;
  onRate: (score: number) => Promise<boolean>;
};

export type ColorSectionPropsType = {
  colors: string[];
  setSelectedColor: (color: string | null) => void;
  selectedColor: string | null;
};

export type ContactPropsType = {
  register: UseFormRegister<CheckoutType>;
  errors: FieldErrors<CheckoutType>;
  isCheckoutPage: boolean;
  control: Control<CheckoutType>;
};

export type CostSummaryPropsType = {
  cartData: CartItemType[];
  selectedShipping?: ShippingsType | null;
  isCheckoutPage?: boolean;
};

export type CounterPropsType = {
  id: string;
  color?: string | null;
  quantity: number;
  onChange: (qty: number) => void;
  show?: boolean;
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
};

export type CouponsPropsType = {
  isCheckoutPage?: boolean;
};

export type DetailsSectionPropsType = {
  productById: ProductsDataType;
  params: string;
};

export type MailType = z.infer<typeof mailSchema>;

export type EmojiSectionProps = {
  onSelectEmoji: (emoji: string) => void;
};

export type MobileMenuProps = {
  mobileMenu: boolean;
  setMobileMenu: (val: boolean) => void;
};

export type OfferTillPropsType = {
  till: string;
};

export type BlogType = z.infer<typeof blogSchema>;

export type overlayProps = {
  isBlogPage?: boolean;
  blogId?: string;
};

export type PaymentMethodPropsType = {
  register: UseFormRegister<CheckoutType>;
  errors: FieldErrors<CheckoutType>;
  isCheckoutPage?: boolean;
  watch: UseFormWatch<CheckoutType>;
};

export type ProductPropsType = {
  sortByTwoHorizontally?: boolean;
  newProduct: boolean;
  discount: number;
  image?: string;
  productName: string;
  price: number;
  rating: number;
  details: string;
  _id: string;
  wishlist: boolean;
  params?: string;
};

export type ProductDetailsPropsType = {
  params: string;
};

export type QuestionType = z.infer<typeof questionSchema>;

export type QuestionFormPropsType = {
  productId: string;
  status: "question" | "answer";
  questionId?: string;
  defaultValue?: string;
  onSubmitSuccess?: () => void;
  ownerId?: string;
};

export type QuestionPropsType = {
  productId: string;
};

export type ReplyItemPropsType = {
  text: string;
  replyOwnerName?: string;
  replyOwnerLastName?: string;
  createdAt?: string;
  ratedBy: RateType[];
  _id: string;
  productId: string;
  updateReplyRating: (
    score: number,
    replyId: string,
    productId: string,
    reviewId: string
  ) => Promise<boolean>;
  reviewId?: string;
  rating?: number;
};

export type ReviewAvatar = {
  avatar: string;
};

export type ReviewsPropsType = {
  productId: string;
  productName: string;
};

export type ReviewType = z.infer<typeof reviewSchema>;

export interface ReviewsFormProps {
  productId: string;
  status: "review" | "reply";
  reviewOwnerId?: string;
  replyToId?: string;
  setActiveReviewId?: (id: string | null) => void;
}

export type SaleOfferProps = {
  images: IImageData[];
  page?: string;
};

export type ShippingAddressPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  isCheckoutPage?: boolean;
  isMyAccountPage?: boolean;
  addressType?: string | null;
  control: Control<T>;
};

export type CountryType = {
  value: string;
  label: string;
};

export type SignInType = z.infer<typeof signInSchema>;

export type SignUpType = z.infer<typeof signUpSchema>;

export type SortByIconsProps = {
  sortIcons: string[];
  onIconClick?: (icon: string) => void;
  isBlogPage?: boolean;
  activeIcon?: string | null;
  setActiveIcon?: (icon: string | null) => void;
};

export type StarRatingPropsType = {
  productId: string;
  rating: number;
  onRate?: (score: number) => Promise<boolean>;
  totalRating?: number;
  readOnly?: boolean;
  onReplyRating?: (score: number) => Promise<boolean>;
};

export type TapsPropsType = {
  params: string;
  productName: string;
};

export type UserBlogItemsProps = {
  params: string;
};

export interface IUseAccountStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: MyAccountType | null;
  avatar: string | null;
  setFormData: (formData: MyAccountType) => void;
  submitAccountSettings: (
    formState: Partial<MyAccountType>,
    accessToken: string
  ) => Promise<boolean>;
  handleFileChange: (file: File) => Promise<void>;
  getUsersAvatar: (id: string) => Promise<void>;
  clearAccountData: () => void;
}

export type AddressDataType = {
  streetAddress: string;
  townCity: string;
  country: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  differentBilling?: boolean;
  type: string;
  _id: string;
};

export interface IUseAddressStore {
  isLoading: boolean;
  axiosError: string | null;
  editAddress: boolean;
  editAddressId: string | null;
  addressType: string | null;
  addressData: AddressDataType[];
  purchasesData: ICheckoutData[];
  page: number;
  take: number;
  ordersTotalCount: number;
  isOpen: boolean;
  selectedLabel: string;
  purchasesDataByPage: Record<number, ICheckoutData[]>;
  setSelectedLabel: (selectedLabel: string) => void;
  setIsOpen: (open: boolean) => void;
  setEditAddressId: (id: string | null) => void;
  setAddressType: (addressType: string | null) => void;
  getAllShippingAddresses: () => Promise<void>;
  clearAddressData: () => void;
  submitEditAddress: (formData: AddressDataType) => Promise<boolean>;
  getAllOrders: () => Promise<void>;
  getOrderStatus: (createdAt?: string) => string;
  setPage: (page: number) => Promise<void>;
  clearOrdersData: () => void;
}

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

export interface ErrorResponse {
  message: string;
}

export type CartItemType = {
  productName: string;
  filePath: string | "";
  new: boolean;
  discount: number;
  price: number;
  colors?: string[];
  color: string | null;
  stock: number;
  wishlist: boolean;
  discountTill: string;
  _id: string;
  purchasedQty: number;
  presignedUrl?: string | "";
};

export type ShippingsType = {
  shippingCost: number;
  shippingOption: string;
};

export interface IUseCartStore {
  isLoading: boolean;
  axiosError: string | null;
  showNavbar: boolean;
  cartData: CartItemType[];
  cartDataLength: number;
  show: boolean;
  selectedQty: number;
  selectedColor: string | null;
  selectedShipping: ShippingsType | null;
  setSelectedShipping: (shipping: ShippingsType | null) => void;
  setShow: (show: boolean) => void;
  setSelectedQty: (qty: number) => void;
  setSelectedColor: (color: string | null) => void;
  handleShowNavbar: () => void;
  addProductToCart: (id: string, color?: string | null, qty?: number) => void;
  handleSelectColor: (id: string, color: string) => void;
  updateCartQty: (id: string, color: string | null, newQty: number) => void;
  deleteProductFromCart: (id: string, color: string | null) => void;
  handleCheckout: () => Promise<void>;
  resetCartStore: () => void;
}

export type ICheckoutData = CheckoutType & {
  order: CartItemType[];
  shipping: number;
  shippingOption: string;
  subtotal: number;
  total: number;
  orderCode: string;
  createdAt?: string;
  presignedUrls?: string[];
};

export interface IUseCheckoutStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: CheckoutType | null;
  checkoutData: ICheckoutData | null;
  subtotal: number;
  shippingCost: number;
  shippingOption: string;
  generateOrderCode: () => string;
  setSubtotalAndShipping: (
    data: CartItemType[],
    selectedShipping: { shippingOption: string; shippingCost: number } | null
  ) => void;
  setFormData: (data: CheckoutType) => void;
  roundToTwo: (val: number) => number;
  submitPurchase: (formState: CheckoutType) => Promise<boolean>;
  normalizeZipCode: (str?: string) => string;
  submitAddress: (addressForm: {
    streetAddress: string;
    townCity: string;
    country: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    differentBilling?: boolean;
    type: string;
  }) => Promise<boolean>;
  formatDate: (data?: string) => string;
}

export interface IUseMenuStore {
  isLoading: boolean;
  axiosError: string | null;
  mobileMenu: boolean;
  setMobileMenu: (val: boolean) => void;
  toggleMenu: () => void;
  sendEmail: (FormData: MailType, accessToken: string) => Promise<boolean>;
}

export interface IUseProductStore {
  cashedWishList: Record<string, ProductsDataType[]>;
  productById: ProductsDataType | null;
  isLoading: boolean;
  axiosError: string | null;
  wishlistData: ProductsDataType[];
  wishListStatus: boolean | undefined;
  pageNumber: number;
  take: number;
  wishlistDataLength: number;
  activeTab: string;
  averageRatings: Record<string, number>;
  getProductById: (id: string) => Promise<void>;
  clearProduct: () => void;
  setActiveTab: (activeTab: string) => void;
  updateProduct: (id: string, val: boolean) => Promise<void>;
  getAllWishlist: (page: string) => Promise<void>;
  loadMoreWishList: () => void;
  clearWishlist: () => void;
  setWishlistDataFromCache: (page: string) => void;
  getAverageRating: (productId: string) => Promise<number>;
  setAverageRating: (productId: string, rating: number) => void;
}

export type AnswerType = {
  _id: string;
  answerText: string;
  answerOwnerName: string;
  answerOwnerLastName: string;
  answersOwnerId: string;
  createdAt: string;
  status: "answer";
};

export type IQuestions = {
  id: string;
  text: string;
  answers: AnswerType[];
  status: "question" | "answer";
  productId: string;
  questionsOwnerId?: string;
};

export interface DbQuestions {
  _id: string;
  question: string;
  questionsOwnerId?: string;
  answers: AnswerType[];
  status: "question";
  productId: string;
  createdAt: string;
  questionOwnerName: string;
  questionOwnerLastName: string;
}

export type QuestionInput = {
  text: string;
  productId: string;
  status: "question" | "answer";
  questionId?: string;
  ownerId?: string;
};

export type AnswerInput = {
  answerText: string;
  answersOwnerId?: string;
  questionId: string;
  productId: string;
  status: "answer";
};

export interface ErrorResponse {
  message: string;
}

export interface ReplyType {
  replyToId?: string;
  replyOwnerId?: string;
  text: string;
  productId: string;
  status: string;
  ratedBy: RateType[];
}

export type RateType = {
  rating: number;
  ratedById: string;
};

export type LikeType = {
  like: number;
  likedById: string;
};

export interface DbReplyType extends ReplyType {
  userName: string;
  lastName: string;
  filePath: string;
  replyOwnerName: string;
  replyOwnerLastName: string;
  createdAt: string;
  ratedBy: RateType[];
  _id: string;
}

export interface DbReviewType extends ReviewType {
  reviewOwnerId: string | null;
  likes: LikeType[];
  status: "review" | "reply";
  rating: number;
  replies: DbReplyType[];
  _id?: string;
  reviewText: string;
  productId: string;
  createdAt: string;
  ratedBy: RateType[];
}

export interface IUseReviewStore {
  rating: number;
  reviewFormData: {
    text: string;
    productId: string;
  };
  reviewData: DbReviewType[];
  isLoading: boolean;
  axiosError: string | null;
  emojiVisible: boolean;
  replyOwnerName: string;
  replyOwnerLastName: string;
  reviewLength: number;
  take: number;
  page: number;
  sortReview: "newest" | "oldest";
  totalRating: number;
  likes: LikeType[];
  setSortReview: (order: "newest" | "oldest", productId: string) => void;
  setPage: (page: number, productId: string) => void;
  setEmojiVisible: (emojiVisible: boolean) => void;
  submitReview: (formData: ReviewType, accessToken: string) => Promise<boolean>;
  getAllReviews: (productId: string) => Promise<void>;
  addReplayToReview: (formData: ReplyType) => Promise<boolean>;
  formatDate: (dateString: string | "") => string;
  getReviewsCountOnly: () => Promise<void>;
  resetReviewStore: () => void;
  updateReviewRating: (score: number, reviewId: string) => Promise<boolean>;
  updateReplyRating: (
    score: number,
    replyId: string,
    productId: string,
    reviewId: string
  ) => Promise<boolean>;
  likeReview: (reviewId: string, userId: string) => Promise<void>;
}

export interface ErrorResponse {
  message: string;
}

export type CategoryFilter =
  | "All Rooms"
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Bathroom"
  | "Dinning"
  | "Outdoor"
  | null;

export type PriceFilter =
  | "All Price"
  | "0.00 - 99.99"
  | "100.00 - 199.99"
  | "200.00 - 299.99"
  | "300.00 - 399.99"
  | "400.00+"
  | null;

export type SortByType =
  | "Sort By"
  | "Latest"
  | "Oldest"
  | "A to Z"
  | "Z to A"
  | "Highest"
  | "Lowest";

export interface FiltersType {
  category: CategoryFilter;
  priceRange: PriceFilter;
}

export type ProductsDataType = {
  productName: string;
  filePath?: string;
  pages: string[];
  components: string[];
  new: boolean;
  discount: number;
  rating: number;
  category: string[];
  price: number;
  colors: string[];
  reviews?: string[];
  questions?: string[];
  stock: number;
  wishlist: boolean;
  measurements: string;
  details: string;
  discountTill: string;
  _id: string;
  presignedUrl: string;
  color?: string;
};

export interface IUseShopStore {
  isLoading: boolean;
  axiosError: string | null;
  selected: string;
  isDroppedDown: boolean;
  sortedByFour: boolean;
  sortByTwoVertically: boolean;
  sortByTwoHorizontally: boolean;
  currentPage: string;
  pageNumber: number;
  take: number;
  newArrivalProducts: ProductsDataType[];
  rating: number;
  sortBy: string;
  filters: FiltersType;
  productsData: ProductsDataType[];
  productsDataLengthByKey: number;
  cachedProductsData: Record<string, ProductsDataType[]>;
  cachedDataLengthByKey: Record<string, number>;
  productsDataTotalLength: number;
  cachedProductsDataTotalLength: number;
  cachedNewArrivalsByPage: Record<string, ProductsDataType[]>;
  newArrivalsLoading: boolean;
  isLoadingMore: boolean;
  cachedDataTotalLengthByKey: Record<string, number>;
  activeSortIcon: string | null;
  calculateDiscount: (price?: number, discount?: number) => string;
  setSortBy: (sortBy: string) => void;
  setFilters: (filters: FiltersType) => void;
  setRating: (rating: number) => void;
  setCurrentPage: (currentPage: string) => void;
  setsSortedByFour: (v: boolean) => void;
  setSortByTwoVertically: (v: boolean) => void;
  setSortByTwoHorizontally: (v: boolean) => void;
  setSelected: (selected: string) => void;
  setIsDroppedDown: (isDroppedDown: boolean) => void;
  handleSelect: (value: string) => void;
  resetAllByIconsSort: () => void;
  getNewArrivalProductsFromApi: () => Promise<void>;
  getAllProducts: (v: boolean) => Promise<void>;
  getProductsFromCacheOrApi: () => Promise<void>;
  mapSortValueToBackend: (sortValue: string) => string;
  loadMoreProducts: () => Promise<void>;
  applyFilters: (filters: FiltersType, sortBy: string) => Promise<void>;
  normalizeFirstChar: (str: string) => string;
  setPageNumber: (pageNumber: number) => void;
  hasMoreProducts: () => boolean;
  clearCache: () => void;
  clearCurrentPageData: () => void;
  setCachedProductsData: (
    cachedImages: Record<string, ProductsDataType[]>
  ) => void;
  buildCacheKey: (
    page: number,
    take: number,
    category: string | null,
    priceRange: string | null,
    sortBy: string
  ) => string;
  handleIconClick: (icon: string) => void;
  buildFilterKey: (
    category: string | null,
    priceRange: string | null,
    sortBy: string
  ) => string;
  setActiveSortIcon: (icon: string | null) => void;
}

export interface IUser {
  userName: string;
  yourName: string;
  reviews: string[];
  email: string;
  _id: string;
  lastName?: string;
  questions: [];
}

export interface IUseSignInStore {
  signInName: string;
  password: string;
  rememberMe: boolean;
  axiosError: string;
  isLoading: boolean;
  accessToken: string | null;
  currentUser: IUser | null;
  setFormData: (
    signInName: string,
    password: string,
    rememberMe: boolean
  ) => void;
  setAccessToken: (accessToken: string | null) => void;
  signIn: (formData: SignInType) => Promise<boolean>;
  initialize: () => void;
  logout: () => void;
  getCurrentUser: (accessToken: string | undefined) => void;
}

export interface IUseSignUpStore {
  axiosError: string;
  isLoading: boolean;
  yourName: string;
  userName: string;
  email: string;
  password: string;
  isTerms: boolean;
  setFormData: (
    yourName: string,
    userName: string,
    email: string,
    password: string,
    isTerms: boolean
  ) => void;
  signUp: (formData: SignUpType) => Promise<boolean>;
}

export interface IImageData {
  imageName: string;
  url: string;
  componentUsage: string[];
  pages: string[];
  presignedUrl: string;
  title?: string;
}

export interface IUseHomePageStore {
  cachedImagesByPage: Record<string, IImageData[]>;
  imagesData: IImageData[];
  isLoading: boolean;
  axiosError: string | null;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  getAllImages: (page: string) => Promise<void>;
  setCachedImagesByPage: (cachedImages: Record<string, IImageData[]>) => void;
  clearCache: () => void;
  clearCurrentPageData: () => void;
}

export type IQuestionStoreType = {
  isLoading: boolean;
  axiosError: string | null;
  questionData: DbQuestions[];
  showQuestionTextarea: boolean;
  take: number;
  page: number;
  questionsTotalLength: number;
  answerOwnerName: string | "";
  answerOwnerLastName: string | null;
  sortQuestions: "newest" | "oldest";
  setSortQuestions: (order: "newest" | "oldest", productId: string) => void;
  setShowQuestionTextarea: (show: boolean) => void;
  submitQuestion: (
    formData: QuestionInput,
    accessToken: string
  ) => Promise<boolean>;
  getAllQuestions: (productId: string) => Promise<void>;
  getQuestionsCountOnly: () => Promise<void>;
  setPage: (page: number, productId: string) => void;
  submitAnswer: (data: AnswerInput, token: string) => Promise<boolean>;
  resetQuestionStore: () => void;
};
