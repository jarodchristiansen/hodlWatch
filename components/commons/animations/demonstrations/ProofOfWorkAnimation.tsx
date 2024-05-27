import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components for layout
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MiningBlock = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border: 2px solid #000;
  border-radius: 10px;
  margin: 20px;
`;

const MiningProcess = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: #f0f0f0;
  border: 2px solid #000;
  border-radius: 10px;
  margin: 20px;
  position: relative;
  overflow-y: scroll;
`;

const HashAttemptsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HashAttempt = styled(motion.p)`
  font-size: 24px;
`;

const Miner = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: #ff0000;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 10%;
`;

const ValidBlock = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #00ff00;
  border: 2px solid #000;
  border-radius: 10px;
  margin: 20px;
`;

const ProofOfWorkAnimation: React.FC = () => {
  const minerAnimation = useAnimation();

  const [hashAttempts, setHashAttempts] = useState<string[]>([]);

  const minerSuccessAnimation = async () => {};

  // Function to simulate miner's attempts
  const attemptMining = async (attempts = 1) => {
    // Animate miner to the right
    let maxAttempts = 12;

    if (attempts < maxAttempts) {
      await minerAnimation.start({
        left: "80%",
        transition: {
          duration: 1,
          ease: "linear",
        },
      });
      // Animate miner to the left
      await minerAnimation.start({
        left: "10%",
        transition: {
          duration: 1,
          ease: "linear",
        },
      });
      // Add a new hash attempt
      setHashAttempts([
        ...hashAttempts.slice(hashAttempts.length - 1, 1),
        generateHashAttempt(),
      ]);

      // Repeat the animation
      attemptMining(attempts + 1);
    } else {
      // Animate miner to the right
      minerSuccessAnimation();
    }
  };

  useEffect(() => {
    // Start the mining animation
    attemptMining();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to generate a random SHA-256 hash attempt
  const generateHashAttempt = (): string => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        {/* Mining Block */}
        <MiningBlock
          initial={{ opacity: 0, y: 0, x: -100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <p style={{ textAlign: "center", marginTop: 30 }}>New Block</p>
        </MiningBlock>

        {/* Mining Process */}
        <MiningProcess
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {/* Center hashAttempts list */}
          <HashAttemptsContainer>
            {/* Hash Attempts */}
            {hashAttempts.map((hash, index) => (
              <HashAttempt
                key={index}
                style={{
                  opacity: 1 - index / hashAttempts.length, // Fade out as miner moves
                }}
              >
                {hash}
              </HashAttempt>
            ))}
          </HashAttemptsContainer>

          {/* Miner */}
          <Miner animate={minerAnimation} />

          {/* Mining Process Text */}
          <motion.p
            style={{
              textAlign: "center",
              marginTop: 200,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Attempting SHA-256 Guesses
          </motion.p>
        </MiningProcess>

        {/* Valid Block */}
        <ValidBlock
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p style={{ textAlign: "center", marginTop: 30 }}>Valid Block</p>
        </ValidBlock>
      </Container>
    </motion.div>
  );
};

export default ProofOfWorkAnimation;
