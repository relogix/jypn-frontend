import Footer from "../../templates/Footer";
import MemberCover from "../Members/components/MemberCover";
import About from "./components/About";
import ComingSoon from "./components/ComingSoon";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Updates from "./components/Updates";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-20 md:gap-y-10">
        <Hero />
        <Updates />
        <About />
        <MemberCover />
      </div>
      <Events />
      <ComingSoon />
      <Footer />
    </div>
  );
};

export default Home;
