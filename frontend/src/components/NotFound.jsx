

import "./css/NotFound.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function NotFound() {

    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const countdown = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);

        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        };
    }, []);


    return (
        <div className="notFound-container">

            <div className="notFound-box">
                <h2>Page Not Found</h2>
                <button className="notFound-btn" onClick={() => navigate("/")}>Go to Home Page</button>
                <p className="notFound-text">Redirecting to Home in {count}s</p>
            </div>

        </div>
    )
}

export default NotFound;