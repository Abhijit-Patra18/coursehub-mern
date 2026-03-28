import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./css/NewCourse.css";
import api from "../api/axios";


function NewCourse() {

    const [course, setCourse] = useState({
        title: "",
        description: "",
        thumbnail: "",
        price: "",
        lessons: [{ title: "", videoUrl: "" }]
    });

    // handle course fields
    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    // handle lesson change
    const handleLessonChange = (index, field, value) => {
        const updated = [...course.lessons];
        updated[index][field] = value;
        setCourse({ ...course, lessons: updated });
    };

    // add lesson
    const addLesson = () => {
        setCourse({
            ...course,
            lessons: [...course.lessons, { title: "", videoUrl: "" }]
        });
    };

    // remove lessons
    const removeLesson = (index) => {
        const updated = course.lessons.filter((_, i) => i !== index);
        setCourse({ ...course, lessons: updated });
    };

    // send data in backend

    async function submitForm(event) {
        event.preventDefault();
        try {
            const res = await api.post("/courses/new", {
                ...course
            });
            //handle success
            setCourse({
                title: "",
                description: "",
                thumbnail: "",
                price: "",
                lessons: [{ title: "", videoUrl: "" }]
            })
            console.log(course);
        } catch (err) {
            //handle error
        }
    }

    return (

        <form onSubmit={submitForm} className="form">

            <h2>Add New Course</h2>
            <input
                name="title"
                value={course.title}
                placeholder="Course Title"
                onChange={handleChange}
            />

            <textarea
                name="description"
                value={course.description}
                placeholder="Description"
                onChange={handleChange}
            />

            <input
                name="thumbnail"
                value={course.thumbnail}
                placeholder="Thumbnail URL"
                onChange={handleChange}
            />

            <input
                name="price"
                value={course.price}
                type="number"
                placeholder="Price"
                onChange={handleChange}
            />

            <h3>Lessons</h3>

            {course.lessons.map((lesson, index) => (
                <div key={index} className="lesson-box">
                    <input
                        placeholder="Lesson Title"
                        value={lesson.title}
                        onChange={(e) =>
                            handleLessonChange(index, "title", e.target.value)
                        }
                    />

                    <input
                        placeholder="Video URL"
                        value={lesson.videoUrl}
                        onChange={(e) =>
                            handleLessonChange(index, "videoUrl", e.target.value)
                        }
                    />

                    {course.lessons.length > 1 && (
                        <FaTrash
                            className="delete-btn"
                            onClick={() => removeLesson(index)}
                        />
                    )}

                </div>

            ))}

            <button className="newCourse-btn" onClick={addLesson}>+ Add Lesson</button>

            <button className="newCourse-btn">
                Submit
            </button>
        </form>
    );
}

export default NewCourse;