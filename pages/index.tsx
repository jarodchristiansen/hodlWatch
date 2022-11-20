import { useSession, signIn, signOut } from "next-auth/client";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import LandingCard from "../components/commons/info-cards/landing-card";
import { MediaQueries } from "../styles/MediaQueries";
import Head from "next/head";
import PriceScreener from "../components/commons/screener/index";

export default function Home(props) {
  const [session, loading] = useSession();

  // useEffect(() => {
  //   console.log({ session });
  // }, [loading]);

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
      </Head>
      <PriceScreener />

      <div className="top-row">
        <div className="left-card">
          <LandingCard
            headerText={"Get Involved"}
            header2Text={"Join The Community"}
            bodyText="Sign Up to join our community and gain more insights as you explore different assets."
            renderButtons={true}
          />
        </div>

        <div className="right-card">
          <div className={"landing-svg"}>
            <Image
              src={"/assets/landing-page.svg"}
              height={"300px"}
              width={"300px"}
              alt="block-logo"
            />
          </div>
        </div>
      </div>

      <div className="mid-row">
        <div className="mid-row-heading">
          <h3>Our Partners</h3>
        </div>

        <div className="mid-row-body">{generatePartners}</div>
      </div>
    </AlternateHomePageWrapper>
    // <HomePageWrapper className="text-center">
    //   <Head>
    //     <title>HodlWatch - Home</title>
    //   </Head>
    //   <PriceScreener />
    //   {/*<AddProductForm />*/}
    //   {/*<ProductContainer products={props?.data?.data?.getProducts || null} />*/}
    //   {/* <LoadingSpinner /> */}
    //   {/* <div className="hero-image">
    //     <Image
    //       src="/assets/web3-landing.jpg"
    //       layout="responsive"
    //       objectFit="cover"
    //       quality={100}
    //       width={"100%"}
    //       height={"20rem"}
    //       alt="blockchain-cube"
    //     />
    //   </div> */}

    //   {/* <LandingStatsBanner /> */}

    //   <div className="grid-template">
    //     <InfoCard
    //       headerText={"Historical Insights"}
    //       bodyText="History doesn't always repeat, but it often rhymes. Using historical data to find insights into existing markets"
    //     />
    //     <InfoCard
    //       headerText={"Community Analytics"}
    //       bodyText="A view of the market from the community's own eyes. Insights into some of the most popular current assets"
    //     />

    //     <InfoCard
    //       headerText={"OnChain Data"}
    //       bodyText="With a resource as beautiful as a decentralized immutable ledger, why not use it for real time insights? "
    //     />
    //     <InfoCard
    //       headerText={"User Profiles"}
    //       bodyText="Web3 isn't as `Webby` without you. Allowing you to show off what makes you an individual in the space."
    //     />
    //   </div>

    //   <div className="bottom-card">
    //     <InfoCard
    //       headerText={"Join The Community"}
    //       bodyText="Sign Up to join our community and gain more insights as you explore different assets, and data."
    //       renderButtons={true}
    //     />
    //   </div>

    // </HomePageWrapper>
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
    column-gap: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    @media ${MediaQueries.MD} {
      padding: 0 4rem;
      padding-bottom: 4rem;
    }

    .left-card {
      @media ${MediaQueries.MD} {
        margin-top: 3rem;
      }
    }

    .right-card {
      margin-top: 3rem;
      /* background-color: #8000804e; */

      .landing-svg {
        padding-left: 2rem;
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

  .partner-header {
    padding: 1rem 0;
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
