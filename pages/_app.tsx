import { ApolloProvider } from "@apollo/client";
import Hotjar from "@hotjar/browser";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import client from "../apollo-client";
import Layout from "../components/layout/layout";
import { pageview } from "../lib/gtag";

import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
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

      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}
