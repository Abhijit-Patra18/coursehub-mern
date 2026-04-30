
import "./css/Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    return (
        <>
        <div className="admin-container">
            <div className="admin-title">
                <h1>Welcome to Admin Dashboard</h1>
            </div>

            <div className="admin-grid">

                <div className="admin-col" onClick={() => navigate("/admin/courses/new")}>Add Course</div>
                <div className="admin-col" onClick={() => navigate("/admin/courses")}>All Courses<p>Edit/Delete</p></div>
                <div className="admin-col" onClick={() => navigate("/admin/courses")}>Add Lesson</div>
                <div className="admin-col" onClick={() => navigate("/admin/courses")}>Manage Lesson</div>
                <div className="admin-col" onClick={() => navigate("/admin/purchase/all")}>Purchase History</div>
                <div className="admin-col" onClick={() => navigate("/admin/message/all")}>All Message</div>

            </div>
            </div>
        </>
    )
}

export default Admin;