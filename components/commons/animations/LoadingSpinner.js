// import Lottie from "lottie-react";
// // import animationData from "../../public/lotties/spiral-loading.json";
// import animationData from "../../../public/lotties/spiral-loading.json";
import Spinner from "react-bootstrap/Spinner";
import { motion, transform } from "framer-motion";
import { Image } from "react-bootstrap";
import ThreeDotsWave from "./ThreeDotsWave";

const LoadingSpinner = () => {
  return (
    <div
      className={
        "d-flex flex-col justify-content-center align-items-center position-absolute top-50 start-50 translate-middle container"
      }
    >
      <div className={"col"}>
        <motion.img
          src={"/bitcoin_PNG48.png"}
          style={{
            height: "150px",
            // background: "#260049",
            // backgroundImage: "../../../public/vercel.svg",
            width: "150px",
            borderRadius: "50%",
          }}
          animate={{
            // scale: [1, 1.1, 1.25, 1.1, 1],
            // src: ["/bitcoin.png", "/bitcoin_PNG48.png"],
            backgroundImage: ["/bitcoin.png", "/bitcoin_PNG48.png"],
            rotate: [0, 90, 180, 90, 0],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />

        <div
          className={
            "d-flex flex-row justify-content-center align-items-center container"
          }
        >
          <h3>Loading</h3>
          <ThreeDotsWave />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
