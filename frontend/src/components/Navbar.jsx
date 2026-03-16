import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    return (
        <>
            <nav className="navbar">

                <div className="logo">
                    <Link to="/">COURSE<span>HUB</span></Link>
                </div>

                <div className="nav-links">
                    <Link to="/courses">Courses</Link>
                    <Link to="/myCourses">My Batch</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar;