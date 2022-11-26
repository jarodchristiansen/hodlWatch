import { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";

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
`;

export default Layout;
