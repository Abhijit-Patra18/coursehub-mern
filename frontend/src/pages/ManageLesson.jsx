
import api from "../api/axios";
import "./css/ManageLesson.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";


function ManageLesson() {

    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const { showFlash } = useContext(FlashContext);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`lessons/${id}`);
                setLessons(res.data);
            } catch (err) {
                showFlash(err.response?.data?.message || "Error", "error");
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="manage-lessons-title">
                <h1>Manage Your Lessons</h1>
            </div>
            <div className="manage-lessons">

                {!lessons[0] && <p>This course don't have any lessons</p>}

                <div className="lessons-items">
                    {lessons && lessons.map((lesson) =>

                        <div className="lesson-item" key={lesson._id}>
                            <span className="lesson-title"><span>{`➡️ `}</span>{lesson.title}</span>
                            <div className="lesson-actions">
                                <button className="lesson-edit-btn" onClick={() => navigate(`/admin/lessons/edit/${lesson._id}`)}>Edit</button>
                                <button className="lesson-delete-btn">Delete</button>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}

export default ManageLesson;