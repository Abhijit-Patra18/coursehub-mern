import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import "./css/courseDetails.css";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";
import { BiSolidPurchaseTag } from "react-icons/bi";



function CourseDetails() {

    const [showPopup, setShowPopup] = useState(false);

    const { showFlash } = useContext(FlashContext);

    const { id } = useParams();
    const [course, setCourse] = useState();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(`/courses/${id}`);
                setCourse(res.data);
            } catch (err) {
                showFlash(err.response.data.message, "error");
            }
        };
        fetchCourse();
    }, [id]);

    async function handlePurchase(courseId) {
        setShowPopup(false);
        try {
            const res = await api.post(`purchase`, { courseId });
            showFlash(res.data.message, "success");
        } catch (err) {
            showFlash(err.response.data.message, "error");
        }
    }
    return (
        <>
            {course &&

                <div className="course-detail">

                    <img className="course-detail-img"
                        src={course.thumbnail}
                        alt="course-image" />

                    <div className="course-detail-info">
                        <h1 className="course-detail-title">{course.title}</h1>
                        <p className="course-detail-desc">{course.description}</p>
                        <div className="course-detail-footer">
                            <div className="course-detail-price">{course.price}<span>/-</span></div>
                            <button className="btn-purchase" onClick={() => setShowPopup(true)}>Purchase Now</button>
                        </div>
                    </div>


                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-box" >

                                <div className="popup-icon"><BiSolidPurchaseTag /></div>
                                <h2 className="popup-title">Confirm Purchase</h2>
                                <p className="popup-desc">Are you sure you want to purchase <strong>{course.title}</strong>?</p>
                                <p className="popup-price">Rs {course.price}/-</p>

                                <div className="popup-actions">
                                    <button className="popup-btn-cancel" onClick={() => setShowPopup(false)}>
                                        Cancel
                                    </button>
                                    <button className="popup-btn-confirm" onClick={() => handlePurchase(course._id)}>
                                        Yes, Purchase
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                </div>

            }
        </>
    )
}
export default CourseDetails;