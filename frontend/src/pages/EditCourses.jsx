

import api from "../api/axios";
import "./css/NewCourse.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FlashContext } from "../context/FlashContext";

function EditCourse() {

    const { showFlash } = useContext(FlashContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        description: "",
        price: ""
    });

    const [thumbnail, setThumbnail] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/courses/${id}`);
                setData(res.data);
            } catch (err) {
                showFlash(err.response?.data?.message || "Error", "error");
            }
        }
        fetchData();
    }, [id]);


    function handleChange(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        setThumbnail(file);
    };


    async function submitForm(event) {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price);
            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            const res = await api.put(`/courses/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            showFlash(res.data.message, "success");

            setTimeout(() => {
                navigate("/admin/courses");
            }, 500)

        } catch (err) {
            showFlash(err.response.data.message, "error");
        }
    }


    return (
        <>
            <form className="newCourse-form" onSubmit={submitForm}>

                <div className="newCourse-box">
                    <h2>Edit Course</h2>

                    <div className="newCourse-inputBox">

                        <label htmlFor="title">Add a Title</label>
                        <input
                            id="title"
                            name="title"
                            value={data.title}
                            placeholder="Course Title"
                            onChange={handleChange}
                        />

                        <label htmlFor="des">Add Description</label>
                        <textarea
                            id="des"
                            name="description"
                            value={data.description}
                            placeholder="Description"
                            onChange={handleChange}
                        />

                        <label htmlFor="thumbnail">Add Thumbnail Image</label>
                        <input
                            id="thumbnail"
                            accept="image/*"
                            type="file"
                            onChange={handleFile}
                        />

                        <label htmlFor="price">Add Price</label>
                        <input
                            name="price"
                            value={data.price}
                            type="number"
                            placeholder="Price"
                            onChange={handleChange}
                        />

                        <button className="newCourse-btn">
                            Update Course
                        </button>
                    </div>
                </div>

            </form>
        </>
    )
}

export default EditCourse;