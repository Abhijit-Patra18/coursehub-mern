
import "./css/Contact.css";
import { useState } from "react";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";
import { LoadingContext } from "../context/LoadingContext";
import api from "../api/axios";


function Contact() {

    const [message, setMessage] = useState({
        name: "",
        email: "",
        message: ""
    });
    const { showFlash } = useContext(FlashContext);
    const { setLoading } = useContext(LoadingContext);

    function handleChange(event) {
        setMessage({ ...message, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            const res = await api.post("/contact", {
                ...message
            });
            showFlash(res.data.message, "success");
            setMessage({
                name: "",
                email: "",
                message: ""
            })
        } catch (err) {
            showFlash(err.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="contact-container">

                <h2 className="contact-title">Contact Us</h2>

                <div className="contact-box">
                    <form className="contact-form" onSubmit={handleSubmit}>

                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" placeholder="Enter Your Name" name="name" value={message.name} onChange={handleChange} />

                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" placeholder="Enter Your Email" name="email" value={message.email} onChange={handleChange} />

                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="Describe Your Message" name="message" value={message.message} onChange={handleChange} />

                        <button type="submit" className="contact-btn">
                            Send Message
                        </button>

                    </form>
                </div>

            </div>
        </>
    )
}
export default Contact;