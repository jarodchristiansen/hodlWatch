import { BorderRadius, Colors, FontFamily, FontSize, FontWeight, MediaQueries, SectionSpacing } from "@/styles/variables";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useState } from "react";
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
    text: "Live prices for 10,000+ assets plus on-demand metrics: Fibonacci retracement levels, Sharpe ratio, Sortino ratio, and net realized P/L. Stay on top of markets without switching tabs.",
  },
  {
    image: "/landing/connected-icon.svg",
    title: "Portfolio & community",
    text: "Track favorites and build a feed around the assets you care about. Your lists and preferences are saved and synced—sign in securely and pick up where you left off.",
  },
  {
    image: "/landing/growth-chart-icon.svg",
    title: "Charts & macro context",
    text: "Professional charts and macro indicators (e.g. BTC-focused metrics) in one dashboard. Filter, compare, and export without leaving Mesh.",
  },
];

export default function Home({ data }) {
  const { data: session } = useSession();
  const [activeHowItWorksStep, setActiveHowItWorksStep] = useState(0);

  const howItWorksSteps = [
    {
      title: "Sign up",
      description: "Create your free account to connect your watchlist and preferences. No setup hassle.",
      youGet: ["Saved asset lists", "Personalized feed", "Secure sync"],
      ctaLabel: session ? "Open assets" : "Get started",
      ctaHref: session ? "/assets" : "/auth?path=SignUp",
    },
    {
      title: "Add your assets",
      description: "Search, follow, and organize the tickers you care about. Mesh keeps everything in sync across devices.",
      youGet: ["Watchlist in minutes", "Real-time updates", "Clean portfolio views"],
      ctaLabel: "Explore assets",
      ctaHref: "/assets",
    },
    {
      title: "Track & compare",
      description: "Get key indicators and performance context so you can compare what matters and act with confidence.",
      youGet: ["Live indicators", "Macro context", "Actionable insights"],
      ctaLabel: "Open dashboard",
      ctaHref: "/assets",
    },
  ];

  return (
    <HomePageWrapper id="main-content">
      <SEOHead
        isHomePage={true}
        metaTitle="Mesh: Crypto market data, portfolios & community in one place"
        metaDescription="Real-time crypto data, portfolio tracking, and a community around the assets you care about."
        previewImage="/assets/assets-page.png"
      />

      <TopRow>
        <HeroBanner />
      </TopRow>

      {/* <StatsStripSection id="stats">
        <StatsStrip>
          <StatItem>10,000+ assets</StatItem>
          <StatSeparator aria-hidden="true">·</StatSeparator>
          <StatItem>Real-time data</StatItem>
          <StatSeparator aria-hidden="true">·</StatSeparator>
          <StatItem>Free to start</StatItem>
        </StatsStrip>
      </StatsStripSection> */}

      <Row id="features">
        <FeatureSectionHeader>
          <FeatureSectionTitle>Why choose Mesh</FeatureSectionTitle>
          <AccentUnderline />
        </FeatureSectionHeader>
        <SiteDescriptionContainer>
          {cardContent.map((card, index) => (
            <MotionCard
              key={card.title}
              // Never animate opacity; only slide on first in-view.
              // Hover transforms can otherwise cause Framer to "re-evaluate"
              // and briefly snap cards toward an initial opacity state.
              style={{ opacity: 1 }}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
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

      <SectionDivider />

      <HowItWorksSection id="how-it-works">
        <HowItWorksTitle>How it works</HowItWorksTitle>
        <HowItWorksSteps aria-label="How Mesh works">
          {howItWorksSteps.map((step, index) => (
            <Fragment key={step.title}>
              <StepButton
                type="button"
                aria-label={`How it works step ${index + 1}: ${step.title}`}
                aria-current={activeHowItWorksStep === index}
                $active={activeHowItWorksStep === index}
                onClick={() => setActiveHowItWorksStep(index)}
              >
                <StepNumber $active={activeHowItWorksStep === index}>
                  {index + 1}
                </StepNumber>
                <StepLabel $active={activeHowItWorksStep === index}>
                  {step.title}
                </StepLabel>
              </StepButton>
              {index < howItWorksSteps.length - 1 && (
                <StepConnector aria-hidden="true">→</StepConnector>
              )}
            </Fragment>
          ))}
        </HowItWorksSteps>

        <HowItWorksDetailPanel role="region" aria-live="polite">
          <HowItWorksDetailTitle>{howItWorksSteps[activeHowItWorksStep].title}</HowItWorksDetailTitle>
          <HowItWorksDetailDescription>
            {howItWorksSteps[activeHowItWorksStep].description}
          </HowItWorksDetailDescription>
          <YouGetList>
            {howItWorksSteps[activeHowItWorksStep].youGet.map((item) => (
              <YouGetItem key={item}>• {item}</YouGetItem>
            ))}
          </YouGetList>
          <HowItWorksMicroCTA href={howItWorksSteps[activeHowItWorksStep].ctaHref}>
            {howItWorksSteps[activeHowItWorksStep].ctaLabel}
          </HowItWorksMicroCTA>
        </HowItWorksDetailPanel>
      </HowItWorksSection>

      <SectionDivider />

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
  gap: 48px;
  font-family: ${FontFamily.primary};
  min-height: 100vh;

  & section {
    margin-bottom: 0;
  }
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

const StatsStripSection = styled.section`
  width: 100%;
  background: ${Colors.primary};
  padding: ${SectionSpacing.compact} 24px;

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.default} 32px;
  }
`;

const StatsStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.small};
  color: ${Colors.accentLight};

  @media ${MediaQueries.MD} {
    font-size: ${FontSize.medium};
    gap: 16px 24px;
  }
`;

const StatItem = styled.span`
  font-weight: 600;
`;

const StatSeparator = styled.span`
  color: ${Colors.secondary};
  opacity: 0.8;
`;

const FeatureSectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const AccentUnderline = styled.div`
  width: 48px;
  height: 3px;
  background: ${Colors.accent};
  border-radius: ${BorderRadius.small};
`;

const Row = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 48px;
  padding: ${SectionSpacing.default} 24px;
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

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${Colors.accent} 20%,
    ${Colors.accent} 80%,
    transparent 100%
  );
  opacity: 0.25;
`;

const HowItWorksSection = styled.section`
  width: 100%;
  padding: ${SectionSpacing.default} 24px;
  background: ${Colors.charcoal};
  color: ${Colors.white};

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.loose} 32px;
  }
`;

const HowItWorksTitle = styled.h2`
  font-family: ${FontFamily.headline};
  font-size: ${FontSize.pageSection};
  font-weight: 700;
  color: ${Colors.accent};
  margin: 0 0 32px 0;
  text-align: center;
`;

const HowItWorksSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media ${MediaQueries.MD} {
    gap: 24px 40px;
  }
`;

const StepButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    transform: translateY(-1px);
  }
`;

const StepNumber = styled.span`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$active ? Colors.accent : Colors.primary)};
  color: ${(p) => (p.$active ? Colors.charcoal : Colors.accent)};
  font-family: ${FontFamily.headline};
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 50%;
  border: 2px solid ${Colors.accentLight};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;

  ${StepButton}:hover & {
    transform: scale(1.06);
    box-shadow: 0 2px 12px rgba(212, 168, 75, 0.22);
  }
`;

const StepLabel = styled.span`
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  color: ${(p) => (p.$active ? Colors.accentLight : Colors.white)};
  font-weight: 600;
  opacity: ${(p) => (p.$active ? 1 : 0.9)};
`;

const StepConnector = styled.span`
  color: ${Colors.secondary};
  font-size: 1.25rem;
  opacity: 0.8;

  @media (max-width: 600px) {
    display: none;
  }
`;

const HowItWorksDetailPanel = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 16px auto 0 auto;
  padding: 20px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${BorderRadius.large};
  border: 1px solid rgba(212, 168, 75, 0.18);
  background: rgba(26, 62, 114, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  gap: 30px;

  @media ${MediaQueries.MD} {
    margin-top: 24px;
    padding: 24px 24px;
  }
`;

const HowItWorksDetailTitle = styled.h3`
  font-family: ${FontFamily.headline};
  font-size: ${FontSize.large};
  font-weight: 700;
  color: ${Colors.accent};
  margin: 0 0 8px 0;
  text-align: center;
`;

const HowItWorksDetailDescription = styled.p`
  margin: 0 0 16px 0;
  text-align: center;
  color: ${Colors.textMutedOnDark};
  opacity: 0.95;
  line-height: 1.7;
`;

const YouGetList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 18px;
`;

const YouGetItem = styled.li`
  font-size: ${FontSize.small};
  font-weight: 600;
  color: ${Colors.accentLight};
`;

const HowItWorksMicroCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: ${BorderRadius.medium};
  background: ${Colors.accent};
  color: ${Colors.charcoal};
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  border: none;
  text-decoration: none;
  transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${Colors.primary};
    color: ${Colors.white};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const ReviewRow = styled.section`
  padding: ${SectionSpacing.loose} 24px;

  @media ${MediaQueries.MD} {
    padding: ${SectionSpacing.loose} 32px;
  }
`;

const CTASectionWrapper = styled.section`
  width: 100%;
  padding: ${SectionSpacing.default} 24px;
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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), 0 -1px 0 0 rgba(212, 168, 75, 0.15);
  border-radius: ${BorderRadius.xlarge};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(212, 168, 75, 0.25);
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
