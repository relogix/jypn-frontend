import Footer from "../../templates/Footer";
import MemberCover from "../Members/components/MemberCover";
import About from "./components/About";
import ComingSoon from "./components/ComingSoon";
import Hero from "./components/Hero";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-20 md:gap-y-10">
        <Hero />
        <About />
        <MemberCover />
        {/* <Member /> */}
      </div>
      <ComingSoon />
      <Footer />
    </div>
  );
};

export default Home;
