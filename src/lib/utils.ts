
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const calculateTotalAmount = (cartItems: any[]): number => {
  const finalTotal =  cartItems.reduce((total, item) => {
      return total + item.priceRange.minVariantPrice.amount * item.quantity;
  }, 0);

  return finalTotal;
};
