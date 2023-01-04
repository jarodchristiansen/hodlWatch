import { GET_NEWS_FEED } from "@/helpers/queries/news-feed";
import { MediaQueries } from "@/styles/MediaQueries";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import LandingCard from "../components/commons/info-cards/landing-card";
// import PriceScreener from "../components/commons/screener/index";
import client from "apollo-client";
// import { FormatUnixTime } from "@/helpers/formatters/time";

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
                layout="fixed"
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
            layout="fixed"
            unoptimized={true}
          />
          {/* 
          <span>Published: {FormatUnixTime(story?.published_on)}</span> */}
        </NewsItem>
      );
    });
  }, [data]);

  // @ts-ignore type in next-auth v3 doesn't show id
  let id = session?.user?.id;

  return (
    <AlternateHomePageWrapper>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>
          HodlWatch - Blockchain, Crypto, Web3 Data Explorer and Community
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
            "HodlWatch - Blockchain, Crypto, Web3 Data Explorer and Community"
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

      {/* <PriceScreener /> */}

      <div className="top-row">
        <div className="left-card">
          <div className={"landing-svg"}>
            <Image
              src={"/assets/charts.png"}
              height={550}
              width={600}
              alt="block-logo"
              layout="responsive"
              unoptimized={true}
            />
          </div>
        </div>

        <div className="right-card">
          <LandingCard
            headerText={"What Is HodlWatch?"}
            header2Text={"Making web3 a little more balanced"}
            bodyText="At Hodlwatch, we feel that Bitcoin & web3 were built to balance the economic scales a bit by providing transparency, and a trustless guarantee via blockchain. Too long that data has been made a-symmetrical in its access behind paywalls and lack of community integration. We're working to solve that by democratizing access to blockchain data, but integrating your community to make it relevant to your every day choices."
            renderSignIn={false}
            renderLearnMore={true}
          />
        </div>
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
              layout="responsive"
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
                layout="responsive"
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

        <div className="right-card">
          <div className={"landing-svg"}>
            <Image
              src={"/assets/landing-page.png"}
              height={550}
              width={600}
              alt="block-logo"
              layout="responsive"
              unoptimized={true}
            />
          </div>
        </div>
      </div>

      <div className="mid-row">
        <div className="mid-row-heading">
          <h3>Recent Updates</h3>
        </div>

        <div className="mid-row-body">{newsFeedContent}</div>
      </div>
    </AlternateHomePageWrapper>
  );
}

const InterstitialRow = styled.div`
  width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    131deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(46, 46, 46, 1) 48%,
    rgba(0, 0, 0, 1) 100%
  );
  color: white;
  padding: 2rem 2rem;
  margin-top: 4rem;
  border-top: 2px solid gray;
  text-align: center;

  .header-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    h2 {
      font-weight: bold;
    }
    h5 {
      font-weight: 600;
    }
  }

  .image-row {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    max-width: 30rem;
    margin: auto;
    gap: 1rem;

    @media ${MediaQueries.MD} {
      max-width: 50rem;
      gap: 3rem;
    }
  }

  .image-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h5 {
      font-weight: bold;
    }

    .pointer-link {
      cursor: pointer;
      line-height: 1.8rem;
      font-weight: 400;
    }

    .pointer-link:hover {
      color: #8383f8;
      text-decoration: underline;
    }
  }
`;

const AlternateHomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .top-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    justify-content: center;
    gap: 2rem;

    @media ${MediaQueries.LG} {
      flex-direction: row;
      width: 95%;
      padding-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
    }

    .left-card {
      img {
        border-radius: 20px;
        border: 1px solid gray;
      }

      @media ${MediaQueries.LG} {
        min-width: 33rem;
        margin-top: 3rem;
      }
    }

    .right-card {
      border-top: 2px solid lightgray;

      img {
        border-radius: 20px;
        max-height: 35rem;
      }

      @media ${MediaQueries.LG} {
        border-top: unset;
        max-width: 40rem;
        margin-top: 3rem;
      }
    }
  }

  .get-involved-row {
    @media ${MediaQueries.LG} {
      width: 100%;
      padding: 0 5rem;
      padding-bottom: 2rem;
      justify-content: center;
      background-color: rgba(148, 111, 183, 0.3);
      gap: 10rem;
    }

    .left-card {
      @media ${MediaQueries.LG} {
        border-radius: 12px;
        box-shadow: 0px 4px 10px gray;
        background-color: white;
      }
    }

    .right-card {
      @media ${MediaQueries.MD} {
        padding: 4rem 6rem;
      }

      @media ${MediaQueries.LG} {
        padding: unset;
        border-radius: 12px;
        box-shadow: 0px 4px 10px gray;
        background-color: white;
      }

      img {
        max-height: 28rem;
      }
    }
  }

  .mid-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
    border-top: 2px solid lightgray;

    @media ${MediaQueries.MD} {
      padding: 0.5rem 2rem;
    }

    .mid-row-heading {
      font-size: 28px;
      padding: 1rem 1rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }

    .mid-row-body {
      display: flex;
      overflow-x: scroll;
      padding: 1rem;
      gap: 1rem;

      ::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }

      @media ${MediaQueries.MD} {
        gap: 1.5rem;
      }
    }
  }

  .bottom-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 1rem;
    border-top: 2px solid lightgray;

    @media ${MediaQueries.MD} {
      width: 90%;
      padding: 0.5rem 2rem;
    }

    .bottom-row-heading {
      font-size: 28px;
      padding: 1rem 1rem;
      padding-top: 2rem;
    }

    .bottom-row-body {
      display: flex;
      overflow-x: scroll;
      padding-right: 1rem;

      ::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
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
