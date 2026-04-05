import api from "../api/axios";
import { useState, useEffect } from "react";
import "./css/Courses.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";

function Courses() {

    const { showFlash } = useContext(FlashContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const [popup, setPopup] = useState({
        popup: false,
        id: ""
    });


    useEffect(() => {
        const fetchCourses = async () => {
            const res = await api.get("/courses");
            setCourses(res.data);
        };
        fetchCourses();
    }, []);


    async function deleteCourse() {
        const id = popup.id;
        try {
            const res = await api.delete(`/courses/${id}`);
            setCourses(prev => prev.filter(course => course._id !== id));

            setPopup({ popup: false, id: "" });

            showFlash(res.data.message, "success");

        } catch (err) {
            showFlash(err.response?.data?.message || "Error", "error");
        }
    }

    return (
        <>
            <div className="course-page-header">
                <h1>All Courses</h1>
                {user?.role === "user" &&
                    <p>Explore our courses and start learning today</p>
                }
            </div>

            <main className="course-grid">

                {courses.map((course) => (
                    <div className="course-card" key={course._id}>
                        <div className="course-card-img-wrap">
                            <img className="course-card-img" src={course.thumbnail} alt="course-image" />
                        </div>
                        <div className="course-card-body">
                            <h2 className="course-card-title">{course.title}</h2>
                            <p className="course-card-desc">{course.description}</p>
                        </div>
                        <div className="course-card-footer">
                            <div className="course-card-price">{course.price}<span>/-</span></div>
                            <button className="course-btn" onClick={() => navigate(`/courses/${course._id}`)}>View Details</button>
                        </div>

                        {user?.role === "admin" &&
                            <div className="admin-option">
                                <button onClick={() => navigate(`/admin/courses/edit/${course._id}`)}>Edit</button>
                                <button onClick={() => setPopup({ popup: true, id: course._id })}>Delete</button>
                                <button onClick={() => navigate(`/admin/lessons/add/${course._id}`)}>Add Lessons</button>
                                <button onClick={() => navigate(`/admin/lessons/action/${course._id}`)}>Edit/Delete Lesson</button>
                            </div>
                        }
                    </div>

                ))}

                {popup.popup && <div className="popup-overlay"> {/* CSS apply from CourseDetails.css file */}
                    <div className="popup-box" >

                        <h2 className="popup-title">Delete Course</h2>
                        <p className="popup-desc">Are you sure you want to delete course!</p>

                        <div className="popup-actions">
                            <button className="popup-btn-cancel" onClick={() => setPopup({ popup: false, id: "" })}>
                                Cancel
                            </button>
                            <button className="popup-btn-confirm" onClick={deleteCourse}>
                                Yes, Delete
                            </button>
                        </div>

                    </div>
                </div>}

            </main>
        </>
    )
}

export default Courses;