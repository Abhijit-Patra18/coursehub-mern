
import api from "../api/axios";
import "./css/AddLessons.css";  //Style apply from AddLessons.css file
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";
import { LoadingContext } from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";


function EditLesson() {

    const navigate = useNavigate();
    const { showFlash } = useContext(FlashContext);
    const { setLoading } = useContext(LoadingContext);
    const { id } = useParams();
    const [lesson, setLesson] = useState({
        title: "",
    });
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/lessons/edit/${id}`);
                setLesson(res.data);
            } catch (err) {
                showFlash(err.response?.data?.message || "Error", "error");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    function handleFile(event) {
        const file = event.target.files[0]
        setVideo(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("title", lesson.title);
            if (video) {
                formData.append("video", video);
            }

            const res = await api.put(`lessons/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            showFlash(res.data.message, "success");
            navigate(-1);
        } catch (err) {
            showFlash(err.response?.data?.message || "Error", "error");
        } finally {
            setLoading(false);
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

                        <label htmlFor="url">Add video</label>
                        <input
                            id="url"
                            type="file"
                            accept="video/*"
                            onChange={handleFile}
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