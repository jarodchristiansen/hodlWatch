import { Colors } from "@/styles/variables";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
/**
 *
 * @param
 * @returns Site Layout Wrapper
 */
function Layout(props) {
  const [isPurplePath, setIsPurplePath] = useState(false);

  const router = useRouter();
  const { asPath } = router;

  let purpleBackgroundList = ["/auth"];

  useEffect(() => {
    determineLayoutBackground();
  }, [asPath]);

  const determineLayoutBackground = () => {
    if (asPath.includes("/auth") || asPath.includes("/assets/")) {
      setIsPurplePath(true);
    } else {
      setIsPurplePath(false);
    }
  };

  return (
    <LayoutContainer isPurplePath={isPurplePath}>
      <Head>
        {/* Paste your Hotjar tracking code here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `<!-- Hotjar Tracking Code -->
                <script>
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:3557571,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                </script>
                   <!-- End Hotjar Tracking Code -->`,
          }}
        />
      </Head>

      <Header />
      <main>{props.children}</main>

      <Footer />
    </LayoutContainer>
  );
}

interface LayoutProps {
  isPurplePath: boolean;
}

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.richBlack};
`;

export default Layout;
