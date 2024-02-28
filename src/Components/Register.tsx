//
import "../css/Register.css";
import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar.tsx";
import skinImage from '../assets/images/slide.jpg';

const UserRegister = () => {
    const saveData = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: (requestData: any) => {
            return axios.post("http://localhost:8080/user/save", requestData, {
            });
        },
    });

    const onRegister = (values: any) => {
        console.log("Register button clicked");
        console.log(values);
        saveData.mutate(values)
    };

    const { register, handleSubmit } = useForm();

    return(
        <>
            <Navbar />
            <div className="main-register-wrapper">
                <div className="leftcontent_regsiter">
                    <img src={skinImage} alt="Skin" /> {/* Insert your image here */}
                </div>
                <div className="wrapperRegister">
                    <div className="form-box-register">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit(onRegister)}>
                            <div className="input-box-register">
                                <input type="text" required {...register("username")} />
                                <label>Username </label>
                            </div>
                            <div className="input-box-register">
                                <input type="email" required {...register("email")} />
                                <label>Email </label>
                            </div>
                            <div className="input-box-register">
                                <input type="password" required {...register("password")} />
                                <label>Password</label>
                            </div>
                            <div className="input-box-register">
                                <input type="password" required {...register("confirmPassword")} />
                                <label>Confirm Password</label>
                            </div>
                            <div className="conditions">
                                <label>
                                    <input type="checkbox" />
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            <button type="submit" className="register-btn">
                                Register
                            </button>
                            <div className="login">
                                <p>
                                    Already have an account?
                                    <a href="login" className="Register-link">
                                        {" "}
                                        Login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserRegister;
