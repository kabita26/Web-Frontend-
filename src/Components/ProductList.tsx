import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import "../css/ProductList.css"

interface ProductListProps {
    products: {
        id: string;
        itemName: string;
        image: string;
        price: string;
    }[];
}

const ProductList: React.FC<ProductListProps> = () => {
    const [localProducts, setLocalProducts]
        = useState<ProductListProps['products']>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/item/retrieve-all-item');
                const result = await response.json();
                console.log('Data', result);
                setLocalProducts(result);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();

    },[]);

    return (
        <div>
            <div className="product-list">
                {Array.isArray(localProducts) && localProducts.length > 0 ? (
                    localProducts.map(({ id, itemName, image, price }) => (
                        <div key={id} className="product-card">
                            <div className="product-image">
                                <Link to={`/item/retrieve-item-by-id/${id}`}>
                                    <img src={image} alt="" className="product-image" />
                                </Link>
                            </div>
                            <div className="product-info">

                                <h2 className="product-title">{itemName}</h2>
                                <p className="product-price">Price: {price}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
