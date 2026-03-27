import { Colors } from "@/styles/variables";
import { motion } from "framer-motion";
import styled from "styled-components";

import ThreeDotsWave from "./ThreeDotsWave";

export interface LoadingSpinnerProps {
  readonly overlay?: boolean;
  readonly message?: string;
}

const LoadingSpinner = ({
  overlay = false,
  message = "Loading",
}: LoadingSpinnerProps) => {
  if (overlay) {
    return (
      <Overlay aria-live="polite" aria-busy="true">
        <SpinnerCard>
          <motion.img
            data-testid={"loading-element"}
            src={"/bitcoin_PNG48.png"}
            alt=""
            style={{
              height: "120px",
              width: "120px",
              borderRadius: "50%",
            }}
            animate={{
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

          <div className="loading-row">
            <LoadingText>{message}</LoadingText>
            <ThreeDotsWave />
          </div>
        </SpinnerCard>
      </Overlay>
    );
  }

  return (
    <div
      className={
        "d-flex flex-col justify-content-center align-items-center position-absolute top-50 start-50 translate-middle container"
      }
    >
      <div className={"col"}>
        <motion.img
          data-testid={"loading-element"}
          src={"/bitcoin_PNG48.png"}
          alt=""
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "50%",
          }}
          animate={{
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
          <LoadingText>{message}</LoadingText>
          <ThreeDotsWave />
        </div>
      </div>
    </div>
  );
};

const Overlay = styled.output`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin: 0;
  border: none;
  background: rgba(16, 24, 32, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const SpinnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 18px 18px;
  border-radius: 18px;
  background: rgba(24, 26, 32, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32);

  .loading-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

const LoadingText = styled.h3`
  color: ${Colors.white};
  font-size: 1.05rem;
  margin: 0;
`;

export default LoadingSpinner;
