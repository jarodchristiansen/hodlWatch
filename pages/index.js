import { Colors, FontFamily, MediaQueries } from "@/styles/variables";
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
    title: "Stay Informed",
    text: "Gain a competitive edge with real-time market data, comprehensive financial metrics, and news updates. Mesh provides you with a clear view of the crypto universe, empowering you to make informed investment decisions.",
  },
  {
    image: "/landing/connected-icon.svg",
    title: "Stay Connected",
    text: "Join a community of crypto enthusiasts and investors. Engage in lively discussions, share insights, and stay connected with the latest trends. Collaborate, learn, and grow together in the exciting realm of blockchain technology.",
  },
  {
    image: "/landing/growth-chart-icon.svg",
    title: "Thrive",
    text: "Mesh is your gateway to success in the crypto revolution. Unleash the potential of your portfolio, analyze trends, and identify opportunities to maximize your returns. With Mesh, you will be well-equipped to navigate the crypto landscape with confidence and make waves in the world of finance.",
  },
];

export default function Home({ data }) {
  const { data: session } = useSession();

  return (
    <HomePageWrapper>
      <SEOHead
        isHomePage={true}
        metaTitle="Mesh - Blockchain, Crypto, Web3 Data Explorer and Community"
        metaDescription="Crypto and blockchain data explorer, allowing users to build communities centered around their favorite assets with financial, social, and on-chain metrics"
        previewImage="/assets/assets-page.png"
      />

      <TopRow>
        <HeroBanner />
      </TopRow>

      <Row>
        <SiteDescriptionContainer>
          {cardContent.map((card) => (
            <LandingPageCard key={card.title} {...card} />
          ))}
        </SiteDescriptionContainer>
      </Row>

      <ReviewRow>
        <ReviewList />
      </ReviewRow>
      <StyledCTACard />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 64px; */
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
  padding: 64px 0;
  background: transparent;
  background: ${Colors.primary};

  @media ${MediaQueries.MD} {
    padding: 80px 0;
  }
`;

const SiteDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Enhance ReviewList and CTACard styling for cohesion
const ReviewRow = styled.section`
  padding: 64px 0;
`;

const StyledCTACard = styled(CTACard)`
  /* margin: 0 auto 48px auto;
  box-shadow: 0 4px 24px 0 ${Colors.cardShadow};
  border-radius: 24px;
  border-top: 4px solid ${Colors.primary};
  background: linear-gradient(
    90deg,
    ${Colors.primary} 60%,
    ${Colors.charcoal} 100%
  ); */
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
