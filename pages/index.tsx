import { useLazyQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import LandingCard from "../components/commons/info-cards/landing-card";
import PriceScreener from "../components/commons/screener/index";
import { GET_NEWS_FEED } from "../helpers/queries/news-feed";
import { MediaQueries } from "../styles/MediaQueries";

export default function Home(props) {
  const [session, loading] = useSession();

  const [
    fetchNewsFeed,
    { data, loading: newsLoading, error, called, refetch },
  ] = useLazyQuery(GET_NEWS_FEED);

  // useEffect(() => {
  //   console.log({ session });
  // }, [loading]);

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const newsFeedContent = useMemo(() => {
    if (!data?.getNewsFeed?.length) return [];

    return data.getNewsFeed.slice(0, 5).map((story) => {
      return (
        <NewsItem>
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
            <span>{story?.source_info?.name}</span>
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

  const generatePartners = useMemo(() => {
    const companies = [
      {
        name: "Dunder Mifflin",
        logo: "/assets/dunder-mifflin.jpg",
      },
      {
        name: "Initech",
        logo: "/assets/Initech.png",
      },
      // {
      //   name: "Cyberdyne Systems",
      //   logo: "/assets/cyberdyne-systems.jpg",
      // },
      {
        name: "Bluth Company",
        logo: "/assets/bluth-company.png",
      },
      // {
      //   name: "MomCorp",
      //   logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffineartamerica.com%2Ffeatured%2Fthe-office-dunder-mifflin-logo-tv-show-andrea.html&psig=AOvVaw3bSv7-Yarmp5r-SpTa3kJU&ust=1669067977949000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOiIqO_gvfsCFQAAAAAdAAAAABAG",
      // },
    ];

    return companies.map((comp) => {
      return (
        <PartnerBlock>
          <h4 className="partner-header">{comp.name}</h4>

          <Image
            src={comp.logo}
            height={"140px"}
            width={"190px"}
            alt="block-logo"
            className="partner-image"
            unoptimized={true}
          />
        </PartnerBlock>
      );
    });
  }, [session, loading]);

  return (
    <AlternateHomePageWrapper>
      <Head>
        <title>HodlWatch - Home</title>
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
          property="title"
          content={
            "Crypto & Web3 data aggregation platform utilizing blockchain. "
          }
        />

        <meta
          property="og:title"
          content={
            "Crypto & Web3 data aggregation platform utilizing blockchain. "
          }
        />

        <meta
          name="description"
          content="Crypto and blockchain data explorer, allowing users to build communities centered around their favorite assets while gaining insight into financial, social, and on-chain metrics"
        />
        <meta
          name="twitter:card"
          content="Web3 centered application highlighting one beauty of blockchain; data."
        />
        <meta
          property="og:description"
          content="Crypto and blockchain data explorer, allowing users to build communities centered around their favorite assets while gaining insight into financial, social, and on-chain metrics"
        />
        <meta property="og:image" content={"/assets/assets-page.png"} />
      </Head>
      <PriceScreener />

      <div className="top-row">
        <div className="left-card">
          <LandingCard
            headerText={"Get Involved"}
            header2Text={"Join the community"}
            bodyText="Sign up to join our community and gain more insights as you explore different assets."
            renderButtons={true}
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

      {/* <div className="bottom-row">
        <div className="bottom-row-heading">
          <h3>Our Partners</h3>
        </div>

        <div className="bottom-row-body">{generatePartners}</div>
      </div> */}
    </AlternateHomePageWrapper>
  );
}

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

  .source-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
    gap: 1rem;
    font-size: 18px;
    margin-bottom: auto;
  }

  @media ${MediaQueries.MD} {
    max-height: 32rem;
    min-width: 22rem;
  }
`;

const PartnerBlock = styled.div`
  border: 1.25px solid white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: fit-content;
  padding: 1rem 2rem;
  justify-content: start;

  color: black;
  background-color: #dfdee673;
  margin: 0.5rem 0.5rem;
  text-align: center;
  min-width: 12rem;
  outline: 0.5px solid gray;
  gap: 1rem;

  .partner-header {
    font-weight: bold;
  }

  .partner-image {
    border-radius: 12px;
  }
`;

// export async function getStaticProps() {
//   const data = await client.query({
//     query: GET_PRODUCTS,
//   });
//
//   return {
//     props: {
//       data,
//     },
//   };
// }
