import { motion } from "framer-motion";

const Title = ({ data, direction = 1 }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 * direction }}
      animate={{ opacity: 1, y: 0 }}
      className="text-8xl font-semibold poppins px-2 bg-gradient-primary bg-bottom"
      style={{ backgroundSize: "100% 40%", backgroundRepeat: "no-repeat" }}
    >
      {data?.attributes?.member?.data?.attributes?.name}
    </motion.h1>
  );
};

export default Title;
