import { motion, transform } from "framer-motion";

interface AssetCardAnimationWrapperProps {
  children: JSX.Element | JSX.Element[];
}

/**
 *
 * @param children: Digital Asset card that this wraps
 * @returns AssetCardAnimationWrapper wraps digital asset card to allow it to expand
 */
const AssetCardAnimationWrapper = ({
  children,
}: AssetCardAnimationWrapperProps) => {
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