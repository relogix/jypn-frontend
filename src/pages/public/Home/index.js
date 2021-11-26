import Controller from "./controllers/Controller";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Upcoming from "./components/Upcoming";
import Updates from "./components/Updates";
import { setPageTitle } from "../../../utils/html.util";

const Home = () => {
  setPageTitle("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full pt-16 flex flex-col gap-y-20"
    >
      <Controller>
        <Hero />
        {/* <Upcoming /> */}
        <Updates />
      </Controller>
    </motion.div>
  );
};

export default Home;
