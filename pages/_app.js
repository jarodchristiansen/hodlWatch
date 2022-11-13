import "bootstrap/dist/css/bootstrap.css"; // Add this line
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../apollo-client";
import Layout from "../components/layout/layout";
import { Web3Modal } from "@web3modal/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const config = {
    projectId: `${process.env.WALLET_CONNECT_ID}`,
    theme: "dark",
    accentColor: "default",
    ethereum: {
      appName: "web3Modal",
    },
  };

  return (
    <Provider session={pageProps.session} store={[]}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
          <Web3Modal config={config} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
