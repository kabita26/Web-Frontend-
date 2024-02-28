import React, { createContext, useContext, useState } from 'react';

// Define the shape of a cart item
interface CartItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

// Define the shape of the context value
interface CartContextValue {
    cart: CartItem[];
    addToCart: (item: { image: string; price: number; name: string; id: string }) => void; // Updated the parameter type to CartItem
    removeFromCart: (itemId: string) => void;
    updateCartItem: (updatedItem: CartItem) => void;
}

// Create a context with an initial value
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Provider component to wrap your application
export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Function to add an item to the cart
    const addToCart = (item: CartItem) => {
        setCart([...cart, item]);
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId: string) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
    };

    // Function to update the quantity of an item in the cart
    const updateCartItem = (updatedItem: CartItem) => {
        const updatedCart = cart.map(item => (item.id === updatedItem.id ? updatedItem : item));
        setCart(updatedCart);
    };

    // Create the context value
    const contextValue: CartContextValue = {
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
