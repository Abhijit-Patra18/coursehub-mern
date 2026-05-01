
import "./css/CTABanner.css";
import { useNavigate } from "react-router-dom";


function CTABanner() {

    const navigate = useNavigate();

    return (
        <>
        <div className="CTA-section">

            <h2 className="CTA-title">Ready to start your <br></br> coding journey?</h2>

            <p>Join 1000+ students already learning on CourseHub.</p>
            
            <button className="CTA-btn" onClick={() => navigate("/courses")}>Browse All Courses</button>

        </div>
        </>
    )
}

export default CTABanner;