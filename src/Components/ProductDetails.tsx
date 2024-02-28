import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ProductDetail.css";
import { useCart } from "./CartContex.tsx";
import axios from "axios";

interface Product {
    id: string;
    itemName: string;
    image: string;
    price: string;
    description: string;
}

interface Comment {
    id: string;
    userEmail: string;
    content: string;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComment] = useState<string>(''); // State for storing the comment
    const [comments, setComments] = useState<Comment[]>([]); // State for storing all comments
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null); // State for storing the ID of the comment being edited

    const navigate = useNavigate();
    const { addToCart } = useCart(); // Access addToCart function from CartContext

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Product>(`http://localhost:8080/item/retrieve-item-by-id/${id}`);
                const updatedProduct = { ...response.data }; // Rename productName to name
                console.log('Response:', updatedProduct);
                setProduct(updatedProduct);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching item data:', error);
                setError('Error fetching item details. Please try again.');
                setIsLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);


    const handleAddToCart = async () => {
        if (product) {
            addToCart({
                id: product.id,
                image: product.image,
                itemName:product.itemName,
                price: Number(product.price)
            });
            try {
                await axios.post('http://localhost:8080/cart/add', { image: product.image, price: Number(product.price),name:product.itemName });
                navigate(`/cart`);
            } catch (error) {
                console.error("error")
            }
        }
    };


    const handleBuyNow = () => {
        console.log("Product bought:", product);
        toast.success("Product purchased successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = () => {
        if (comment.trim() !== '') {
            if (selectedCommentId) {
                const updatedComments = comments.map((c) =>
                    c.id === selectedCommentId ? { ...c, content: comment } : c
                );
                setComments(updatedComments);
                setComment('');
                setSelectedCommentId(null);
            } else {
                const newCommentId = generateUniqueId();
                const newComment: Comment = {
                    id: newCommentId,
                    userEmail: 'user@example.com',
                    content: comment
                };
                setComments([...comments, newComment]);
                setComment('');
            }
        }
    };

    const handleDeleteComment = (commentId: string) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    };

    const handleEditComment = (commentId: string) => {
        const selectedComment = comments.find((comment) => comment.id === commentId);
        if (selectedComment) {
            setComment(selectedComment.content);
            setSelectedCommentId(commentId);
        }
    };

    const generateUniqueId = () => {
        return new Date().getTime().toString();
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : product ? (
                <div>
                    <div className="product-details-box-container">
                        <img src={product.image} className="product-details-image" alt={product.itemName} />
                        <div className="product-details">
                            <h2>{product.itemName}</h2>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                            <button onClick={handleAddToCart} className="add-to-cart-button">
                                Add to Cart
                            </button>
                            <button onClick={handleBuyNow} className="buy-now-button">
                                Buy Now
                            </button>
                        </div>
                    </div>
                    <div className="comment-container">
                        <div className="comment-box">
                            <h3>Leave a Comment</h3>
                            <input type="text" value={comment} onChange={handleCommentChange} placeholder="Write your comment here..." />
                            <button onClick={handleSubmitComment}>
                                {selectedCommentId ? 'Update' : 'Submit'}
                            </button>
                        </div>
                        <div className="comment-section">
                            <h3>Comments</h3>
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id}>
                                        {comment.content}
                                        <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No product details available.</p>
            )}
        </div>
    );
};

export default ProductDetails;
