import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Candle from "./Candle";

const CandleAnimation = () => {
  const [isPositive, setIsPositive] = useState(true);

  const changeColor = () => {
    setIsPositive(!isPositive);
  };

  useEffect(() => {
    const intervalId = setInterval(changeColor, 2000); // Change color every 2 seconds
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount, adding isPositive causes it to repeat

  const candleColor = isPositive ? "green" : "red";

  return (
    <motion.div layout style={{ display: "flex" }}>
      <Candle
        color={candleColor}
        height={40}
        width={20}
        animate={{
          y: isPositive ? [-30, 0] : [0, 20],
          transition: { duration: 0.5 },
        }}
      />
      <Candle
        color={candleColor}
        height={30}
        width={20}
        animate={{
          y: isPositive ? [-30, 0] : [0, 30],
          transition: { duration: 0.5, delay: 0.1 },
        }}
        position={{ top: 25 }}
      />
      <Candle
        color={candleColor}
        height={15}
        width={20}
        animate={{
          y: isPositive ? [-15, 0] : [0, 15],
          transition: { duration: 0.5, delay: 0.2 },
        }}
        position={{ top: 50 }}
      />
    </motion.div>
  );
};

export default CandleAnimation;
