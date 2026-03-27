import { motion } from "framer-motion";

export interface CandleProps {
  readonly color: string;
  readonly height: number;
  readonly width: number;
}

const Candle = ({ color, height, width }: CandleProps) => {
  const candleVariants = {
    up: {
      y: -height / 2,
      transition: { duration: 1, ease: "easeInOut" },
    },
    down: {
      y: 0,
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
