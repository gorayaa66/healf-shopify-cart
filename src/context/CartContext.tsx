// CartContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, CartContextType } from './types';

// Default empty cart state
const defaultCart: CartItem[] = [];

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

// Cart Provider to manage cart state
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(defaultCart);

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);


    

    // Add item to cart
    const addItem = (item: any) => {

        const itemIndex = cartItems.findIndex((i) => i.id === item.id);
        if (itemIndex > -1) {
            // Update quantity if item already exists
            const updatedItems = [...cartItems];
            console.log({q: cartItems[itemIndex].quantity})
            updatedItems[itemIndex].quantity += 1;
            console.log({updatedItems})
            setCartItems(updatedItems)
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}])
        }
    };

    // Remove item from cart
    const removeItem = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Update quantity of an item
    const updateQuantity = (id: string, quantity: number) => {
        if(quantity < 1) {
            removeItem(id)
        } else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, quantity: quantity } : item
                )
            );
        }
        
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, totalPrice, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
