/**
 * Application-wide Constants
 * Centralized configuration for design system, API endpoints, and app settings
 */

/**
 * Design System Colors
 */
export const COLORS = {
  primary: '#8b5cf6',
  primaryLight: '#a78bfa',
  primaryDark: '#6d28d9',
  secondary: '#ec4899',
  secondaryLight: '#f472b6',
  secondaryDark: '#be185d',
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  accentDark: '#d97706',
  success: '#10b981',
  successLight: '#6ee7b7',
  successDark: '#047857',
  danger: '#ef4444',
  dangerLight: '#f87171',
  dangerDark: '#dc2626',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  warningDark: '#d97706',
  info: '#3b82f6',
  infoLight: '#60a5fa',
  infoDark: '#1d4ed8',
  gray: '#6b7280',
  grayLight: '#f3f4f6',
  grayDark: '#1f2937',
};

/**
 * Design System Spacing
 */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
};

/**
 * Design System Typography
 */
export const TYPOGRAPHY = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

/**
 * Product Categories
 */
export const PRODUCT_CATEGORIES = {
  basic: {
    id: 'basic',
    name: 'Basic',
    description: 'Classic tees for everyday wear',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'High-quality premium shirts',
  },
  designer: {
    id: 'designer',
    name: 'Designer',
    description: 'Exclusive designer collection',
  },
  limited: {
    id: 'limited',
    name: 'Limited Edition',
    description: 'Exclusive limited edition designs',
  },
};

/**
 * T-Shirt Sizes
 */
export const TSHIRT_SIZES = [
  { value: 'xs', label: 'Extra Small', size: '30-32' },
  { value: 'sm', label: 'Small', size: '32-34' },
  { value: 'md', label: 'Medium', size: '38-40' },
  { value: 'lg', label: 'Large', size: '42-44' },
  { value: 'xl', label: 'Extra Large', size: '46-48' },
  { value: '2xl', label: '2X Large', size: '50-52' },
  { value: '3xl', label: '3X Large', size: '54-56' },
];

/**
 * Predefined Colors for Design
 */
export const DESIGN_COLORS = [
  { name: 'Red', value: '#FF6B6B' },
  { name: 'Pink', value: '#F06595' },
  { name: 'Grape', value: '#BE4BDB' },
  { name: 'Violet', value: '#9C36B5' },
  { name: 'Blue', value: '#4ECDC4' },
  { name: 'Cyan', value: '#45B7D1' },
  { name: 'Teal', value: '#12A89D' },
  { name: 'Green', value: '#51CF66' },
  { name: 'Lime', value: '#B3E919' },
  { name: 'Yellow', value: '#FFD93D' },
  { name: 'Orange', value: '#FFA07A' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Gray', value: '#868E96' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
];

/**
 * Font Families for Text Design
 */
export const DESIGN_FONTS = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Courier', value: 'Courier, monospace' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Comic Sans', value: 'Comic Sans MS, cursive' },
  { name: 'Impact', value: 'Impact, sans-serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
];

/**
 * User Roles
 */
export const USER_ROLES = {
  admin: 'admin',
  customer: 'customer',
  designer: 'designer',
  moderator: 'moderator',
};

/**
 * Order Statuses
 */
export const ORDER_STATUSES = {
  pending: {
    key: 'pending',
    label: 'Pending',
    color: 'yellow',
    description: 'Order is being processed',
  },
  processing: {
    key: 'processing',
    label: 'Processing',
    color: 'blue',
    description: 'Order is being prepared',
  },
  shipped: {
    key: 'shipped',
    label: 'Shipped',
    color: 'purple',
    description: 'Order has been shipped',
  },
  delivered: {
    key: 'delivered',
    label: 'Delivered',
    color: 'green',
    description: 'Order has been delivered',
  },
  cancelled: {
    key: 'cancelled',
    label: 'Cancelled',
    color: 'red',
    description: 'Order has been cancelled',
  },
  refunded: {
    key: 'refunded',
    label: 'Refunded',
    color: 'gray',
    description: 'Order refund has been processed',
  },
};

/**
 * Payment Methods
 */
export const PAYMENT_METHODS = {
  creditCard: {
    key: 'credit_card',
    label: 'Credit Card',
    icon: '💳',
  },
  paypal: {
    key: 'paypal',
    label: 'PayPal',
    icon: '🅿️',
  },
  applePay: {
    key: 'apple_pay',
    label: 'Apple Pay',
    icon: '🍎',
  },
  googlePay: {
    key: 'google_pay',
    label: 'Google Pay',
    icon: '🔵',
  },
  bankTransfer: {
    key: 'bank_transfer',
    label: 'Bank Transfer',
    icon: '🏦',
  },
};

/**
 * Shipping Methods
 */
export const SHIPPING_METHODS = {
  standard: {
    key: 'standard',
    label: 'Standard Shipping',
    cost: 9.99,
    daysMin: 5,
    daysMax: 7,
  },
  express: {
    key: 'express',
    label: 'Express Shipping',
    cost: 24.99,
    daysMin: 2,
    daysMax: 3,
  },
  overnight: {
    key: 'overnight',
    label: 'Overnight Shipping',
    cost: 49.99,
    daysMin: 1,
    daysMax: 1,
  },
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth
  auth: '/api/auth',
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh',

  // Products
  products: '/api/products',
  productCategories: '/api/products/categories',
  productById: (id: string) => `/api/products/${id}`,
  productReviews: (id: string) => `/api/products/${id}/reviews`,

  // Cart
  cart: '/api/cart',
  cartItems: '/api/cart/items',

  // Orders
  orders: '/api/orders',
  orderById: (id: string) => `/api/orders/${id}`,
  orderHistory: '/api/orders/history',

  // User Profile
  profile: '/api/user/profile',
  profileSettings: '/api/user/profile/settings',
  savedDesigns: '/api/user/designs',

  // Analytics
  analytics: '/api/analytics',
  analyticsChart: '/api/analytics/chart',
  analyticsSales: '/api/analytics/sales',
  analyticsUsers: '/api/analytics/users',

  // Admin
  admin: '/api/admin',
  adminProducts: '/api/admin/products',
  adminOrders: '/api/admin/orders',
  adminAnalytics: '/api/admin/analytics',
};

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  creditCard: /^(?:\d{4}[-\s]?){3}\d{4}$/,
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  passwordTooShort: 'Password must be at least 8 characters',
  passwordWeak: 'Password must contain uppercase, lowercase, numbers, and special characters',
  emailTaken: 'This email address is already in use',
  userNotFound: 'User not found',
  invalidCredentials: 'Invalid email or password',
  unauthorized: 'You are not authorized to perform this action',
  serverError: 'An error occurred on the server. Please try again later.',
  networkError: 'Network error. Please check your connection.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  registrationSuccess: 'Registration successful! Please check your email to confirm.',
  loginSuccess: 'Welcome back! You have been logged in successfully.',
  profileUpdated: 'Your profile has been updated successfully.',
  orderPlaced: 'Your order has been placed successfully.',
  itemAddedToCart: 'Item added to cart successfully.',
  itemRemovedFromCart: 'Item removed from cart.',
  designSaved: 'Design saved successfully.',
  reviewPosted: 'Review posted successfully.',
};

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
};

/**
 * Table Headers
 */
export const TABLE_HEADERS = {
  products: ['Name', 'Price', 'Stock', 'Category', 'Rating', 'Actions'],
  orders: ['Order ID', 'Customer', 'Total', 'Status', 'Date', 'Actions'],
  users: ['Name', 'Email', 'Role', 'Joined', 'Status', 'Actions'],
};

/**
 * Form Field Types
 */
export const FORM_FIELD_TYPES = {
  text: 'text',
  email: 'email',
  password: 'password',
  number: 'number',
  tel: 'tel',
  url: 'url',
  date: 'date',
  time: 'time',
  checkbox: 'checkbox',
  radio: 'radio',
  select: 'select',
  textarea: 'textarea',
  file: 'file',
};

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
};

/**
 * Breakpoints for Responsive Design
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Local Storage Keys
 */
export const LOCAL_STORAGE_KEYS = {
  userProfile: 'user_profile',
  cart: 'cart_items',
  savedDesigns: 'saved_designs',
  userPreferences: 'user_preferences',
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
};

/**
 * Rating Scales
 */
export const RATING_SCALES = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export default {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  PRODUCT_CATEGORIES,
  TSHIRT_SIZES,
  DESIGN_COLORS,
  DESIGN_FONTS,
  USER_ROLES,
  ORDER_STATUSES,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  API_ENDPOINTS,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PAGINATION,
  TABLE_HEADERS,
  FORM_FIELD_TYPES,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  LOCAL_STORAGE_KEYS,
  RATING_SCALES,
};
