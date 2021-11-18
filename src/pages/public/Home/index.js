import Controller from "./controllers/Controller";
import Hero from "./components/Hero";
import Upcoming from "./components/Upcoming";
import Updates from "./components/Updates";

const Home = () => {
  return (
    <div className="w-full pt-16 flex flex-col gap-y-20">
      <Controller>
        <Hero />
        <Upcoming />
        <Updates />
      </Controller>
    </div>
  );
};

export default Home;
