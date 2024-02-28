import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContex.tsx';

interface CartItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

const AddToCart: React.FC<{ item?: CartItem }> = ({ item }) => {
    const { addToCart, updateCartItem, removeFromCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = async () => {
        try {
            if (!item || !item.image) {
                toast.error('Product image is missing!', { position: 'top-right' });
                return;
            }

            const newItem = { ...item, quantity };
            await axios.post('http://localhost:8080/cart/add', newItem);
            addToCart(newItem);
            toast.success('Product added to cart successfully!', { position: 'top-right' });
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleUpdateCartItem = async () => {
        try {
            const updatedItem = { ...item, quantity };
            await axios.put(`http://localhost:8080/cart/update/${item.id}`, updatedItem);
            updateCartItem(updatedItem);
            toast.success('Cart item updated successfully!', { position: 'top-right' });
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const handleRemoveFromCart = async () => {
        try {
            await axios.delete(`http://localhost:8080/cart/remove/${item.id}`);
            removeFromCart(item.id);
            toast.success('Product removed from cart successfully!', { position: 'top-right' });
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    return (
        <div>
            {item && (
                <div>
                    <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                    <h2>{item.name}</h2>
                    <p>Price: {item.price}</p>
                    <input type="number" value={quantity} onChange={handleQuantityChange} />
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleUpdateCartItem}>Update Cart</button>
                    <button onClick={handleRemoveFromCart}>Remove from Cart</button>
                </div>
            )}
        </div>
    );
};

export default AddToCart;
