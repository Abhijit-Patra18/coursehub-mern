
import "../css/HowItWorks.css";
import { useState, useEffect } from "react";


function HowItWorks() {

    const [steps, setSteps] = useState([])

    useEffect(() => {
        setSteps([
            { title: "Pick Your Course", des: "Browse our catalog and choose the course that matches your goals and current skill level.", id: 1 },
            { title: "Enroll & Pay", des: "Simple one-time payment. Lifetime access with all future updates included at no extra cost.", id: 2 },
            { title: "Learn & Build", des: "Follow the structured curriculum, complete projects, and attend live doubt sessions with mentors.", id: 3 },
            { title: "Get Placed", des: "Use your certificate, portfolio, and our placement support to land your first or next tech role.", id: 4 }
        ]);
    }, [])

    return (
        <>
            <div className="howItWorks-container">


                <div className="howItWorks-label">How It Works</div>
                <div className="howItWorks-title">Four steps to your <br></br>
                    new career</div>


                <div className="howItWorks-steps">
                    {steps &&
                        steps.map((step) => (
                            <div className="howItWorks-card" key={step.id}>
                                <h2 className="howItWorks-card-count">{step.id}</h2>
                                <h2 className="howItWorks-card-title">{step.title}</h2>
                                <div className="howItWorks-card-des">{step.des}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default HowItWorks;