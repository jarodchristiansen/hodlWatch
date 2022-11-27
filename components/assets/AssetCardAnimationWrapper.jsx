import { motion, transform } from "framer-motion";

const AssetCardAnimationWrapper = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.7 },
      }}
      whileTap={{
        scale: 1.03,
        zIndex: 10,
        transition: { duration: 0.7 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AssetCardAnimationWrapper;
