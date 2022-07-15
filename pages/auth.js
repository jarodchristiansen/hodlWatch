import React, { useState, useEffect } from "react";
import { getProviders, getSession } from "next-auth/react";
import ProviderContainer from "../components/forms/ProviderContainer";
import SignInForm from "../components/forms/SignInForm";
import { isMobile } from "../helpers/device/ClientSide";

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
    <div
      className={`card text-center list-group-item d-flex justify-content-center align-items-center flex-wrap container mt-5 ${
        isMobile() ? "w-100" : "w-50"
      }`}
    >
      <h2 className={"py-2"}>{isSignIn ? "Sign In" : "Sign Up"}</h2>
      {isSignIn ? <SignInForm providers={providers} /> : <SignUpForm />}
    </div>
  );
};

export default AuthPage;
