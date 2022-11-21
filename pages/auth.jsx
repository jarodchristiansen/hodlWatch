import React, { useState, useEffect } from "react";
import { getProviders, getSession } from "next-auth/client";
import ProviderContainer from "../components/forms/ProviderContainer/ProviderContainer";
import SignInForm from "../components/forms/SignInForm";
import { isMobile } from "../helpers/device/ClientSide";
import styled from "styled-components";
import { MediaQueries } from "../styles/MediaQueries";
import Image from "next/image";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [providers, setProviders] = useState([]);

  async function loadProviders() {
    let provs = await getProviders();
    let session = await getSession();

    console.log({ providers, session });
    // delete providers.credentials;
    // setLoadedProviders(providers);
    setProviders(provs);
  }

  useEffect(() => {
    loadProviders();
  }, []);

  return (
    <AuthPageWrapper>
      <div className="top-row">
        <div className="left-card">
          {isSignIn ? <SignInForm providers={providers} /> : <SignUpForm />}
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
  border: 2px solid blback;
`;

export default AuthPage;