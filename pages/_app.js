import { ApolloProvider } from "@apollo/client";
import Hotjar from "@hotjar/browser";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
// import { Web3Modal } from "@web3modal/react";
import Script from "next/script";
import { useEffect } from "react";

import client from "../apollo-client";
import Layout from "../components/layout/layout";
import { pageview } from "../lib/gtag";

import "../styles/globals.css";
// Add this line
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";

/**
 *
 * @param {Component} : Page/Component that Layout/App wrap
 * @param {pageProps} : session from Next-Auth, as well as server side props
 * @returns
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const config = {
  //   projectId: `${process.env.WALLET_CONNECT_ID}`,
  //   theme: "dark",
  //   accentColor: "default",
  //   ethereum: {
  //     appName: "web3Modal",
  //   },
  // };

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    if (process.env.BASE_URL != "http://localhost:3000") {
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  useEffect(() => {
    const siteId = 3557571;
    const hotjarVersion = 6;

    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-L0KCFED511"
        nonce="90123lkjasdfmnsdljkasdpoi0"
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

      <SessionProvider session={pageProps.session} store={[]}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
            {/* <Web3Modal config={config} /> */}
          </Layout>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
