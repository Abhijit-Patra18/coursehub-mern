
import "./css/PrivacyPolicy.css";
import PageTitle from "../components/PageTitle";


function PrivacyPolicy() {
    return (
        <>
            <div className="privacy-container">

                <PageTitle title= "Privacy Policy" />

                <div className="policy-note">

                    <h3 className="policy-update">Last updated: April 2026</h3>
                    <p> Note: CourseHub is a personal portfolio project built for learning and demonstration purposes only. It is not intended for commercial use.</p>
                    <h2>1. Introduction</h2>
                    <p>CourseHub is a demo project built as part of a personal portfolio using the MERN stack. This privacy policy explains how data is handled within this project.</p>

                    <h2>2. Information We Collect</h2>
                    <p>When using this project, the following information may be collected:</p>
                    <ul>
                        <li>Name and email address (during registration)</li>
                        <li>Course purchase activity</li>
                        <li>Messages submitted via the contact form</li>
                    </ul>
                    <h2>3. How We Use Your Information</h2>
                    <p>Collected information is used only to:</p>
                    <ul>
                        <li>Authenticate users and manage sessions</li>
                        <li>Display purchased courses</li>
                        <li>Demonstrate admin functionality</li>
                    </ul>
                    <h2>4. Data Storage</h2>
                    <ul>
                        <li>User data is stored in a MongoDB database</li>
                        <li>Passwords are encrypted using bcrypt</li>
                        <li>This is a demo project — please do not use real personal information</li>
                    </ul>
                    <h2>5. Third-Party Services</h2>
                    <p>This project uses the following third-party services:</p>
                    <ul>
                        <li>Cloudinary — for image and video storage</li>
                        <li>MongoDB Atlas — for database hosting</li>
                    </ul>
                    <h2>6. Your Data</h2>
                    <p>Since this is a portfolio project:</p>
                    <ul>
                        <li>Data may be cleared at any time</li>
                        <li>Do not submit real personal or payment information</li>
                        <li>This project is not GDPR compliant</li>
                    </ul>
                    <h2>7. Contact</h2>
                    <p>If you have any questions about this project, feel free to reach out via the <a href="/contact">Contact</a> page.</p>
                    <p>This is a portfolio project and not a real commercial product.</p>
                </div>

            </div>
        </>
    )
}
export default PrivacyPolicy;