import { MediaQueries } from "@/styles/variables";
import { getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SignInForm from "../components/forms/SignInForm";
import SEOHead from "../components/seo/SEOHead";

/**
 *
 * @returns Auth Page connecting to next-auth with oAuth google/github providers
 */
const AuthPage = () => {
  const [providers, setProviders] = useState([]);

  async function loadProviders() {
    const provs = await getProviders();
    setProviders(provs);
  }

  useEffect(() => {
    loadProviders();
  }, []);

  const router = useRouter();
  const isSignIn = router.query.path === "SignIn";

  return (
    <PageWrapper>
      <SEOHead
        isHomePage={true}
        metaTitle={isSignIn ? "Sign In" : "Sign Up"}
        metaDescription={
          "Sign in to access everything that Mesh Web3 & Crypto has to offer"
        }
        previewImage="/assets/assets-page.png"
      />

      <div className="content-container">
        <div className="form-container">
          {providers && <SignInForm providers={providers} />}
        </div>
      </div>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* Fixed header is 64px; layout already adds ~48px top padding.
   * This extra breathing room avoids any overlap on initial paint. */
  padding: 2.5rem 0 2rem;

  @media ${MediaQueries.MD} {
    padding: 4rem 0;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    align-items: center;
  }

  .form-container {
    width: 100%;
    max-width: 44rem;
    display: flex;
    justify-content: center;
  }
`;

export default AuthPage;
