
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
    const [popup, setPopup] = useState({
        popup: false,
        id: ""
    });


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
    }, [id])


    async function deleteLesson() {
        try {
            const res = await api.delete(`/lessons/${popup.id}`);
            showFlash(res.data.message, "success");
            setPopup({ popup: false, id: "" });
            setLessons(prev => prev.filter(lesson => lesson._id !== popup.id));
        } catch (err) {
            showFlash(err.response?.data?.message || "Error", "error");
        }

    }

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
                                <button className="lesson-delete-btn" onClick={() => setPopup({ popup: true, id: lesson._id })}>Delete</button>
                            </div>
                        </div>

                    )}

                    {popup.popup && <div className="popup-overlay"> {/* CSS apply from CourseDetails.css file */}
                        <div className="popup-box" >

                            <h2 className="popup-title">Delete Lesson</h2>
                            <p className="popup-desc">Are you sure you want to delete lesson!</p>

                            <div className="popup-actions">
                                <button className="popup-btn-cancel" onClick={() => setPopup({ popup: false, id: "" })}>
                                    Cancel
                                </button>
                                <button className="popup-btn-confirm" onClick={deleteLesson}>
                                    Yes, Delete
                                </button>
                            </div>

                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default ManageLesson;