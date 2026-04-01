
import api from "../api/axios";
import "./css/MyBatch.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";
import { FaRegSadTear } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function MyBatch() {

    const [loading, setLoading] = useState(true);
    const [myCourses, setMyCourses] = useState([]);

    const { showFlash } = useContext(FlashContext);



    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get("/mycourses");
                setMyCourses(res.data)
            } catch (err) {
                showFlash(err.response?.data?.message || "Something went wrong", "error");
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [])

    return (
        <>
            <div className="myCourse-title">

                <h1>Welcome to your courses!</h1>

                {loading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading courses...</p>
                    </div>
                )}

                {!loading && myCourses.length === 0 &&
                    <div className="no-course">
                        <div className="sad-icon"><FaRegSadTear /></div>
                        <button className="myCourse-explore-btn" onClick={() => navigate("/courses")}>Explore Our Courses</button>
                    </div>
                }
            </div>


            <main className="myCourse-grid">

                {!loading && myCourses && myCourses.map((myCourse) => (
                    <div className="myCourse-card" key={myCourse._id}>
                        <div className="myCourse-card-img-wrap">
                            <img className="myCourse-card-img" src={myCourse.course.thumbnail} alt="course-image" />
                        </div>
                        <div className="myCourse-card-body">
                            <h2 className="myCourse-card-title">{myCourse.course.title}</h2>
                            <p>
                                Purchased on: {new Date(myCourse.purchaseDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </p>
                        </div>
                        <div className="myCourse-card-footer">
                            <button className="myCourse-btn">Watch Videos</button>
                        </div>
                    </div>
                ))}
            </main>

        </>
    )
}

export default MyBatch;