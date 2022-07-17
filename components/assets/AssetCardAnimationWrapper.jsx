import { motion, transform } from "framer-motion";

const AssetCardAnimationWrapper = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 1 },
      }}
      whileTap={{
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 1 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AssetCardAnimationWrapper;
