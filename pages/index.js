import { Colors, MediaQueries } from "@/styles/variables";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import FeatureGrid from "../components/commons/feature-grid/FeatureGrid";
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

      <Row>
        <ReviewList />
      </Row>

      <IntroParagraph>
        <p>
          Welcome to Mesh, your all-in-one crypto companion. At Mesh, we believe
          in empowering retail traders with the knowledge and tools they need to
          navigate the complex world of cryptocurrencies. Whether you are an
          experienced investor or just starting out, Mesh is designed to
          simplify your crypto journey and help you make informed decisions.
          With our intuitive portfolio tracking, real-time market data, and
          vibrant community of crypto enthusiasts, you will have everything you
          need to unlock the power of decentralized finance. Join us today and
          discover how knowledge can be your key to success in the crypto
          industry.
        </p>
      </IntroParagraph>

      <Row>
        <FeatureGrid />
      </Row>

      <CTACard />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  background-color: ${Colors.black};

  @media ${MediaQueries.MD} {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.black};
  gap: 24px;
  padding: 24px;

  h3 {
    text-align: center;
  }

  @media ${MediaQueries.MD} {
    padding: 64px;
  }
`;

const SiteDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  text-align: center;
  grid-gap: 24px;
  padding: 24px 0;
`;

const IntroParagraph = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.white};
  padding: 0 24px;
  text-align: center;
  background-color: ${Colors.black};
  justify-content: center;

  p {
    @media ${MediaQueries.MD} {
      max-width: 90%;
      text-align: center;
      margin: auto;
    }
  }
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
