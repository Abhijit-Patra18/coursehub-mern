
import "./css/AddLessons.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { useContext } from "react";
import { FlashContext } from "../../context/FlashContext";
import { LoadingContext } from "../../context/LoadingContext";



function AddLessons() {

    const { showFlash } = useContext(FlashContext);
    const { setLoading } = useContext(LoadingContext);
    const { id } = useParams();

    const [lessons, setLessons] = useState([
        { id: Date.now(), title: "", video: null }
    ]);

    function addLesson() {
        setLessons([...lessons, { id: Date.now(), title: "", video: null }]);
    }

    function handleChange(index, field, value) {
        const updated = [...lessons];
        updated[index][field] = value;
        setLessons(updated);
    }

    function handleFile(index, file) {
        const updated = [...lessons];
        updated[index].video = file;
        setLessons(updated);
    }

    function deleteLesson(index) {
        const updated = lessons.filter((_, i) => i !== index);
        setLessons(updated);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        try {
            if (lessons.some(l => !l.title || !l.video)) {
                setLoading(false);
                return showFlash("All fields are required", "error");
            }

            const formData = new FormData();
            formData.append("courseId", id);

            lessons.forEach((lesson) => {

                formData.append("titles", lesson.title);
                formData.append("videos", lesson.video);

            });

            const res = await api.post("/lessons/add", formData);

            showFlash(res.data.message, "success");
            setLessons([{ id: Date.now(), title: "", video: null }]);
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

                    <h2>Add Lessons</h2>

                    {lessons.map((lesson, index) => (

                        <div className="lesson-input" key={lesson.id}>
                            <span className="lesson-num">#{index + 1}</span>

                            <label htmlFor={`title${index}`}>Add video Title</label>
                            <input
                                id={`title${index}`}
                                type="text"
                                placeholder="Lesson Title"
                                value={lesson.title}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                            />

                            <label htmlFor={`video${index}`}>Add video File</label>
                            <input
                                id={`video${index}`}
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFile(index, e.target.files[0])}
                            />

                            <button
                                type="button"
                                className="delete-lesson-btn"
                                onClick={() => deleteLesson(index)}
                                disabled={lessons.length === 1}
                            >
                                Delete Lesson
                            </button>

                        </div>
                    ))}

                    <div className="lesson-footer">

                        <button type="button" className="add-lesson-btn" onClick={addLesson}>
                            + Add Lesson
                        </button>
                        <button type="submit" className="submit-lesson-btn">
                            Submit Lessons
                        </button>

                    </div>
                </div>

            </form>
        </>
    )
}

export default AddLessons;