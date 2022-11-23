import { getProviders, getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignInForm from "../components/forms/SignInForm";
import { MediaQueries } from "../styles/MediaQueries";

const AuthPage = () => {
  const [providers, setProviders] = useState([]);

  async function loadProviders() {
    let provs = await getProviders();
    let session = await getSession();
    // delete providers.credentials;
    // setLoadedProviders(providers);
    setProviders(provs);
  }

  useEffect(() => {
    loadProviders();
  }, []);

  const router = useRouter();
  const isSignIn = router.query.path === "SignIn";

  return (
    <AuthPageWrapper>
      <Head>
        <title>{isSignIn ? "Sign In" : "Sign Up"}</title>
      </Head>

      <div className="top-row">
        <div className="left-card">
          {providers && <SignInForm providers={providers} />}
        </div>

        <div className="right-card">
          <Explainer></Explainer>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

const Explainer = styled.div`
  width: 100%;
  text-align: center;
  /* padding: 2rem; */
  border-radius: 14px;
  box-shadow: 0px 4px 8px gray;
  height: 100%;
  position: relative;
  background-image: url("/assets/sign-in.png");
  background-position-x: -2rem;
  background-position-y: -1rem;
  height: 51rem;
  max-width: 43rem;

  .sign-in-image {
    overflow: hidden;
    border-radius: 12px;
    position: absolute;
    top: 0;
  }

  .explainer-body {
    margin: auto;
    background-color: white;
    width: fit-content;
    /* padding: 2rem 2rem; */
    border-radius: 12px;
  }
`;

const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .top-row {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 2rem;

    @media ${MediaQueries.MD} {
      padding: 0 6rem;
      padding-bottom: 4rem;
    }

    .left-card {
      margin: 2rem 0;

      @media ${MediaQueries.MD} {
        margin-top: 3rem;
      }
    }

    .right-card {
      display: none;

      @media ${MediaQueries.MD} {
        display: unset;
        margin-top: 3rem;
      }
    }
  }
`;

const FormWrapper = styled.div`
  border: 2px solid black;
`;

export default AuthPage;
