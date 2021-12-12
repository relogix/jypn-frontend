import { motion } from "framer-motion";

const Biography = ({ data, direction }) => {
  return (
    <motion.div className="md:pr-20" initial={{ opacity: 0, y: -20 * direction }} animate={{ opacity: 1, y: 0 }}>
      <p className="md:text-sm leading-loose">{data?.attributes?.biography}</p>
    </motion.div>
  );
};

export default Biography;
