import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductContainer from "../components/ProductContainer";
import client from "../apollo-client";
import GET_PRODUCTS from "../helpers/queries/getProducts";
import AddProductForm from "../components/AddProductForm";
import { useQuery } from "@apollo/client";
import { useSession, signIn, signOut } from "next-auth/client";
import { useEffect } from "react";
import LoadingSpinner from "../components/commons/animations/LoadingSpinner";
import InfoCard from "../components/commons/info-cards/info-card";
import styled from "styled-components";

export default function Home(props) {
  const { session } = useSession();

  useEffect(() => {
    console.log({ session });
  }, []);

  return (
    <HomePageWrapper className="text-center">
      {/*<AddProductForm />*/}
      {/*<ProductContainer products={props?.data?.data?.getProducts || null} />*/}
      {/* <LoadingSpinner /> */}
      <div className="grid-template">
        <InfoCard
          headerText={"Historical Insights"}
          bodyText="History doesn't always repeat, but it often rhymes. Using historical data to find insights into existing markets"
        />
        <InfoCard
          headerText={"Community Analytics"}
          bodyText="A view of the market from the community's own eyes. Insights into some of the most popular current assets"
        />

        <InfoCard
          headerText={"OnChain Data"}
          bodyText="With a resource as beautiful as a decentralized immulatable ledger, why not use it for real time insights? "
        />
        <InfoCard
          headerText={"User Profiles"}
          bodyText="Web3 isn't as `Webby` without you. Allowing you to show off what makes you an individual in the space."
        />
      </div>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .hero-image {
    width: 100%;
    background-color: green;
    margin-top: 4rem;
  }

  .grid-template {
    animation: fadeIn 2s;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
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
