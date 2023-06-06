import { FormatUnixTime } from "@/helpers/formatters/time";
import { GET_NEWS_FEED } from "@/helpers/queries/news-feed";
import { MediaQueries } from "@/styles/variables";
import client from "apollo-client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";
import LandingCard from "../components/commons/info-cards/landing-card";
import ProgressMeter from "../components/progressmeter/progressmeter";

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

        <video autoPlay muted loop>
          <source src="/videos/landing-ink.mp4" />
        </video>
      </div>
      <Row>
        Experience the Future of Crypto Like Never Before. Welcome to Mesh, your
        all-in-one crypto companion that unlocks the power of decentralized
        finance. Seamlessly track your portfolio, connect with a vibrant
        community, and thrive in the ever-evolving world of cryptocurrencies.
        Stay Informed: Gain a competitive edge with real-time market data,
        comprehensive financial metrics, and news updates. Mesh provides you
        with a clear view of the crypto universe, empowering you to make
        informed investment decisions. Connect: Join a community of crypto
        enthusiasts and investors. Engage in lively discussions, share insights,
        and stay connected with the latest trends. Collaborate, learn, and grow
        together in the exciting realm of blockchain technology. Thrive: Mesh is
        your gateway to success in the crypto revolution. Unleash the potential
        of your portfolio, analyze trends, and identify opportunities to
        maximize your returns. With Mesh, you'll be well-equipped to navigate
        the crypto landscape with confidence and make waves in the world of
        finance. Join Mesh today and embark on a transformative journey where
        simplicity meets power, and your crypto aspirations become reality."
        Feel free to adjust and tailor this segment to align with your app's
        specific features and messaging. Emphasize the unique aspects and
        benefits of your app, such as convenience, simplicity, and the social
        element it offers.
      </Row>
      <Row>
        <h3>Features</h3>
        <ul className="features-list">
          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            Portfolio Tracking:
            <ul>
              <li>
                Stay on top of your crypto investments with our intuitive
                portfolio tracking feature.
              </li>
              <li>
                Monitor real-time prices, performance, and allocation across
                multiple assets.
              </li>
              <li>
                Visualize your portfolio growth and make data-driven decisions
                with ease.
              </li>
            </ul>
          </li>
          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            Comprehensive Metrics:
            <ul>
              <li>
                Dive deep into financial and on-chain metrics to gain valuable
                insights into crypto assets.
              </li>
              <li>
                Analyze price movements, market capitalization, trading volume,
                and more.
              </li>
              <li>
                Evaluate token fundamentals and historical data to make informed
                investment choices.
              </li>
            </ul>
          </li>
          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            Social Community:
            <ul>
              <li>
                Connect with a vibrant community of crypto enthusiasts and
                investors.
              </li>
              <li>
                Engage in discussions, share knowledge, and stay updated on the
                latest trends.
              </li>
              <li>
                Foster valuable connections, collaborate on projects, and
                explore new opportunities.
              </li>
            </ul>
          </li>
          {/* Repeat the above structure for the remaining features */}

          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            News and Updates:
            <ul>
              <li>
                Access a curated feed of crypto news, articles, and market
                updates in real-time
              </li>
              <li>
                Stay informed about industry developments, regulatory changes,
                and market trends.
              </li>
              <li>
                Get a holistic view of the crypto ecosystem and make informed
                decisions based on the latest information.
              </li>
            </ul>
          </li>
          {/* Repeat the above structure for the remaining features */}

          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            User-friendly Interface:
            <ul>
              <li>
                Enjoy a sleek and intuitive interface designed for seamless user
                experience.
              </li>
              <li>
                Navigate effortlessly through the app's features and access
                information with ease.
              </li>
              <li>
                Experience the power of crypto in a user-friendly environment
                that simplifies complex concepts.
              </li>
            </ul>
          </li>
          {/* Repeat the above structure for the remaining features */}

          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            Customizable Alerts:
            <ul>
              <li>
                Set personalized alerts to stay informed about price movements
                and market conditions.
              </li>
              <li>
                Receive instant notifications about important events, such as
                price thresholds or news updates.
              </li>
              <li>
                Tailor your alerts to your specific investment strategies and
                never miss out on potential opportunities.
              </li>
            </ul>
          </li>
          {/* Repeat the above structure for the remaining features */}

          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            Security and Privacy:
            <ul>
              <li>
                Rest assured knowing that your data and assets are protected
                with robust security measures.
              </li>
              <li>
                Safeguard your privacy and maintain full control over your
                personal information.
              </li>
              <li>
                Mesh prioritizes the security and confidentiality of your crypto
                journey.
              </li>
            </ul>
          </li>
          {/* Repeat the above structure for the remaining features */}

          <li>
            <span className="feature-icon">
              {/* Add the corresponding icon here */}
            </span>
            Cross-platform Accessibility:
            <ul>
              <li>
                Access Mesh anytime, anywhere, with our cross-platform support.
              </li>
              <li>
                Seamlessly switch between desktop and mobile devices while
                enjoying a consistent experience.
              </li>
              <li>
                Stay connected to your portfolio and the community, no matter
                where you are.
              </li>
            </ul>
          </li>
          {/* Repeat the above structure for the remaining features */}
        </ul>
      </Row>

      <div>
        Roadmap
        <ProgressMeter currentStep={1} />
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
  background-color: black;
  color: white;

  h3 {
    align-self: center;
  }

  .features-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* @media ${MediaQueries.MD} {
    flex-direction: row;
  } */
`;

const AlternateHomePageWrapper = styled.div`
  .top-row {
    display: flex;
    flex-direction: column;
    padding: 18px;

    video {
      width: 100%;
      align-self: center;
      border-radius: 12px;
    }

    @media ${MediaQueries.MD} {
      flex-direction: row;
      justify-content: space-between;

      video {
        width: 50%;
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
  let data = null;

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
