import { Colors, FontFamily, FontSize, MediaQueries, SectionSpacing } from "@/styles/variables";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import LandingPageCard from "../components/commons/info-cards/LandingPageCard";
import HeroBanner from "../components/commons/landing/HeroBanner";
import CTACard from "../components/ctas/CTACard";
import ReviewList from "../components/reviews/ReviewList";
import SEOHead from "../components/seo/SEOHead";

const cardContent = [
  {
    image: "/landing/avatar-icon.svg",
    title: "Live data & indicators",
    text: "WebSocket-powered price feeds for 10,000+ assets, plus on-demand metrics: Fibonacci retracement levels, Sharpe ratio, Sortino ratio, and net realized profit-loss. Data sourced via CoinGecko and CryptoCompare APIs with GraphQL aggregation.",
  },
  {
    image: "/landing/connected-icon.svg",
    title: "Portfolio & community",
    text: "Track favorites and build a feed around the assets you care about. User data and favorites are persisted via MongoDB with real-time updates. Integrates with NextAuth for secure sign-in and session management.",
  },
  {
    image: "/landing/growth-chart-icon.svg",
    title: "Charts & macro context",
    text: "TradingView-style charts and macro indicators (e.g. BTC-focused metrics) delivered through a single Apollo-backed API. Filter, compare, and export—all from one dashboard.",
  },
];

export default function Home({ data }) {
  const { data: session } = useSession();

  return (
    <HomePageWrapper id="main-content">
      <SEOHead
        isHomePage={true}
        metaTitle="Mesh - Blockchain, Crypto, Web3 Data Explorer and Community"
        metaDescription="Crypto and blockchain data explorer, allowing users to build communities centered around their favorite assets with financial, social, and on-chain metrics"
        previewImage="/assets/assets-page.png"
      />

      <TopRow>
        <HeroBanner />
      </TopRow>

      <Row id="features">
        <FeatureSectionTitle>Why Mesh</FeatureSectionTitle>
        <SiteDescriptionContainer>
          {cardContent.map((card, index) => (
            <MotionCard
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
            >
              <LandingPageCard
                {...card}
                variant={index === 1 ? "light" : "default"}
              />
            </MotionCard>
          ))}
        </SiteDescriptionContainer>
      </Row>

      <ReviewRow>
        <ReviewList />
      </ReviewRow>
      <CTASectionWrapper>
        <StyledCTACard />
      </CTASectionWrapper>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  font-family: ${FontFamily.primary};
  min-height: 100vh;
`;

const TopRow = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Colors.white};

  min-height: 420px;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    justify-content: space-between;
    padding: 96px 0 0 0;
  }
`;

const Row = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 48px;
  padding: ${SectionSpacing.relaxed} 24px;
  background: linear-gradient(180deg, ${Colors.primary} 0%, #152a50 100%);

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.loose} 32px;
  }
`;

const FeatureSectionTitle = styled.h2`
  font-family: ${FontFamily.headline};
  font-size: ${FontSize.pageSection};
  font-weight: 700;
  color: ${Colors.white};
  margin: 0 0 8px 0;
  text-align: center;
`;

const MotionCard = styled(motion.div)``;

const SiteDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const UnderTheHoodRow = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${SectionSpacing.relaxed} 32px;
  background: ${Colors.charcoal};
  color: ${Colors.white};

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.loose} 48px;
  }
`;

const UnderTheHoodTitle = styled.h3`
  font-family: ${FontFamily.headline};
  font-size: 1.5rem;
  color: ${Colors.accent};
  margin-bottom: 1rem;
  text-align: center;
`;

const UnderTheHoodList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: ${FontFamily.primary};
  font-size: 1rem;
  line-height: 1.8;
  max-width: 720px;
  margin: 0 auto;

  li {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
  li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: ${Colors.accent};
  }
`;

const ReviewRow = styled.section`
  padding: ${SectionSpacing.xxxlarge} 24px;

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.xxxlarge} 32px;
  }
`;

const CTASectionWrapper = styled.section`
  width: 100%;
  padding: ${SectionSpacing.relaxed} 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.loose} 32px;
  }
`;

const StyledCTACard = styled(CTACard)`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(26, 62, 114, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

export const getServerSideProps = async (context) => {
  let data = {};

  try {
    // const response = await getNewsFeed(); // replace with your actual data fetching logic.
    // data = response.data;

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { data }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      notFound: true,
    };
  }
};
