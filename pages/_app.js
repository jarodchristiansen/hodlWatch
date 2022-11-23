import "bootstrap/dist/css/bootstrap.css"; // Add this line
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import client from "../apollo-client";
import Layout from "../components/layout/layout";
import { Web3Modal } from "@web3modal/react";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { pageview } from "../lib/gtag";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const config = {
    projectId: `${process.env.WALLET_CONNECT_ID}`,
    theme: "dark",
    accentColor: "default",
    ethereum: {
      appName: "web3Modal",
    },
  };

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-L0KCFED511"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L0KCFED511', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Provider session={pageProps.session} store={[]}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
            <Web3Modal config={config} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default MyApp;
