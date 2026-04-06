
import api from "../api/axios";
import "./css/AddLessons.css";  //Style apply from AddLessons.css file
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";
import { useNavigate } from "react-router-dom";


function EditLesson() {

    const navigate = useNavigate();
    const { showFlash } = useContext(FlashContext);
    const { id } = useParams();
    const [lesson, setLesson] = useState({
        title: "",
        url: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/lessons/edit/${id}`);
                setLesson(res.data);
            } catch (err) {
                showFlash(err.response?.data?.message || "Error", "error");
            }
        }
        fetchData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await api.put(`lessons/${id}`, {
                title: lesson.title,
                url: lesson.url
            })
            showFlash(res.data.message, "success");
            navigate(-1);
        } catch (err) {
            showFlash(err.response?.data?.message || "Error", "error");
        }
    }


    return (
        <>
            <form className="lessons-form" onSubmit={handleSubmit}>

                <div className="lessons-box">
                    <h2>Edit Lesson</h2>
                    <div className="lesson-input">

                        <label htmlFor="title">Add video Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) => setLesson({ ...lesson, [e.target.name]: e.target.value })}
                        />

                        <label htmlFor="url">Add video URL</label>
                        <input
                            id="url"
                            name="url"
                            type="text"
                            placeholder="Lesson URL"
                            value={lesson.url}
                            onChange={(e) => setLesson({ ...lesson, [e.target.name]: e.target.value })}
                        />

                    </div>

                    <div className="lesson-footer">
                        <button type="submit" className="submit-lesson-btn">
                            Update Lesson
                        </button>
                    </div>
                </div>

            </form>
        </>
    )
}

export default EditLesson;