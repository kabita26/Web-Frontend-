import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import '../css/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

    useEffect(() => {
        // Check if user is logged in by checking if there's a token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update login status
        // Additional logic for redirecting, clearing user data, etc.
    };

    return (
        <header>
            <div className="logo-flex">
                <NavLink to="/" className="Name">
                    <h2>Skin Care</h2>
                </NavLink>
            </div>
            <div className="navlist">
                <NavLink to="/products" className="nav-link">Products</NavLink>
                <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                {isLoggedIn ? (
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                ) : (
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                )}
            </div>
        </header>
    );
};

export default Navbar;
