import { FormatUnixTime } from "@/helpers/formatters/time";
import { GET_NEWS_FEED } from "@/helpers/queries/news-feed";
import { Colors, FontFamily, MediaQueries } from "@/styles/variables";
import client from "apollo-client";
import FeatureGrid from "components/commons/feature-grid/FeatureGrid";
import LandingCard from "components/commons/info-cards/landing-card";
import CTACard from "components/ctas/CTACard";
import ProgressMeter from "components/progressmeter/ProgressMeter";
import ReviewList from "components/reviews/ReviewList";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";

/**
 *
 * @param data: Response from GetNewsFeed query, renders the news feed at bottom of landing page
 * @returns Landing page with Info/Sign Up Pages
 */
export default function Home({ data }) {
  const { data: session, status } = useSession();

  const newsFeedContent = useMemo(() => {
    if (!data?.getNewsFeed?.length) return [];

    return data.getNewsFeed.slice(0, 5).map((story) => {
      return (
        <NewsItem key={story?.guid}>
          <Link href={story?.guid} passHref legacyBehavior>
            <a target="_blank">
              <h4 className="partner-header">
                {story.title.slice(0, 40) + "..."}
              </h4>
            </a>
          </Link>

          <div className="source-container">
            <div className="image-container">
              <Image
                src={story.source_info?.img}
                height={70}
                width={70}
                alt="block-logo"
                className="source-image"
                unoptimized={true}
              />
            </div>

            <span className="source-name">{story?.source_info?.name}</span>
          </div>

          <Image
            src={story.imageurl}
            height={190}
            width={190}
            alt="block-logo"
            className="article-image"
            unoptimized={true}
          />

          <span>Published: {FormatUnixTime(story?.published_on)}</span>
        </NewsItem>
      );
    });
  }, [data]);

  let id = session?.user?.id;

  return (
    <AlternateHomePageWrapper>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>
          Mesh - Blockchain, Crypto, Web3 Data Explorer and Community
        </title>
        <meta
          name="google-site-verification"
          content="sYZ6VaJuOfDFRSGlLK4-ISx-yHIfZVRdiEK6RXh3eUM"
        />
        <meta
          name="ahrefs-site-verification"
          content="36afae7f6a8e6e641fd27c84b465e990d8323de93402b68c2c27779626abd7b1"
        ></meta>
        <meta property="og:url" content="https://hodl-watch.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb id" />

        <meta
          property="og:title"
          content={
            "Mesh - Blockchain, Crypto, Web3 Data Explorer and Community"
          }
        />

        <meta
          name="description"
          content="Crypto and blockchain data explorer, allowing users to build communities centered around their favorite assets with financial, social, and on-chain metrics"
        />
        <meta
          name="twitter:card"
          content="Web3 centered application highlighting one beauty of blockchain; data."
        />

        <meta name="twitter:site" content="https://hodl-watch.vercel.app/" />
        <meta
          property="og:description"
          content="Crypto and blockchain data explorer, allowing users to build communities centered around their favorite assets while gaining insight into financial, social, and on-chain metrics"
        />
        <meta property="og:image" content={"/assets/assets-page.png"} />
      </Head>

      <div className="top-row">
        <div className="left-card">
          <div className={"landing-svg"}>
            <LandingCard
              headerText={"Mesh"}
              header2Text="Your All-in-One Crypto Companion."
              bodyText="Stay Informed. Connect. Thrive."
              renderSignIn={false}
              renderLearnMore={true}
            />
          </div>
        </div>

        <Image
          src="/assets/chartScreenshot.png"
          width={400}
          height={500}
          alt="Chart Page Screenshot"
        />
      </div>

      <Row>
        <h3> Experience Crypto Like Never Before</h3>

        <div className="site-description-container">
          <div className="card">
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <div>
                Welcome to Mesh, your all-in-one crypto companion that unlocks
                the power of decentralized finance. Seamlessly track your
                portfolio, connect with a vibrant community, and thrive in the
                ever-evolving world of cryptocurrencies.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <div>
                Stay Informed: Gain a competitive edge with real-time market
                data, comprehensive financial metrics, and news updates. Mesh
                provides you with a clear view of the crypto universe,
                empowering you to make informed investment decisions.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <div>
                Connect: Join a community of crypto enthusiasts and investors.
                Engage in lively discussions, share insights, and stay connected
                with the latest trends. Collaborate, learn, and grow together in
                the exciting realm of blockchain technology.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <div>
                Thrive: Mesh is your gateway to success in the crypto
                revolution. Unleash the potential of your portfolio, analyze
                trends, and identify opportunities to maximize your returns.
                With Mesh, you&apos;ll be well-equipped to navigate the crypto
                landscape with confidence and make waves in the world of
                finance.
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <div>
                Join Mesh today and embark on a transformative journey where
                simplicity meets power, and your crypto aspirations become
                reality.
              </div>
            </div>
          </div>
        </div>
      </Row>

      <div>
        <ProgressMeter currentStep={1} />
      </div>

      <div>
        <FeatureGrid />
      </div>

      <div>
        <ReviewList />
      </div>

      <div>
        <CTACard />
      </div>

      {/*  <div className="mid-row">
        <div className="mid-row-heading">
          <h3>Recent Updates</h3>
        </div>

        <div className="mid-row-body">{newsFeedContent}</div> */}
    </AlternateHomePageWrapper>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  gap: 24px;
  padding: 24px;

  background: linear-gradient(to bottom, #ffffff, #f8f8f8);

  h3 {
    text-align: center;
  }

  .site-description-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    text-align: center;
    grid-gap: 12px;

    .card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      border: 1px solid ${Colors.darkGray};
      padding: 12px;
      font-family: ${FontFamily.secondary};
      border-radius: 8px;
      box-shadow: 0px 2px 12px ${Colors.darkGray};
    }
  }

  @media ${MediaQueries.MD} {
    padding: 48px;
  }
`;

const AlternateHomePageWrapper = styled.div`
  .top-row {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 24px;
    align-items: center;

    img {
      width: 100%;
      align-self: center;
      border-radius: 10px;

      border: 2px solid #ccc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      aspect-ratio: 16/9;
      object-fit: cover;
      box-shadow: 0px 2px 12px ${Colors.darkGray};
    }

    @media ${MediaQueries.MD} {
      flex-direction: row;
      justify-content: space-evenly;

      img {
        width: 60%;
      }
    }
  }
`;

const NewsItem = styled.div`
  border: 1.5px solid gray;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 1rem 1rem;
  justify-content: start;
  max-height: 28rem;
  min-width: 20rem;
  text-align: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 2px 4px 10px #b9b7b7;
  position: relative;
  background-color: white;

  cursor: grab;

  .partner-header {
    background-color: #e9e9e937;
    border-radius: 8px;
  }

  h4 {
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }

  .article-image {
    border-radius: 12px;
  }

  .source-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 18px;
    max-height: 8rem;
    border-bottom: 1px solid lightgray;
    width: 100%;

    .source-name {
      font-weight: bold;
    }

    .source-image {
      border-radius: 50%;
    }
  }

  span {
    font-weight: 600;
  }

  @media ${MediaQueries.MD} {
    max-height: 30rem;
    min-width: 22rem;
  }
`;

const getNewsFeed = async () => {
  const result = await client.query({
    query: GET_NEWS_FEED,
  });

  return { data: result };
};

export const getServerSideProps = async (context) => {
  let data = {};

  const response = await getNewsFeed(); // any async promise here.

  data = response.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: data, // will be passed to the page component as props
  };
};
