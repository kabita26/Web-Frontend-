import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../css/Manage.css";
import AdminSideBar from "./Sidebar.tsx";

interface Product {
    id: string;
    itemName: string;
    image: string;
    price: string;
}

const Manage: React.FC = () => {
    const [localProducts, setLocalProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/item/retrieve-all-item');
                const result = await response.json();
                setLocalProducts(result);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (productId: string) => {
        try {
            await fetch(`http://localhost:8080/item/delete-item-by-id/${productId}`, {
                method: 'DELETE',
            });
            setLocalProducts(localProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="sidebar">
                <AdminSideBar />
            </div>
            <div className="content">
                <div className="product-list">
                    {localProducts.map(({ id, itemName, image, price }) => (
                        <div key={id} className="product-card">
                            <div className="product-image">
                                <Link to={`/item/retrieve-item-by-id/${id}`}>
                                    <img src={image} alt="" />
                                </Link>
                            </div>
                            <div className="product-info">
                                <h2 className="product-title">{itemName}</h2>
                                <p className="product-price">Price: {price}</p>
                                <div>
                                    <Link to={`/edit/${id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Manage;
