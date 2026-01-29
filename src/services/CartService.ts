/**
 * Shopping Cart Service
 * Manages shopping cart operations, calculations, and state management
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  customization?: {
    text?: string;
    design?: string;
    colors?: string[];
  };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  appliedCoupon?: {
    code: string;
    discount: number;
  };
}

const TAX_RATE = 0.08;
const SHIPPING_THRESHOLD = 100;
const FREE_SHIPPING = 0;
const STANDARD_SHIPPING = 9.99;

/**
 * Calculate subtotal of cart items
 */
export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Calculate tax based on subtotal
 */
export const calculateTax = (subtotal: number): number => {
  return Number((subtotal * TAX_RATE).toFixed(2));
};

/**
 * Calculate shipping cost
 */
export const calculateShipping = (subtotal: number): number => {
  return subtotal >= SHIPPING_THRESHOLD ? FREE_SHIPPING : STANDARD_SHIPPING;
};

/**
 * Calculate total cart amount
 */
export const calculateCartTotal = (
  subtotal: number,
  tax: number,
  shipping: number,
  discount: number = 0
): number => {
  return Number((subtotal + tax + shipping - discount).toFixed(2));
};

/**
 * Validate cart item
 */
export const validateCartItem = (item: CartItem): string[] => {
  const errors: string[] = [];

  if (!item.id) errors.push('Item ID is required');
  if (!item.name) errors.push('Item name is required');
  if (item.price <= 0) errors.push('Item price must be greater than 0');
  if (item.quantity <= 0) errors.push('Item quantity must be greater than 0');
  if (item.quantity > 100) errors.push('Item quantity cannot exceed 100');

  return errors;
};

/**
 * Validate coupon code
 */
export const validateCoupon = (code: string): { valid: boolean; discount: number } => {
  const coupons: Record<string, number> = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    SAVE30: 0.3,
    WELCOME: 0.15,
  };

  const discount = coupons[code.toUpperCase()];
  return {
    valid: discount !== undefined,
    discount: discount || 0,
  };
};

/**
 * Apply coupon to cart
 */
export const applyCoupon = (
  cart: Cart,
  code: string
): { success: boolean; message: string; newCart?: Cart } => {
  const validation = validateCoupon(code);

  if (!validation.valid) {
    return { success: false, message: 'Invalid coupon code' };
  }

  const discountAmount = cart.subtotal * validation.discount;
  const newCart: Cart = {
    ...cart,
    appliedCoupon: {
      code,
      discount: Number(discountAmount.toFixed(2)),
    },
    total: calculateCartTotal(
      cart.subtotal,
      cart.tax,
      cart.shipping,
      discountAmount
    ),
  };

  return {
    success: true,
    message: `Coupon applied successfully! You saved $${discountAmount.toFixed(2)}`,
    newCart,
  };
};

/**
 * Add item to cart
 */
export const addToCart = (cart: Cart, item: CartItem): Cart => {
  const errors = validateCartItem(item);
  if (errors.length > 0) {
    throw new Error(`Invalid cart item: ${errors.join(', ')}`);
  }

  const existingItem = cart.items.find(
    (i) =>
      i.id === item.id &&
      i.size === item.size &&
      i.color === item.color
  );

  let newItems: CartItem[];
  if (existingItem) {
    newItems = cart.items.map((i) =>
      i === existingItem
        ? { ...i, quantity: i.quantity + item.quantity }
        : i
    );
  } else {
    newItems = [...cart.items, item];
  }

  const subtotal = calculateSubtotal(newItems);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const discount = cart.appliedCoupon?.discount || 0;

  return {
    items: newItems,
    subtotal,
    tax,
    shipping,
    total: calculateCartTotal(subtotal, tax, shipping, discount),
    appliedCoupon: cart.appliedCoupon,
  };
};

/**
 * Remove item from cart
 */
export const removeFromCart = (cart: Cart, itemId: string, size?: string, color?: string): Cart => {
  const newItems = cart.items.filter(
    (i) => !(i.id === itemId && i.size === size && i.color === color)
  );

  const subtotal = calculateSubtotal(newItems);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const discount = cart.appliedCoupon?.discount || 0;

  return {
    items: newItems,
    subtotal,
    tax,
    shipping,
    total: calculateCartTotal(subtotal, tax, shipping, discount),
    appliedCoupon: cart.appliedCoupon,
  };
};

/**
 * Update item quantity in cart
 */
export const updateItemQuantity = (
  cart: Cart,
  itemId: string,
  quantity: number,
  size?: string,
  color?: string
): Cart => {
  if (quantity <= 0) {
    return removeFromCart(cart, itemId, size, color);
  }

  if (quantity > 100) {
    throw new Error('Quantity cannot exceed 100');
  }

  const newItems = cart.items.map((item) =>
    item.id === itemId && item.size === size && item.color === color
      ? { ...item, quantity }
      : item
  );

  const subtotal = calculateSubtotal(newItems);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const discount = cart.appliedCoupon?.discount || 0;

  return {
    items: newItems,
    subtotal,
    tax,
    shipping,
    total: calculateCartTotal(subtotal, tax, shipping, discount),
    appliedCoupon: cart.appliedCoupon,
  };
};

/**
 * Clear entire cart
 */
export const clearCart = (cart: Cart): Cart => {
  return {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  };
};

/**
 * Get cart item count
 */
export const getCartItemCount = (cart: Cart): number => {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Get cart summary
 */
export const getCartSummary = (cart: Cart): { itemCount: number; totalPrice: string } => {
  return {
    itemCount: getCartItemCount(cart),
    totalPrice: `$${cart.total.toFixed(2)}`,
  };
};

/**
 * Check if cart is empty
 */
export const isCartEmpty = (cart: Cart): boolean => {
  return cart.items.length === 0;
};

/**
 * Get cart item by ID
 */
export const getCartItem = (cart: Cart, itemId: string, size?: string, color?: string): CartItem | undefined => {
  return cart.items.find(
    (item) =>
      item.id === itemId && item.size === size && item.color === color
  );
};

/**
 * Estimate delivery date
 */
export const estimateDeliveryDate = (businessDaysToAdd: number = 5): Date => {
  const date = new Date();
  let daysAdded = 0;

  while (daysAdded < businessDaysToAdd) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    // Skip weekends
    if (day !== 0 && day !== 6) {
      daysAdded++;
    }
  }

  return date;
};

/**
 * Create empty cart
 */
export const createEmptyCart = (): Cart => {
  return {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  };
};

export const CartService = {
  calculateSubtotal,
  calculateTax,
  calculateShipping,
  calculateCartTotal,
  validateCartItem,
  validateCoupon,
  applyCoupon,
  addToCart,
  removeFromCart,
  updateItemQuantity,
  clearCart,
  getCartItemCount,
  getCartSummary,
  isCartEmpty,
  getCartItem,
  estimateDeliveryDate,
  createEmptyCart,
};

export default CartService;
