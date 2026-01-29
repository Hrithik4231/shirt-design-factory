/**
 * String Utilities
 */

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert camelCase to kebab-case
 */
export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Convert kebab-case to camelCase
 */
export const kebabToCamel = (str: string): string => {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
};

/**
 * Truncate string to specified length with ellipsis
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + '...';
};

/**
 * Reverse a string
 */
export const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

/**
 * Count words in a string
 */
export const countWords = (str: string): number => {
  return str.trim().split(/\s+/).length;
};

/**
 * Remove duplicates from string (word-based)
 */
export const removeDuplicates = (str: string): string => {
  const words = str.split(/\s+/);
  return [...new Set(words)].join(' ');
};

/**
 * Slugify a string (convert to URL-safe format)
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Extract initials from a name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

/**
 * Number Utilities
 */

/**
 * Format number as currency
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  oldValue: number,
  newValue: number
): number => {
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Round number to specified decimal places
 */
export const roundTo = (value: number, decimals: number): number => {
  return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals);
};

/**
 * Clamp number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Generate random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Array Utilities
 */

/**
 * Remove duplicate items from array
 */
export const uniqueArray = <T,>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * Flatten nested array
 */
export const flattenArray = <T,>(arr: any[]): T[] => {
  return arr.reduce((acc: T[], val) => {
    return acc.concat(Array.isArray(val) ? flattenArray(val) : val);
  }, [] as T[]);
};

/**
 * Group array items by key
 */
export const groupBy = <T,>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

/**
 * Chunk array into smaller arrays
 */
export const chunk = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

/**
 * Find differences between two arrays
 */
export const difference = <T,>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((item) => !arr2.includes(item));
};

/**
 * Find intersection of two arrays
 */
export const intersection = <T,>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((item) => arr2.includes(item));
};

/**
 * Shuffle array (Fisher-Yates)
 */
export const shuffle = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Sort array of objects by property
 */
export const sortBy = <T,>(
  arr: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};

/**
 * Object Utilities
 */

/**
 * Deep clone an object
 */
export const deepClone = <T,>(obj: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge objects deeply
 */
export const deepMerge = <T extends object>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = deepMerge(
          target[key] || {},
          source[key] as any
        ) as any;
      } else {
        result[key] = source[key] as any;
      }
    }
  }
  return result;
};

/**
 * Get nested object value by path
 */
export const getNestedValue = <T,>(
  obj: any,
  path: string,
  defaultValue?: T
): T => {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    value = value?.[key];
  }
  return value !== undefined ? value : defaultValue;
};

/**
 * Set nested object value by path
 */
export const setNestedValue = <T extends object>(
  obj: T,
  path: string,
  value: any
): T => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;
  for (const key of keys) {
    if (!(key in current)) (current as any)[key] = {};
    current = (current as any)[key];
  }
  (current as any)[lastKey] = value;
  return obj;
};

/**
 * Get object keys with specific type
 */
export const objectKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

/**
 * Transform object values
 */
export const mapObjectValues = <T extends object, U>(
  obj: T,
  fn: (value: any) => U
): Record<keyof T, U> => {
  const result = {} as Record<keyof T, U>;
  for (const key in obj) {
    result[key] = fn(obj[key]);
  }
  return result;
};

/**
 * Date Utilities
 */

/**
 * Format date to readable string
 */
export const formatDate = (date: Date, format: string = 'MM/DD/YYYY'): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year));
};

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Add days to date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get days between two dates
 */
export const daysBetween = (date1: Date, date2: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((date2.getTime() - date1.getTime()) / msPerDay);
};

/**
 * Validation Utilities
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate strong password
 */
export const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};

/**
 * Color Utilities
 */

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Convert RGB to hex color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join('')}`;
};

/**
 * Get contrasting text color (black or white)
 */
export const getContrastingColor = (hexColor: string): string => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export default {
  capitalize,
  camelToKebab,
  kebabToCamel,
  truncate,
  reverseString,
  countWords,
  removeDuplicates,
  slugify,
  getInitials,
  formatCurrency,
  formatNumber,
  calculatePercentageChange,
  roundTo,
  clamp,
  randomBetween,
  uniqueArray,
  flattenArray,
  groupBy,
  chunk,
  difference,
  intersection,
  shuffle,
  sortBy,
  deepClone,
  deepMerge,
  getNestedValue,
  setNestedValue,
  objectKeys,
  mapObjectValues,
  formatDate,
  getRelativeTime,
  isToday,
  addDays,
  daysBetween,
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isStrongPassword,
  hexToRgb,
  rgbToHex,
  getContrastingColor,
};
