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
      <Row>This is row 2</Row>
      <Row>This is row 3</Row>
      {/* 
      </div>

      <InterstitialRow>
        <div className="header-column">
          <h2>Data Directly From The Blockchain</h2>

          <h5>We believe in letting the data speak for itself</h5>
          <h6>
            <i>(but just in case, we add some descriptions)</i>
          </h6>
        </div>

        <div className="image-row">
          <div className="image-column">
            <Image
              src={"/assets/charts.png"}
              height={300}
              width={400}
              alt="block-logo"
              className="row-image"
              unoptimized={true}
            />

            <Link href="/assets">
              <span className="pointer-link">
                <h5>Financial Indicators</h5>
                <span>
                  <i>
                    Analyzing price points, common resistance/support levels,
                    and traditional methods
                  </i>
                </span>
              </span>
            </Link>
          </div>

          <div className="image-column">
            <div>
              <Image
                src={"/assets/PieChart.PNG"}
                height={300}
                width={400}
                alt="block-logo"
                className="row-image"
                unoptimized={true}
              />
            </div>

            <Link href={`/user/${id}`}>
              <span className="pointer-link">
                <h5>Portfolio Analysis</h5>
                <span>
                  <i>
                    Connect your exchange account via our API and get insights
                    into your holdings
                  </i>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </InterstitialRow>

      <div className="get-involved-row top-row">
        <div className="left-card">
          <LandingCard
            headerText={"Get Involved"}
            header2Text={"Join the community"}
            bodyText="Sign up to join our community and gain more insights as you explore different assets."
            renderSignIn={true}
            renderLearnMore={false}
          />
        </div>
      </div>

      <div className="mid-row">
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

  @media ${MediaQueries.MD} {
    flex-direction: row;
  }
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
