
import "./css/AddLessons.css";

import { useState } from "react";
import { useParams } from "react-router-dom";

function AddLessons() {

    const { id } = useParams();
    const [lessons, setLessons] = useState([
        { title: "", url: "" }
    ]);

    function addLesson() {
        setLessons([...lessons, { title: "", url: "" }]);
    }

    function handleChange(index, field, value) {
        const updated = [...lessons];
        updated[index][field] = value;
        setLessons(updated);
    }

    function deleteLesson(index) {
        const updated = lessons.filter((_, i) => i !== index);
        setLessons(updated);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
    }


    return (
        <>
            <form className="lessons-form" onSubmit={handleSubmit}>

                <div className="lessons-box">

                    <h2>Add Lessons</h2>

                    {lessons.map((lesson, index) => (

                        <div className="lesson-input" key={index}>
                            <span className="lesson-num">#{index + 1}</span>

                            <label htmlFor="title">Add video Title</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Lesson Title"
                                value={lesson.title}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                            />

                            <label htmlFor="url">Add video URL</label>
                            <input
                                id="url"
                                type="text"
                                placeholder="Lesson URL"
                                value={lesson.url}
                                onChange={(e) => handleChange(index, "url", e.target.value)}
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
                        <button type="button" className="submit-lesson-btn">
                            Submit Lessons
                        </button>

                    </div>
                </div>

            </form>
        </>
    )
}

export default AddLessons;