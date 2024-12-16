'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { calculateTotalAmount, formatPrice } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';

export function CartModal() {
  const { isCartOpen, setIsCartOpen, cartItems, removeItem, updateQuantity } = useCart();

  return (
    <Dialog open={isCartOpen} onOpenChange={() => setIsCartOpen(!isCartOpen)}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <img
                      src={item.images.edges[0].node.url}
                      alt={item.title}
                      className="h-full w-full rounded object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(
                        parseFloat(item.priceRange.minVariantPrice.amount) * item.quantity,
                        item.priceRange.minVariantPrice.currencyCode
                      )}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotalAmount(cartItems), 'USD')}</span>
                </div>
                <button className="mt-4 w-full">Checkout</button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}