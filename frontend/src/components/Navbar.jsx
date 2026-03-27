
import "../css/components/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        showFlash("You are logout !", "success");
        navigate("/");
    }
    return (
        <>
            <nav>
                <a href="/" className="logo">
                    <span className="red">COURSE</span><span className="dark">HUB</span>
                </a>
                <div className="nav-links">

                    {user?.role === "admin" && (<a href="/courses/new">Add Course</a>)}

                    <a href="/courses">Courses</a>

                    {user ? (
                        <>
                            <a href="#">My Batch</a>
                            <span className="nav-username">Hi, {user.name}</span>
                            <button className="btn-logout" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            < a href="/login">Login</a>
                            <a href="/register" className="btn-register">Register</a>
                        </>
                    )}
                </div>
            </nav >
        </>
    )
}

export default Navbar;