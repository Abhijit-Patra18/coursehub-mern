import { useState } from "react";
import "../css/pages/Login.css";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";
import { useNavigate } from "react-router-dom";


function Login() {

    const { login } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);

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

        try {
            const res = await api.post("/login", {
                ...user
            })
            login(res.data);
            showFlash(res.data.message, "success");
            setUser({
                email: "",
                password: ""
            })
            setTimeout(() => {
                navigate("/courses");
            }, 1000);
        } catch (err) {
            showFlash(err.response.data.message, "error");
        }
    }

    return (
        <>
            <form className="login-form" onSubmit={formSubmit}>
                <h3>Login at Coursehub</h3>
                <input type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleChange} autoComplete="new-email" />
                <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleChange} autoComplete="new-password" />
                <button type="submit" className="login-btn">Login</button>
            </form>
        </>
    )
}
export default Login;