import api from "../api/axios";
import { useState, useEffect } from "react";
import "./css/Courses.css";
import { useNavigate } from "react-router-dom";


function Courses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await api.get("/courses");
            setCourses(res.data);
        };
        fetchCourses();
    }, []);

    return (
        <>
            <div className="course-page-header">
                <h1>All Courses</h1>
                <p>Explore our courses and start learning today</p>
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
                    </div>
                ))}
            </main>
        </>
    )
}

export default Courses;