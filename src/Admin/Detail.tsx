import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminSideBar from "./Sidebar.tsx"; // Assuming you're using React Router for navigation

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    description: string;
}

interface Email {
    id: number;
    address: string;
}

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // State to control loading state
    const [error, setError] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false); // State to control showing details

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/item/retrieve-item-by-id/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    setError('Failed to fetch product details');
                }
            } catch (error) {
                setError('Error fetching product details: ' + error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        const fetchEmails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${id}/getById/{id}`);
                if (response.ok) {
                    const data = await response.json();
                    setEmails(data);
                } else {
                    setError('Failed to fetch emails');
                }
            } catch (error) {
                setError('Error fetching emails: ' + error.message);
            }
        };

        if(id) {
            fetchProduct();
            fetchEmails();
        }

        return () => {
            setProduct(null);
            setEmails([]);
            setError(null);
        };
    }, [id]);

    const handleBuyNow = () => {
        setShowDetails(true); // Set showDetails to true when Buy Now is clicked
        emails.forEach(email => console.log(email.address));
        // Add your buy now logic here
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if there's an error
    }

    if (!product) {
        return <div>No product found</div>; // Display message if no product is found
    }

    if (showDetails) {
        return (
            <div>
                <AdminSideBar />
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                {/* Additional details */}
            </div>
        );
    }

    return (
        <div>
            <AdminSideBar />
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>Price: {product.price}</p>
            <button onClick={handleBuyNow}>Buy Now</button>
        </div>
    );
};

export default Detail;
