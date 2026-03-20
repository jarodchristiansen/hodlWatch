import {
  Colors,
  ContentWidth,
  FontFamily,
  FontSize,
  SectionSpacing,
} from "@/styles/variables";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  /** Charcoal shell (auth, assets index + detail) vs primary tint elsewhere */
  isDarkPath: boolean;
}

/**
 * Site layout wrapper. Applies path-based background and consistent page/section rhythm.
 */
function Layout(props) {
  const [isDarkPath, setIsDarkPath] = useState(false);
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    const onAssets =
      asPath === "/assets" || asPath.startsWith("/assets/");
    if (asPath.includes("/auth") || onAssets) {
      setIsDarkPath(true);
    } else {
      setIsDarkPath(false);
    }
  }, [asPath]);

  const isHomePath = asPath === "/";

  return (
    <LayoutContainer isDarkPath={isDarkPath}>
      {isHomePath && (
        <SkipLink href="#main-content">
          Skip to main content
        </SkipLink>
      )}
      <Header />
      <PageWrapper isHomePath={isHomePath}>{props.children}</PageWrapper>
      <Footer />
    </LayoutContainer>
  );
}

const PageWrapper = styled.main<{ isHomePath: boolean }>`
  /* Top padding only: bottom padding created a dead band above the footer. */
  padding: ${(props) =>
    !props.isHomePath ? `${SectionSpacing.default} 0 0` : "0"};
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  line-height: 1.5;
  background: ${Colors.charcoal};
  /* Height follows content so the footer sits flush after the last block (no stretched empty main). */
  min-height: 0;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 16px;
  z-index: 100;
  padding: 12px 16px;
  background: ${Colors.accent};
  color: ${Colors.charcoal};
  font-weight: 700;
  text-decoration: none;
  border-radius: 8px;
  transition: top 0.2s ease;

  &:focus-visible {
    top: 16px;
  }
`;

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isDarkPath ? Colors.charcoal : Colors.primary};
  position: relative;
  min-height: 100vh;
  font-family: ${FontFamily.primary};
`;

/** Shared section wrapper for consistent max-width, padding, and vertical rhythm */
const SectionContainer = styled.div`
  width: 100%;
  max-width: ${ContentWidth.default};
  margin: 0 auto;
  padding: 0 ${SectionSpacing.default};
`;

const PageSection = styled.section`
  padding: ${SectionSpacing.default} 0;
  &:last-child {
    padding-bottom: ${SectionSpacing.loose};
  }
`;

export default Layout;
export { PageSection, SectionContainer };
