import { Colors, FontFamily, FontSize } from "@/styles/variables";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  isPurplePath: boolean;
}

/**
 *
 * @param
 * @returns Site Layout Wrapper
 */
function Layout(props) {
  const [isPurplePath, setIsPurplePath] = useState(false);
  const router = useRouter();
  const { asPath } = router;

  // Move determineLayoutBackground inside useEffect to avoid dependency warning
  useEffect(() => {
    if (asPath.includes("/auth") || asPath.includes("/assets/")) {
      setIsPurplePath(true);
    } else {
      setIsPurplePath(false);
    }
  }, [asPath]);

  const isHomePath = asPath === "/";

  // Remove header/footer on landing page for distraction-free focus
  return (
    <LayoutContainer isPurplePath={isPurplePath}>
      {<Header />}
      <PageWrapper isHomePath={isHomePath}>{props.children}</PageWrapper>
      {<Footer />}
    </LayoutContainer>
  );
}

const PageWrapper = styled.main<{ isHomePath: boolean }>`
  padding: ${(props) => (!props.isHomePath ? "48px 0" : "0")};
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  line-height: 1.5;
  background: ${Colors.charcoal};
  min-height: 100vh;
`;

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.primary};
  position: relative;
  min-height: 100vh;
  font-family: ${FontFamily.primary};
`;

export default Layout;
