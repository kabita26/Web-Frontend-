import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillArchiveFill, BsCloudUpload, BsListCheck, BsGearFill } from 'react-icons/bs'; // Import necessary icons
import "../css/AdminSidebar.css";

const AdminSidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li>
                    <NavLink to="/admin/manage" className="active">
                        <BsFillArchiveFill /> Manage Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/add" className="active">
                        <BsCloudUpload /> Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/orders" className="active">
                        <BsListCheck /> View Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className="active">
                        <BsGearFill /> Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
