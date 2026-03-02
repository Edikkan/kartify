export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  VENDOR: 'vendor',
};

export const CATEGORIES = [
  { id: 1, name: 'Electronics', icon: '📱' },
  { id: 2, name: 'Fashion', icon: '👕' },
  { id: 3, name: 'Home & Garden', icon: '🏠' },
  { id: 4, name: 'Sports', icon: '⚽' },
  { id: 5, name: 'Beauty', icon: '💄' },
  { id: 6, name: 'Books', icon: '📚' },
];
