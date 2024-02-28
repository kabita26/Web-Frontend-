import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from "./Sidebar.tsx";
import '../css/AdminUpload.css';


const AdminManageProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        itemName: '',
        price: '',
        image: '',
        description: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/item/retrieve-item-by-id/${id}`);
                const productData = response.data;
                setProduct({
                    itemName: productData.itemName || '',
                    price: productData.price || '',
                    image: productData.image || '',
                    description: productData.description || '',
                });
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:8080/item/update/${id}`, product);
            console.log('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="upload-container">

        <AdminSideBar />
            <div className="add-product-box">
                <h2>Manage a Product</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="inputField">
                        <label htmlFor="itemName">Name:</label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={product.itemName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="inputField">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="inputField">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={product.image}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="inputField">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default AdminManageProduct;
