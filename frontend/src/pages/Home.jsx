import "../css/pages/Home.css";
import Hero from "./Home Pages/pages/Hero";
import TrustBar from "./Home Pages/pages/TrustBar";
import WhyCourseHub from "./Home Pages/pages/WhyCourseHub";

function Home() {
    return (
        <>
        <div className="home-container">
           <Hero/>
           <TrustBar/>
           <WhyCourseHub/>
        </div>
        </>
    )
}
export default Home;