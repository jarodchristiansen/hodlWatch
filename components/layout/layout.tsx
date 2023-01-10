import { Fragment, useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";

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
  background: ${(props) => props.isPurplePath && "#f5f5f54c"};
  background: linear-gradient(
    180deg,
    rgba(235, 233, 255, 1) 0%,
    rgba(241, 240, 255, 1) 5%,
    rgba(255, 255, 255, 1) 29%
  );
`;

export default Layout;
