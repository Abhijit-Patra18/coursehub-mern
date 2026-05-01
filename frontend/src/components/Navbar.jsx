
import "./css/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FlashContext } from "../context/FlashContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { showFlash } = useContext(FlashContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        showFlash("You are logout !", "success");
        navigate("/");
    }
       function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <>
            <nav>
                <a href="/" className="logo">
                    <span className="red">COURSE</span><span className="dark">HUB</span>
                </a>

                {/* Mobile Menu */}
                <button
                    className={`mobileMenu ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                 <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>


                    {user?.role === "admin" && (
                        <a href="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</a>
                    )}

                    {user?.role !== "admin" && <a href="/courses" onClick={closeMenu}>Courses</a>}

                    {user ? (
                        <>
                            <a href="/mycourses" onClick={closeMenu}>My Batch</a>
                            <span className="nav-username">Hello, {user.name}</span>
                            <button className="btn-logout" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <a href="/login" onClick={closeMenu}>Login</a>
                            <a href="/register" className="btn-register" onClick={closeMenu}>Register</a>
                        </>
                    )}
                </div>
            </nav >
        </>
    )
}

export default Navbar;