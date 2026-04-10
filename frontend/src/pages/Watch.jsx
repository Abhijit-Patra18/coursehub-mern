import api from "../api/axios";
import "./css/Watch.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FlashContext } from "../context/FlashContext";

function Watch() {

    const { id } = useParams();

    const [lessons, setLessons] = useState(null);
    const [video, setVideo] = useState(null);
    const { showFlash } = useContext(FlashContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/lessons/${id}`);
                setLessons(res.data);
            } catch (err) {
                showFlash(err.response?.data?.message || "Error", "error");
            }
        }
        fetchData();
    }, [id]);


    function watchVideo(lesson) {
        setVideo(lesson);
    }

    return (
        <div className="player-container">

            {!lessons && <div className="no-lessons">
                <p>Lessons will be uploaded soon!</p>
            </div>}

            {lessons && <div className="lesson-sidebar">
                <h2>Lessons</h2>
                {lessons.map((lesson) => (
                    <div
                        className={`lesson-list ${video?._id === lesson._id ? "active" : ""}`}
                        key={lesson._id}
                    >
                        <p>{lesson.title}</p>
                        <button
                            className="watch-btn"
                            onClick={() => watchVideo(lesson)}
                        >
                            {video?._id === lesson._id ? "Playing" : "Watch"}
                        </button>
                    </div>
                ))}
            </div>}

            {lessons && <div className="video-section">
                {video ? (
                    <>
                        <div className="iframe-wrapper">
                            <iframe
                                key={video._id}
                                src={video.url}
                                allowFullScreen
                                title={video.title}
                            ></iframe>
                        </div>
                        <div className="video-footer">
                            <h2>{video.course?.title}</h2>
                            <p>Playing — {video.title}</p>
                        </div>
                    </>
                ) : (
                    <div className="video-placeholder">
                        <p>Click <strong>Watch</strong> on a lesson to start playing</p>
                    </div>
                )}
            </div>}

        </div>
    );
}

export default Watch;