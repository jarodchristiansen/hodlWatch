import React, { useState, useEffect } from "react";
import { getProviders, getSession } from "next-auth/client";
import ProviderContainer from "../components/forms/ProviderContainer/ProviderContainer";
import SignInForm from "../components/forms/SignInForm";
import { isMobile } from "../helpers/device/ClientSide";
import styled from "styled-components";

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
      {isSignIn ? <SignInForm providers={providers} /> : <SignUpForm />}
    </AuthPageWrapper>
  );
};

const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80%;
`;

const FormWrapper = styled.div`
  border: 2px solid blback;
`;

export default AuthPage;
