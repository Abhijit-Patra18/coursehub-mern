import "./css/Register.css";
import { useState } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";

function Register() {

    const { showFlash } = useContext(FlashContext);

    const [accepted, setAccepted] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    async function formSubmit(event) {
        event.preventDefault();
        if (!accepted) {
            showFlash("Acceept our terms and condition", "error");
            return;
        }
        try {
            const res = await api.post("/register", {
                ...user
            });
            showFlash(res.data.message, "success");
            setUser({
                name: "",
                email: "",
                password: "",
            })
            setAccepted(false);

        } catch (err) {
            showFlash(err.response.data.message, "error");
        }
    };

    return (
        <>
            <form className="register-form" onSubmit={formSubmit}>

                <div className="register-box">
                    <h2>Create your account</h2>
                    <p>Already have an account? <a href="/login">Login here</a></p>

                    <div className="input-box">
                        <label htmlFor="name">Your Name</label>
                        <input id="name" type="text" placeholder="Enter Your Name" name="name" value={user.name} onChange={handleChange} autoComplete="off" />
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleChange} autoComplete="new-email" />
                        <label htmlFor="password" >Password</label>
                        <input id="password" type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleChange} autoComplete="new-password" />

                        <div className="check-field">
                            <input type="checkbox" id="terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                            <label htmlFor="terms">
                                I agree to the <a href="#">Terms & Conditions</a> and
                                <a href="#">Privacy Policy</a> of CourseHub.
                            </label>
                        </div>


                        <button type="submit" className="register-btn">Create Account</button>
                    </div>
                    <p>Already registered? <a href="/login">Sign in</a></p>
                </div>

            </form>
        </>
    )
}
export default Register;