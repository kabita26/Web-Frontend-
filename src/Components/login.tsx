import { useState, useEffect } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import skinImage from '../assets/images/slide.jpg';
import Navbar from './Navbar.tsx';
import { useMutation } from 'react-query';
import '../css/login.css';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

    useEffect(() => {
        // Check if user is logged in by checking if there's a token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const loginUser = useMutation({
        mutationKey: 'LOGINUSER',
        mutationFn: (loginData) => {
            return axios.post("http://localhost:8080/authenticate", loginData);
        },
        onSuccess: (data) => {
            console.log(data.data)
            localStorage.setItem('token', data.data.token); // Store token in localStorage
            setIsLoggedIn(true); // Update login status
            if (data.data.role === "admin") {
                navigate('/admin'); // Use navigate instead of window.location.href for client-side routing
            } else {
                navigate('/');
            }
        },
        onError: (error) => {
            console.error("Error during login: ", error);
            alert("Something went wrong");
        }
    });

    const onSubmit = (values: any) => {
        loginUser.mutate(values);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update login status
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <>
            <Navbar />
            <div className="main-login-wrapper">
                <div className="leftcontent_login">
                    <img src={skinImage} alt="Skin" />
                </div>
                <div className="wrapper">
                    <div className="form-box">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-box">
                                <div className="input-with-icon">
                                    <MdEmail className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", { required: true })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-box">
                                <div className="input-with-icon">
                                    <MdLock className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", { required: true })}
                                        required
                                    />
                                </div>
                            </div>

                            {loginUser.error && <div className="error">{loginUser.error.message}</div>}

                            <button type="submit" className="btn" disabled={loginUser.isLoading}>
                                {loginUser.isLoading ? "Logging in..." : "Login"}
                            </button>

                            <div className="register">
                                <p>
                                    Don't have an account?
                                    <a href="register" className="Login-link">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                    {isLoggedIn && (
                        <div className="logout-dropdown">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
