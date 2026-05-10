
import api from "../api/axios";
import "./css/Hero.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {

    const [course, setCourse] = useState([]);
    const [demoVideo, setDemoVideo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const res = await api.get("/courses");
            setCourse(res.data);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="hero">
                <div className="hero-left">
                    {course[0] && <div className="hero-badge">
                        {`${course[course.length-1].title} live now`}
                    </div>}
                    <h1>Learn today,<br></br><span className="accent">Lead</span><br></br>Tomorrow</h1>
                    <p className="hero-desc">
                        Join thousands of students mastering DSA, full-stack development, and modern tech through structured, mentor-led courses built for the Indian job market.
                    </p>
                    <div className="hero-actions">
                        <a href="/courses" className="btn-primary">Explore Courses</a>
                        <a href="#" className="btn-ghost" onClick={() => setDemoVideo(true)}>Watch Demo</a>
                    </div>

                    {demoVideo && <div className="popup-demo-video">
                        <div className="demo-video-box" >

                            <h2 className="demo-title">Demo Video (AI generated)</h2>

                            <div className="video-section"> {/* video section css apply from watch.css */}

                                <div className="iframe-wrapper">
                                    <iframe
                                        src="https://res.cloudinary.com/dygapljhn/video/upload/v1778070078/demo_video_e3p55w.mp4"
                                    ></iframe>
                                </div>

                            </div>

                            <div className="demo-actions">
                                <button className="demo-btn-cancle" onClick={() => setDemoVideo(false)}>Cancle</button>
                            </div>

                        </div>
                    </div>}


                    <div className="hero-stats">
                        <div>
                            <span className="stat-num">1k+</span>
                            <span className="stat-label">Students Enrolled</span>
                        </div>
                        <div>
                            <span className="stat-num">5</span>
                            <span className="stat-label">Expert Instructors</span>
                        </div>
                        <div>
                            <span className="stat-num">95%</span>
                            <span className="stat-label">Placement Rate</span>
                        </div>
                    </div>
                </div>

                <div className="hero-right">

                    {course[0] && <div className="hero-img-card">
                        <img src={course[course.length-1].thumbnail} alt="Course Preview" />
                        <div className="hero-img-info">
                            <div className="hero-img-title">{course[course.length-1].title}</div>
                            <div className="hero-img-footer">
                                <button className="hero-img-btn" onClick={() => navigate(`/courses/${course[course.length-1]._id}`)}>Explore</button>
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </>
    )
}

export default Hero;