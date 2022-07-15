// import Lottie from "lottie-react";
// // import animationData from "../../public/lotties/spiral-loading.json";
// import animationData from "../../../public/lotties/spiral-loading.json";
import Spinner from "react-bootstrap/Spinner";
import { motion, transform } from "framer-motion";
import { Image } from "react-bootstrap";
import vercelImage from "../../../public/vercel.svg";

const LoadingSpinner = () => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  // const imageSlides = transform(["../../../public/vercel.svg"]);

  return (
    <div
      className={
        "d-flex justify-content-center align-items-center flex-wrap mt-5"
      }
    >
      <motion.div
        style={{
          height: "50px",
          // background: "#260049",
          // backgroundImage: "../../../public/vercel.svg",
          width: "50px",
          borderRadius: "50%",
        }}
        className="box"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          backgroundImage: "../../../public/vercel.svg",
          backgroundColor: ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <motion.div
          style={{
            height: "10px",
            // background: "#260049",
            // backgroundImage: "../../../public/vercel.svg",
            width: "10px",
          }}
          // className="box"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            backgroundImage: "../../../public/vercel.svg",
            backgroundColor: ["#0015ff", "#f15332", "rgb(175,0,42)"],
          }}
          initial={{
            rotate: 90,
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
