import api from "../api/axios";
import { useState, useEffect } from "react";

function Courses() {

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
            {courses.map((course) => (
                <div>
                    <p key={course._id}>{course.title}</p>
                    <p>{course.price}</p>
                </div>
            ))}

        </>
    )
}

export default Courses;