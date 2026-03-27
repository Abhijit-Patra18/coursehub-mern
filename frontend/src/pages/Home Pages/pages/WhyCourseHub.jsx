
import "../css/WhyCourseHub.css";
import { useState, useEffect } from "react";


function WhyCourseHub() {

    const [features, setFeatures] = useState([])

    useEffect(() => {
        setFeatures([
            { title: "Project-Based Learning", des: "Build real-world projects that go directly into your portfolio. No fluff, no theory overload — just hands-on work.", id: 0 },
            { title: "DSA Focus", des: "Structured DSA curriculum made for FAANG and product company interviews. 300+ problems with guided solutions.", id: 1 },
            { title: "Expert Mentors", des: "Learn from industry professionals with years of experience at top tech companies. Live doubt sessions every week.", id: 2 },
            { title: "Certificate of Completion", des: "Earn a verified certificate upon completion to showcase on LinkedIn and your resume for recruiters.", id: 3 }
        ]);
    }, [])
    return (
        <>

            <div className="whyUs-container">


                <div className="whyUs-label">Why CourseHub</div>
                <div className="whyUs-title">Everything you need <br></br>
                    to land your dream job</div>


                <div className="whyUs-features">
                    {features &&
                        features.map((feature) => (
                            <div className="features-card" key={feature.id}>
                                <h2 className="features-card-title">{feature.title}</h2>
                                <div className="features-card-des">{ feature.des }</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default WhyCourseHub;