'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';


export function CartButton() {
  const { cartItems, setIsCartOpen } = useCart();

  return (
    <button
    className='relative'
    onClick={() => setIsCartOpen(true)}
    >
      <ShoppingCart className="h-5 w-5" />
      {cartItems.length > 0 && (
        <span className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-primary-foreground text-white">
          {cartItems.length}
        </span>
      )}
    </button>
  );
}