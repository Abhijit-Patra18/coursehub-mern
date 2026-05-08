import "./css/Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";
import { LoadingContext } from "../context/LoadingContext";
import api from "../api/axios";



function Login() {

    const { login } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);
    const { setLoading } = useContext(LoadingContext);
    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    async function formSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setDisabled(true);
        try {
            const res = await api.post("/login", {
                ...user
            })
            login(res.data);
            showFlash(`Welcome back ${res.data.user.name}`, "success");
            setUser({
                email: "",
                password: ""
            });

            if (res.data.user.role === "admin") {
                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 1000)
            } else {
                setTimeout(() => {
                    navigate("/courses");
                }, 1000);
            }

        } catch (err) {
            showFlash(err.response.data.message, "error");
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }

    return (
        <>
            <form className="login-form" onSubmit={formSubmit}>

                <div className="login-box">
                    <h2>Login your account</h2>
                    <p>Don't have an account? <a href="/register"> Create Account</a></p>

                    <div className="input-box">

                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleChange} autoComplete="new-email" />
                        <label htmlFor="password" >Password</label>
                        <input id="password" type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleChange} autoComplete="new-password" />
                      
                        <button type="submit" className="login-btn" disabled={disabled}>Login</button>
                    </div>
                    <p>Don't have account? <a href="/register">Sign up</a></p>
                </div>

            </form>
        </>
    )
}
export default Login;