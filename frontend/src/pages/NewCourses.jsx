import { useState } from "react";
import "./css/NewCourse.css";
import api from "../api/axios";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";
import { LoadingContext } from "../context/LoadingContext";


function NewCourse() {

    const { showFlash } = useContext(FlashContext);
    const { setLoading } = useContext(LoadingContext);

    const [course, setCourse] = useState({
        title: "",
        description: "",
        price: ""
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [fileKey, setFileKey] = useState(0); //For re-render & clear/reset thumbnail


    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    };

    async function submitForm(event) {
        event.preventDefault();

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", course.title);
            formData.append("description", course.description);
            formData.append("price", course.price);
            formData.append("thumbnail", thumbnail);

            const res = await api.post("/courses/new", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            showFlash(res.data.message, "success");
            setFileKey(prev => prev + 1);
            setThumbnail(null);

            setCourse({
                title: "",
                description: "",
                price: ""
            })

        } catch (err) {
            showFlash(err.response?.data?.message || "error", "error");
        } finally {
            setLoading(false);
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
                            key={fileKey}
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                        />
                        <label htmlFor="price">Add Price</label>
                        <input
                            id="price"
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
    )
}

export default NewCourse;