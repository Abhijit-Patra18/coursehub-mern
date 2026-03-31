import { useState } from "react";
import "./css/NewCourse.css";
import api from "../api/axios";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";


function NewCourse() {

    const { showFlash } = useContext(FlashContext);

    const [course, setCourse] = useState({
        title: "",
        description: "",
        thumbnail: "",
        price: ""
    });


    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    // handle lesson change
    // const handleLessonChange = (index, field, value) => {
    //     const updated = [...course.lessons];
    //     updated[index][field] = value;
    //     setCourse({ ...course, lessons: updated });
    // };

    // add lesson
    // const addLesson = () => {
    //     setCourse({
    //         ...course,
    //         lessons: [...course.lessons, { title: "", videoUrl: "" }]
    //     });
    // };

    // // remove lessons
    // const removeLesson = (index) => {
    //     const updated = course.lessons.filter((_, i) => i !== index);
    //     setCourse({ ...course, lessons: updated });
    // };

    // send data in backend

    async function submitForm(event) {
        event.preventDefault();
        try {
            const res = await api.post("/courses/new", {
                ...course
            });
            showFlash(res.data.message, "success");
            setCourse({
                title: "",
                description: "",
                thumbnail: "",
                price: "",
                lessons: [{ title: "", videoUrl: "" }]
            })
        } catch (err) {
            showFlash(err.response.data.message, "error");
        }
    }

    return (


        <>


            <form className="newCourse-form" onSubmit={submitForm}>


                <div className="newCourse-box">
                    <h2>Add New Course</h2>
                    <p>Already have an course? <a href="/login">Add Lesson</a></p>

                    <div className="newCourse-inputBox">

                        <label htmlFor="title">Add a Title</label>
                        <input
                            id="title"
                            name="title"
                            value={course.title}
                            placeholder="Course Title"
                            onChange={handleChange}
                        />

                        <label htmlFor="des">Add Description</label>
                        <textarea
                            id="des"
                            name="description"
                            value={course.description}
                            placeholder="Description"
                            onChange={handleChange}
                        />
                        <label htmlFor="thumbnail">Add Thumbnail Image</label>
                        <input
                            name="thumbnail"
                            value={course.thumbnail}
                            placeholder="Thumbnail URL"
                            onChange={handleChange}
                        />
                        <label htmlFor="price">Add Price</label>
                        <input
                            name="price"
                            value={course.price}
                            type="number"
                            placeholder="Price"
                            onChange={handleChange}
                        />

                        <button className="newCourse-btn">
                            Add New Course
                        </button>



                    </div>

                </div>




            </form>



        </>
















        // <form onSubmit={submitForm} className="form">

        //     <h2>Add New Course</h2>
        //     <input
        //         name="title"
        //         value={course.title}
        //         placeholder="Course Title"
        //         onChange={handleChange}
        //     />

        //     <textarea
        //         name="description"
        //         value={course.description}
        //         placeholder="Description"
        //         onChange={handleChange}
        //     />

        //     <input
        //         name="thumbnail"
        //         value={course.thumbnail}
        //         placeholder="Thumbnail URL"
        //         onChange={handleChange}
        //     />

        //     <input
        //         name="price"
        //         value={course.price}
        //         type="number"
        //         placeholder="Price"
        //         onChange={handleChange}
        //     />

        /* <h3>Lessons</h3>

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

        ))} */

        /* <button className="newCourse-btn" onClick={addLesson}>+ Add Lesson</button> */

        //     <button className="newCourse-btn">
        //         Submit
        //     </button>
        // </form>
    )
}

export default NewCourse;