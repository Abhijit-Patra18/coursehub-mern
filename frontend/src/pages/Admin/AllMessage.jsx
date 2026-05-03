import "./css/AllMessage.css";
import { useState, useEffect, useContext } from "react";
import { FlashContext } from "../../context/FlashContext";
import { LoadingContext } from "../../context/LoadingContext";
import PageTitle from "../../components/PageTitle";
import api from "../../api/axios";

function AllMessage() {

    const [messages, setAllMessages] = useState([]);
    const { showFlash } = useContext(FlashContext);
    const { setLoading } = useContext(LoadingContext);
    const [fetchData, setFetchData] = useState(true);

    const fetchMsg = async () => {
        setLoading(true);
        try {
            const res = await api.get("/admin/message");
            setAllMessages(res.data);
        } catch (err) {
            showFlash(err.response?.data?.message || "Error", "error");
        } finally {
            setLoading(false);
            setFetchData(false);
        }
    }

    useEffect(() => {
        fetchMsg();
    }, []);

    async function markAsRead(id) {
        try {
            const res = await api.put(`/message/update/${id}`);
            showFlash(res.data.message, "success");
            fetchMsg();
        } catch (err) {
            showFlash(err.response?.data?.message || "Error", "error");
        }
    }

    return (
        <>
            <div className="messages-container">

                <div className="messages-title">
                    <PageTitle title= "All Messages" />
                </div>

                <div className="messages-box">
                    {!fetchData && messages.length === 0 && <p className="no-messages">No messages yet</p>}

                    {messages.length > 0 && messages.map((msg) => (
                        <div className="message-card" key={msg._id}>

                            <div className="message-header">
                                <h3>{msg.name}</h3>
                                <p>{msg.email}</p>
                            </div>

                            <div className="message-body">
                                <p>{msg.message}</p>
                            </div>

                            <div className="message-footer">

                                <a href={`mailto:${msg.email}?subject=Re: Thank you for conecting us&body=Hi ${msg.name},`}
                                    className="reply-btn">
                                    Reply
                                </a>

                                <button
                                    className={`status-btn ${msg.status}`}
                                    onClick={() => markAsRead(msg._id)}
                                >
                                    {msg.status === "unread" ? "Mark as Read" : "Read"}
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
export default AllMessage;