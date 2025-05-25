import {
  Colors,
  FontFamily,
  FontWeight,
  MediaQueries,
} from "@/styles/variables";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import ChartsIcon from "../../../public/assets/chartsIcon.svg";

const AnimatedWavesBackground = styled(motion.svg)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const HeroBannerContainer = styled.section`
  width: 100%;
  background: ${Colors.charcoal};
  color: ${Colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 2px 12px 0 rgba(26, 62, 114, 0.18);
  padding: 0 0 56px 0;
  min-height: 540px;
  position: relative;
  overflow: hidden;

  @media ${MediaQueries.MD} {
    padding: 72px 0 108px 0;
  }

  .main-contain {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 48px;
    width: 100%;
    max-width: 1200px;
    padding: 80px 32px 0 32px;
    position: relative;
    z-index: 1;

    @media ${MediaQueries.MD} {
      flex-direction: row;
      justify-content: space-between;
      gap: 100px;
      padding: 100px 64px 0 64px;
    }

    .left-side {
      display: flex;
      flex-direction: column;
      gap: 40px;
      align-items: flex-start;
      max-width: 520px;

      h1 {
        font-family: ${FontFamily.headline};
        font-size: 3.4rem;
        font-weight: ${FontWeight.bold};
        color: ${Colors.accent};
        margin-bottom: 0.1em;
        letter-spacing: 1.5px;
      }

      h2 {
        font-family: ${FontFamily.primary};
        font-size: 1.7rem;
        font-weight: ${FontWeight.regular};
        color: ${Colors.white};
        margin-bottom: 0.7em;
        opacity: 0.92;
      }

      .hero-desc {
        font-size: 1.22rem;
        color: ${Colors.white};
        opacity: 0.88;
        margin-bottom: 2.2em;
        line-height: 1.7;
        max-width: 95%;
      }
    }

    .right-side {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        max-width: 420px;
        object-fit: contain;
        filter: drop-shadow(0 2px 8px ${Colors.cardShadow});
        border-radius: 18px;
        opacity: 1;
      }
    }
  }
`;

const HeroCTA = styled.button`
  background: ${Colors.accent};
  color: ${Colors.black};
  font-family: ${FontFamily.primary};
  font-size: 1.18rem;
  font-weight: ${FontWeight.bold};
  border: none;
  border-radius: 10px;
  padding: 20px 48px;
  margin-top: 8px;
  box-shadow: 0 1px 6px 0 ${Colors.cardShadow};
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.15s;
  letter-spacing: 0.5px;

  &:hover {
    background: ${Colors.primary};
    color: ${Colors.white};
    transform: translateY(-2px) scale(1.045);
  }
`;

const HeroBanner = ({}) => {
  const router = useRouter();

  const wave1 = {
    animate: {
      d: [
        // Original
        "M0 250 Q300 80 600 250 T1200 250",
        // Control point and end shift right
        "M20 248 Q320 78 620 248 T1220 248",
        // Control point and end shift left
        "M-20 252 Q280 82 580 252 T1180 252",
        // Back to original
        "M0 250 Q300 80 600 250 T1200 250",
      ],
      transition: {
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  const wave2 = {
    animate: {
      d: [
        // Original (lower baseline, more spacing)
        "M0 430 Q400 230 800 430 T1200 430",
        // Control point and end shift left
        "M-18 432 Q382 232 782 432 T1182 432",
        // Control point and end shift right
        "M18 428 Q418 228 818 428 T1218 428",
        // Back to original
        "M0 430 Q400 230 800 430 T1200 430",
      ],
      transition: {
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const routeToAuth = (string) => {
    router.push(`/auth?path=${string}`);
  };

  return (
    <HeroBannerContainer>
      <AnimatedWavesBackground
        viewBox="0 0 1200 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width="1200"
          height="540"
          fill="#1A3E72"
          fillOpacity="0.02"
        />
        <motion.path
          stroke="#FEE715"
          strokeWidth="2"
          fill="none"
          opacity="0.09"
          variants={wave1}
          animate="animate"
          d="M0 270 Q300 100 600 270 T1200 270"
        />
        <motion.path
          stroke="#1A3E72"
          strokeWidth="2"
          fill="none"
          opacity="0.08"
          variants={wave2}
          animate="animate"
          d="M0 400 Q400 200 800 400 T1200 400"
        />
      </AnimatedWavesBackground>
      <div className="main-contain">
        <div className="left-side">
          <h1>Mesh</h1>
          <h2>Your All-in-One Web3 Companion</h2>
          <p className="hero-desc">
            Track portfolios, engage with the crypto community, and stay ahead
            with real-time metrics for 10,000+ assets. Join the revolution
            today!
          </p>
          <HeroCTA onClick={() => routeToAuth("signUp")}>Get Started</HeroCTA>
        </div>

        <div className="right-side">
          <Image src={ChartsIcon} alt="charts icon" height={420} width={560} />
        </div>
      </div>
    </HeroBannerContainer>
  );
};

export default HeroBanner;
