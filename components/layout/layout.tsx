import { Colors } from "@/styles/variables";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
      <Header />
      <PageWrapper>{props.children}</PageWrapper>

      <Footer />
    </LayoutContainer>
  );
}

interface LayoutProps {
  isPurplePath: boolean;
}

const PageWrapper = styled.main`
  padding: 48px 0;
`;

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.richBlack};
  position: relative;
`;

export default Layout;
