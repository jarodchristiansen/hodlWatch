import { MediaQueries } from "@/styles/MediaQueries";
import { getProviders, getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignInForm from "../components/forms/SignInForm";

/**
 *
 * @returns Auth Page connecting to next-auth with oAuth google/github providers
 */
const AuthPage = () => {
  const [providers, setProviders] = useState([]);

  async function loadProviders() {
    let provs = await getProviders();
    let session = await getSession();
    // delete providers.credentials;

    setProviders(provs);
  }

  useEffect(() => {
    loadProviders();
  }, []);

  const router = useRouter();
  const isSignIn = router.query.path === "SignIn";

  return (
    <PageWrapper>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>{isSignIn ? "Sign In" : "Sign Up"}</title>
      </Head>

      <div className="content-container">
        <div className="form-container">
          {providers && <SignInForm providers={providers} />}
        </div>

        <div className="image-container"></div>
      </div>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 0;

  @media ${MediaQueries.MD} {
    padding: 4rem;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;

    .image-container {
      background-size: cover;
      width: 100%;
      background-position: center;
      background-image: url("/assets/bitcoin-charts-signin.jpg");
    }

    @media ${MediaQueries.MD} {
      border: 1px solid black;
      display: flex;
      flex-direction: row;
      justify-content: stretch;
      width: 100%;
    }
  }
`;

export default AuthPage;
