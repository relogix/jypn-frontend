import { motion } from "framer-motion";

const Biography = ({ data, direction }) => {
  return (
    <motion.div className="pr-20" initial={{ opacity: 0, y: -20 * direction }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-sm leading-loose">{data?.attributes?.biography}</p>
    </motion.div>
  );
};

export default Biography;
