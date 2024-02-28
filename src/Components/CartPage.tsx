import React from "react";
import { useCart } from "./CartContex";
import "../css/CartPage.css";
import { toast } from "react-toastify";

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateCartItem } = useCart();

    const handleRemoveFromCart = (itemId: string) => {
        removeFromCart(itemId);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            // Find the item in the cart
            const selectedItem = cart.find(item => item.id === itemId);
            if (selectedItem) {
                // Update the quantity for the specified item
                updateCartItem({ ...selectedItem, quantity: value });
            }
        }
    };
    const handleBuyNow = () => {
        toast.success("Items purchased successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // Add logic for handling the "Buy Now" action if needed
    };


    return (
        <div>
            <h2>Cart Items</h2>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div>
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
                            <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(e, item.id)} />
                            <p>Total Price: {parseFloat(item.price) * item.quantity}</p>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>

                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleBuyNow}>Buy Now</button>

        </div>
    );
};

export default CartPage;
