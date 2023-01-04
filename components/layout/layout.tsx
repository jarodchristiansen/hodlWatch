import { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";

/**
 *
 * @param
 * @returns Site Layout Wrapper
 */
function Layout(props) {
  return (
    <LayoutContainer>
      <Header />
      <main>{props.children}</main>

      <Footer />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f54c;
`;

export default Layout;
