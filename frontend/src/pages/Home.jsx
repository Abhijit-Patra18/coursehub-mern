import "../css/pages/Home.css";
import CTABanner from "./Home Pages/pages/CTABanner";
import Hero from "./Home Pages/pages/Hero";
import HowItWorks from "./Home Pages/pages/HowItWorks";
import TrustBar from "./Home Pages/pages/TrustBar";
import WhyCourseHub from "./Home Pages/pages/WhyCourseHub";

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