import React, { useState } from 'react';
import axios from 'axios';
import '../css/AdminUpload.css';
import { toast } from "react-toastify";
import AdminSideBar from "./Sidebar.tsx";

const Upload: React.FC = () => {
    const [product, setProduct] = useState({
        itemName: '',
        image: '',
        price: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { itemName, description, image, price } = product;
        try {
            const { data } = await axios.post('http://localhost:8080/item/upload', {
                itemName,
                description,
                image,
                price,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setProduct({
                    itemName: '',
                    description: '',
                    image: '',
                    price: '',
                });
                toast.success('Uploaded Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="upload-container">
            <AdminSideBar />
            <div className="add-product-box">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputField">
                        Name:
                        <input
                            type="text"
                            name="itemName"
                            value={product.itemName}
                            onChange={(e) => setProduct({ ...product, itemName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="inputField">
                        ImageUrl:
                        <input
                            type="text"
                            name="image"
                            value={product.image}
                            onChange={(e) => setProduct({ ...product, image: e.target.value })}
                            required
                        />
                    </div>
                    <div className="inputField">
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="inputField">
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
