import {
  Colors,
  FontFamily,
  FontSize,
  FontWeight,
  MediaQueries,
} from "@/styles/variables";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  padding: 0 0 44px 0;
  min-height: 500px;
  position: relative;
  overflow: hidden;

  @media ${MediaQueries.MD} {
    padding: 56px 0 88px 0;
  }

  .main-contain {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 48px;
    width: 100%;
    max-width: 1200px;
    padding: 64px 32px 0 32px;
    position: relative;
    z-index: 1;

    @media ${MediaQueries.MD} {
      flex-direction: row;
      justify-content: space-between;
      gap: 100px;
      padding: 88px 64px 0 64px;
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
        margin-bottom: 1.7em;
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

const HeroCTARow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-top: 4px;
`;

const HeroTrustLine = styled.p`
  font-size: ${FontSize.small};
  color: ${Colors.accentLight};
  opacity: 0.9;
  margin: 12px 0 0 0;
`;

const HeroCTA = styled.button`
  background: ${Colors.accent};
  color: ${Colors.black};
  font-family: ${FontFamily.primary};
  font-size: 1.18rem;
  font-weight: ${FontWeight.bold};
  border: none;
  border-radius: 8px;
  padding: 20px 48px;
  box-shadow: 0 1px 6px 0 ${Colors.cardShadow};
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
  letter-spacing: 0.5px;

  &:hover {
    background: ${Colors.primary};
    color: ${Colors.white};
    transform: translateY(-2px) scale(1.045);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px ${Colors.charcoal}, 0 0 12px rgba(212, 168, 75, 0.4);
  }
`;

const HeroSecondaryLink = styled(Link)`
  font-family: ${FontFamily.primary};
  font-size: 1.1rem;
  font-weight: ${FontWeight.bold};
  color: ${Colors.accentLight};
  border: 2px solid ${Colors.accentLight};
  border-radius: 8px;
  padding: 18px 36px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: rgba(245, 230, 179, 0.12);
    color: ${Colors.white};
    border-color: ${Colors.white};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px ${Colors.charcoal}, 0 0 12px rgba(212, 168, 75, 0.4);
  }
`;

const HeroImageWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ScrollIndicator = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${Colors.accentLight};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 24px;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    color: ${Colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const ScrollChevron = styled(motion.span)`
  font-size: 1.5rem;
  line-height: 1;
`;

const HeroBanner = ({ }) => {
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
          fill={Colors.primary}
          fillOpacity="0.02"
        />
        <motion.path
          stroke={Colors.accent}
          strokeWidth="2"
          fill="none"
          opacity="0.12"
          variants={wave1}
          animate="animate"
          d="M0 270 Q300 100 600 270 T1200 270"
        />
        <motion.path
          stroke={Colors.primary}
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Mesh
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.21 }}
          >
            Real-time market data and portfolio tracking for 10,000+ assets
          </motion.h2>
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.27 }}
          >
            Real-time prices and key metrics—Fibonacci levels, Sharpe ratio, net
            realized P/L—in one place. Analyze and act on crypto markets with
            confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.33 }}
          >
            <HeroCTARow>
              <HeroCTA onClick={() => routeToAuth("signUp")}>Get Started</HeroCTA>
              <HeroSecondaryLink href="/assets">Explore assets</HeroSecondaryLink>
            </HeroCTARow>
            <HeroTrustLine>Free to start · No credit card required</HeroTrustLine>
          </motion.div>
        </div>

        <div className="right-side">
          <HeroImageWrapper
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src={ChartsIcon} alt="Dashboard with real-time crypto charts and metrics" height={420} width={560} />
          </HeroImageWrapper>
        </div>
      </div>
      <ScrollIndicator
        href="#features"
        aria-label="Scroll to explore features"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ScrollChevron
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </ScrollChevron>
        Scroll to explore
      </ScrollIndicator>
    </HeroBannerContainer>
  );
};

export default HeroBanner;
