// types.ts

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CartContextType {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: Function
}
