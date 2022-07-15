import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductContainer from "../components/ProductContainer";
import client from "../apollo-client";
import GET_PRODUCTS from "../helpers/queries/getProducts";
import AddProductForm from "../components/AddProductForm";
import { useQuery } from "@apollo/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import LoadingSpinner from "../components/commons/animations/LoadingSpinner";

export default function Home(props) {
  const { session } = useSession();

  useEffect(() => {
    console.log({ session });
  }, []);

  return (
    <div className="container text-center">
      {/*<AddProductForm />*/}
      {/*<ProductContainer products={props?.data?.data?.getProducts || null} />*/}
      <LoadingSpinner />
    </div>
  );
}

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
