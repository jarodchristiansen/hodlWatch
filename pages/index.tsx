import { useLazyQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
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
          <h4 className="partner-header">{story.title}</h4>

          <Image
            src={story.imageurl}
            height={"140px"}
            width={"190px"}
            alt="block-logo"
            className="partner-image"
          />

          <span>{story?.source_info?.name}</span>
          <Image
            src={story.source_info?.img}
            height={"90px"}
            width={"90px"}
            alt="block-logo"
            className="partner-image"
          />
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
          />
        </PartnerBlock>
      );
    });
  }, [session, loading]);

  return (
    <AlternateHomePageWrapper>
      <Head>
        <title>HodlWatch - Home</title>
        <meta property="og:url" content="https://hodl-watch.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb id" />
        <meta property="og:title" content={"HodlWatch - Home"} />
        <meta
          name="twitter:card"
          content="Web3 centered application highlighting one beauty of blockchain; data."
        />
        <meta
          property="og:description"
          content="Web3 centered application highlighting one beauty of blockchain; data."
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
            />
          </div>
        </div>
      </div>

      {/* <div className="mid-row">
        <div className="mid-row-heading">
          <h3>News Stories</h3>
        </div>

        <div className="mid-row-body">{newsFeedContent}</div>
      </div> */}

      <div className="bottom-row">
        <div className="bottom-row-heading">
          <h3>Our Partners</h3>
        </div>

        <div className="bottom-row-body">{generatePartners}</div>
      </div>
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
      width: 90%;
      padding: 0.5rem 2rem;
    }

    .mid-row-heading {
      font-size: 28px;
      padding: 1rem 1rem;
    }

    .mid-row-body {
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
  min-width: 22rem;
`;

const PartnerBlock = styled.div`
  border: 1.25px solid white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: fit-content;
  padding: 1rem 2rem;
  justify-content: start;
  /* box-shadow: 2px 4px 8px lightgray; */
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
