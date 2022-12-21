import { GET_NEWS_FEED } from "@/helpers/queries/news-feed";
import { MediaQueries } from "@/styles/MediaQueries";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import LandingCard from "../components/commons/info-cards/landing-card";
import PriceScreener from "../components/commons/screener/index";
import client from "apollo-client";



/**
 * 
 * @param data: Response from GetNewsFeed query, renders the news feed at bottom of landing page 
 * @returns Landing page with Info/Sign Up Pages
 */
export default function Home({ data }) {
  const [session, loading] = useSession();

  const newsFeedContent = useMemo(() => {
    if (!data?.getNewsFeed?.length) return [];

    return data.getNewsFeed.slice(0, 5).map((story) => {
      return (
        <NewsItem key={story?.guid}>
          <Link href={story?.guid} passHref>
            <a target="_blank">
              <h4 className="partner-header">{story.title}</h4>
            </a>
          </Link>

          <Image
            src={story.imageurl}
            height={"190px"}
            width={"190px"}
            alt="block-logo"
            className="partner-image"
            layout="fixed"
            unoptimized={true}
          />

          <div className="source-container">
            <span className="source-name">{story?.source_info?.name}</span>
            <Image
              src={story.source_info?.img}
              height={"70px"}
              width={"70px"}
              alt="block-logo"
              className="partner-image"
              layout="fixed"
              unoptimized={true}
            />
          </div>
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
          HodlWatch - Web3 data explorer platform utilizing blockchain
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
            "Crypto & Web3 data aggregation platform utilizing blockchain. "
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

      <PriceScreener />

      <div className="top-row">
        <div className="left-card">
          <div className={"landing-svg"}>
            <Image
              src={"/assets/charts.png"}
              height={"550px"}
              width={"800px"}
              alt="block-logo"
              unoptimized={true}
            />
            {/* <Image
              src={"/assets/PieChart.PNG"}
              height={"550px"}
              width={"600px"}
              alt="block-logo"
              unoptimized={true}
            /> */}
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

          <span>
            <h4>We believe in letting the data speak for itself</h4>
            <h6>(but just in case, we add some descriptions)</h6>
          </span>
        </div>

        <div className="image-row">
          <div className="image-column">
            <Image
              src={"/assets/charts.png"}
              height={"300px"}
              width={"400px"}
              alt="block-logo"
              unoptimized={true}
            />

            <Link href="/assets">
              <span className="pointer-link">
                <h5>Financial Indicators</h5>
                Analyzing price points, common resistance/support levels, and
                traditional methods
              </span>
            </Link>
          </div>

          <div className="image-column">
            <div>
              <Image
                src={"/assets/PieChart.PNG"}
                height={"300px"}
                width={"400px"}
                alt="block-logo"
                unoptimized={true}
              />
            </div>

            <Link href={`/user/${id}`}>
              <span className="pointer-link">
                <h5>Portfolio Analysis</h5>
                Connect your exchange account via our API and get insights into
                your holdings
              </span>
            </Link>
          </div>
        </div>
      </InterstitialRow>

      <div className="top-row">
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
              height={"550px"}
              width={"600px"}
              alt="block-logo"
              unoptimized={true}
            />
          </div>
        </div>
      </div>

      <div className="mid-row">
        <div className="mid-row-heading">
          <h3>News Stories</h3>
        </div>

        <div className="mid-row-body">{newsFeedContent}</div>
      </div>
    </AlternateHomePageWrapper>
  );
}

const InterstitialRow = styled.div`
  width: 100%;
  background-color: #1a1919;
  color: white;
  padding: 2rem 2rem;
  margin-top: 4rem;
  border-top: 2px solid gray;
  text-align: center;

  .header-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    gap: 1rem;

    .pointer-link {
      cursor: pointer;
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
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    @media ${MediaQueries.MD} {
      padding: 0 4rem;
      padding-bottom: 2rem;
    }

    .left-card {
      @media ${MediaQueries.MD} {
        margin-top: 3rem;
      }
    }

    .right-card {
      @media ${MediaQueries.MD} {
        margin-top: 3rem;
      }
    }
  }

  .mid-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 1rem;
    border-top: 2px solid lightgray;

    @media ${MediaQueries.MD} {
      padding: 0.5rem 2rem;
    }

    .mid-row-heading {
      font-size: 28px;
      padding: 1rem 1rem;
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
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 1rem 2rem;
  justify-content: start;
  max-height: 22rem;
  min-width: 20rem;
  text-align: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 2px 4px 8px lightgray;

  a:hover {
    text-decoration: underline;
  }

  .source-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 18px;
    margin-top: auto;

    .source-name {
      font-weight: bold;
    }
  }

  @media ${MediaQueries.MD} {
    max-height: 28rem;
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
