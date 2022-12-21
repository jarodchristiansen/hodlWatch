import { motion, transform } from "framer-motion";

interface ChartAnimationWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const ChartAnimationWrapper = ({ children }: ChartAnimationWrapperProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        zIndex: 100,
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

export default ChartAnimationWrapper;
