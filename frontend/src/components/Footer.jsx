
import "./css/Footer.css";

function Footer() {
    return (
        <>
            <footer className="footer-container">

                <div className="footer-logo">
                    <a href="/" className="logo-text">
                        <span className="footer-red">COURSE</span><span className="footer-white">HUB</span>
                    </a>
                    <p>Structured, affordable, and career- <br></br> focused tech education built for Indian <br></br> students.</p>
                </div>

                <div className="footer-col">
                    <h3>Courses</h3>
                    <a href="#">DSA & Algorithms</a>
                    <a href="#">Full Stack Dev</a>
                    <a href="/courses">All Courses</a>
                </div>


                <div className="footer-col">
                    <h3>Company</h3>
                    <a href="/about">About Us</a>
                    <a href="/instructors">Instructors</a>
                </div>


                <div className="footer-col">
                    <h3>Support</h3>
                    <a href="/contact">Contact Us</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Use</a>
                </div>


                <div className="footer-copyRight">
                    <p>© 2026 COURSEHUB. All rights reserved.</p>
                </div>
                
            </footer>
        </>
    )
}

export default Footer;