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
    if (asPath.includes("/auth")) {
      setIsPurplePath(true);
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
  background-color: ${(props) =>
    props.isPurplePath ? "#ebdafc47;" : "#f5f5f54c;"};
`;

export default Layout;
