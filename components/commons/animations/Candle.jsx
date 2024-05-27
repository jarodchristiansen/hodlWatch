import { motion } from "framer-motion";

const Candle = ({ color, height, width }) => {
  const candleVariants = {
    up: {
      y: -height / 2, // Move candle up for positive movement
      transition: { duration: 1, ease: "easeInOut" },
    },
    down: {
      y: 0, // Reset candle position for negative movement
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      style={{ backgroundColor: color, width, height }}
      variants={candleVariants}
      layout
    />
  );
};

export default Candle;
