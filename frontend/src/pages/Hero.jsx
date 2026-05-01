
import api from "../api/axios";
import "./css/Hero.css";
import { useState, useEffect } from "react";

function Hero() {
    const [course, setCourse] = useState();

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
                   {course && <div className="hero-badge">
                        { `${course[0].title} live now` }
                    </div> }
                    <h1>Learn today,<br></br><span className="accent">Lead</span><br></br>Tomorrow</h1>
                    <p className="hero-desc">
                        Join thousands of students mastering DSA, full-stack development, and modern tech through structured, mentor-led courses built for the Indian job market.
                    </p>
                    <div className="hero-actions">
                        <a href="/courses" className="btn-primary">Explore Courses</a>
                        <a href="#" className="btn-ghost">Watch Demo</a>
                    </div>
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


                   { course && <div className="hero-img-card">
                        <img src={ course[0].thumbnail } alt="Course Preview" />
                        <div className="hero-img-info">
                            <div className="hero-img-title">{ course[0].title }</div>
                            <div className="hero-img-footer">
                                <button className="hero-img-btn">Explore</button>
                            </div>
                        </div>
                    </div> }

                </div>
            </div>
        </>
    )
}

export default Hero;