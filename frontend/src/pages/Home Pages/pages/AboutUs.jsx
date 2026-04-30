
import "./AboutUs.css";

function AboutUs() {
    return (
        <>

            <div className="aboutUs-container">

                <h1>About CourseHub</h1>

                <div className="aboutUs-note">

                    <h3 className="aboutUs-update">Last updated: April 2026</h3>

                    <p>  A full stack online learning platform built with the MERN stack as a portfolio project. This is a personal portfolio project for demonstration purposes only — not a commercial product.</p>
                    <h2>1. What is CourseHub?</h2>
                    <p>CourseHub is a full stack online course platform where users can browse,
                        purchase and watch video courses. Admins can manage the entire platform from a
                        dedicated dashboard — adding courses, uploading lessons and monitoring purchases.
                        This project was built to demonstrate full stack development skills using the MERN stack.</p>

                    <h2>2. Features:</h2>
                    <ul>
                        <li> User Authentication — Secure register and login with JWT and bcrypt.</li>
                        <li>Course Management — Admin can create, edit and delete courses with Cloudinary thumbnail upload.</li>
                        <li>Video Lessons — Admin can add multiple video lessons per course.</li>
                        <li>Purchase System — Users can purchase and access courses anytime.</li>
                        <li>Admin Dashboard — Manage courses, lessons and view all purchases.</li>
                        <li>Protected Routes — Role based access control for users and admins.</li>
                    </ul>
                    <h2>3. Tech Stack:</h2>
                    <ul>
                        <li>Frontend -- HTML, CSS, JavaScript, React.js v19, React Router DOM v7, Axios, Context API, React Icons</li>
                        <li>Backend  -- Node.js, Express.js v5, MongoDB, Mongoose v9, JWT (jsonwebtoken), Bcrypt, Joi, CORS, Dotenv</li>
                        <li>Tools -- Cloudinary, Multer, Multer Storage Cloudinary, Git & GitHub</li>
                    </ul>
                    
                    <h2>4. Contact</h2>
                    <p>If you have any questions about this project, feel free to reach out via the <a href="/contact">Contact</a> page.</p>
                    <p>This is a portfolio project and not a real commercial product.</p>
                </div>

            </div>

        </>
    )
}
export default AboutUs;