
import api from "../api/axios";
import "./css/ManageLesson.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ManageLesson() {

    const [lessons, setLessons] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`lessons/${id}`);
            setLessons(res.data);
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="manage-lessons-title">
                <h1>Manage Your Lessons</h1>
            </div>

            <div className="manage-lessons">

               {!lessons[0]  && <p>This course don't have any lessons</p>}

                <div className="lessons-items">
                    {lessons && lessons.map((lesson) =>
                        lesson.lessons.map((chapter) => (
                            <div className="lesson-item" key={chapter._id}>
                                <span className="lesson-title"><span>{`➡️ `}</span>{chapter.title}</span>
                                <div className="lesson-actions">
                                    <button className="lesson-edit-btn">Edit</button>
                                    <button className="lesson-delete-btn">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default ManageLesson;