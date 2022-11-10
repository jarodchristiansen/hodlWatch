import "bootstrap/dist/css/bootstrap.css"; // Add this line
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../apollo-client";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={pageProps.session} store={[]}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
