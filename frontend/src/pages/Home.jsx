import "./css/Home.css";
import CTABanner from "./CTABanner";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import TrustBar from "./TrustBar";
import WhyCourseHub from "./WhyCourseHub";

function Home() {
    return (
        <>
        <div className="home-container">
           <Hero/>
           <TrustBar/>
           <WhyCourseHub/>
           <HowItWorks/>
           <CTABanner/>
        </div>
        </>
    )
}
export default Home;