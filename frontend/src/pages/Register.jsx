import "..//css/pages/Register.css";
import { useState } from "react";
import api from "../api/axios";


function Register() {

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
        try {
            const res = await api.post("/register", {
                ...user
            });
            //success
            setUser({
                name: "",
                email: "",
                password: "",
            })

        } catch (err) {
          //error
        }
    };


    return (
        <>
       
            <form className="register-form" onSubmit={formSubmit}>
                <h3>Register at Coursehub</h3>
                <input type="text" placeholder="Enter Your Name" name="name" value={user.name} onChange={handleChange} autoComplete="off"/>
                <input type="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handleChange} autoComplete="new-email"/>
                <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handleChange} autoComplete="new-password"/>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </>
    )
}
export default Register;