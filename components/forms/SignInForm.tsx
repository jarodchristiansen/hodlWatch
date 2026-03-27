import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  MediaQueries,
  Shadows,
} from "@/styles/variables";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ToggleSwitch from "../commons/switchers/toggle-switch";
import ProviderContainer from "./ProviderContainer/ProviderContainer";

/**
 *
 * @param providers: Sign In Providers github etc.
 * @returns Sign In/Sign Up Forms
 */
const SignInForm = ({ providers }) => {
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const getQueryString = (value: unknown) =>
    typeof value === "string" ? value : undefined;

  const callbackUrl = getQueryString(router.query.callbackUrl);
  const errorCode = getQueryString(router.query.error);

  // Avoid redirect/jank on first render when `router.query.path` is not ready yet.
  useEffect(() => {
    if (!router.isReady) return;
    const path = getQueryString(router.query.path);
    setIsSignIn(path === "SignIn");
  }, [router.isReady, router.query.path]);

  const handleToggleChange = (nextIsSignIn: boolean) => {
    setIsSignIn(nextIsSignIn);
    if (!router.isReady) return;

    const nextPath = nextIsSignIn ? "SignIn" : "SignUp";
    const nextCallback = callbackUrl
      ? `&callbackUrl=${encodeURIComponent(callbackUrl)}`
      : "";
    router.push(`/auth?path=${nextPath}${nextCallback}`);
  };

  const renderError = () => {
    if (!errorCode) return null;

    // NextAuth error codes vary by provider; keep messaging generic and trust-building.
    let message =
      "We couldn't sign you in. Please try again or use a different provider.";
    if (errorCode === "AccessDenied") {
      message = "Access denied. Please try a different sign-in method.";
    } else if (errorCode === "OAuthSignin") {
      message = "OAuth sign-in failed. Please try again.";
    }

    return (
      <div role="alert" aria-live="polite" className="error-banner">
        {message}
      </div>
    );
  };

  return (
    <FormStyling>
      <ToggleSwitch
        label={"Sign In"}
        label2={"Sign Up"}
        toggleState={isSignIn}
        setToggleState={handleToggleChange}
      />

      <h1 className="form-header">{isSignIn ? "Sign In" : "Sign Up"}</h1>

      <p className="subcopy">
        {isSignIn
          ? "Choose a provider to sign in and pick up where you left off."
          : "Create your account in seconds. Pick a provider to continue."}
      </p>

      {/* <SubmitWrapper>
        <button type="submit" className="standardized-button">
          Submit
        </button>
      </SubmitWrapper> */}

      {renderError()}

      <CheckMarkContainer>
        <input
          type="checkbox"
          className="form-check-input"
          id="terms-checkbox"
          checked={isTermsAccepted}
          onChange={(e) => setIsTermsAccepted(e.target.checked)}
        />

        <label className="form-check-label" htmlFor="terms-checkbox">
          <span>You agree to our&nbsp;</span>
          <Link href="/terms-of-service" className="term-text">
            Terms of Service
          </Link>
        </label>
      </CheckMarkContainer>

      <ProviderWrapper>
        <h6>Sign in with:</h6>

        <span className="provider-note">
          Note: Signing in with providers for the first time also creates an
          account.
        </span>

        <ProviderContainer
          providers={providers}
          isSubmitDisabled={!isTermsAccepted}
          callbackUrl={callbackUrl}
        />
      </ProviderWrapper>
      {/* <ToastContainer position={"bottom"} /> */}

      {/*<ToastHolder />*/}
    </FormStyling>
  );
};

const CheckMarkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  text-align: center;
  justify-content: center;
  padding-top: 1rem;
  align-items: center;

  .term-text {
    color: ${Colors.primary};
    text-decoration: underline;
  }

  .form-check-input {
    cursor: pointer;
    border: 2px solid ${Colors.charcoal};
    border-radius: ${BorderRadius.small};
    padding: 0.5rem;
    accent-color: ${Colors.primary};
  }
`;

const ProviderWrapper = styled.div`
  padding-top: 2rem;

  h6 {
    font-family: ${FontFamily.headline};
    font-size: ${FontSize.medium};
    color: ${Colors.charcoal};
    margin-bottom: 0.5rem;
  }

  .provider-note {
    font-size: ${FontSize.small};
    color: ${Colors.midGray};
    display: block;
    margin-bottom: 1rem;
  }
`;

const FormStyling = styled.form`
  width: 100%;
  text-align: center;
  padding: 2rem;
  border-radius: ${BorderRadius.large};
  box-shadow: ${Shadows.elevated};
  border: 1px solid ${Colors.charcoal};
  background-color: ${Colors.white};
  font-family: ${FontFamily.primary};

  .subcopy {
    margin: 0 auto 1.25rem auto;
    max-width: 30rem;
    color: ${Colors.midGray};
    font-size: ${FontSize.small};
  }

  .error-banner {
    margin: 0 auto 1rem auto;
    max-width: 30rem;
    padding: 0.75rem 1rem;
    border-radius: ${BorderRadius.medium};
    border: 1px solid ${Colors.accentMuted};
    color: ${Colors.charcoal};
    background: rgba(212, 168, 75, 0.15);
    font-size: ${FontSize.small};
  }

  .form-header {
    padding: 2rem 0;
    font-family: ${FontFamily.headline};
    color: ${Colors.primary};
    font-size: ${FontSize.xlarge};
  }

  .form-label {
    display: block;
    text-align: left;
    margin-bottom: 0.25rem;
    color: ${Colors.charcoal};
    font-size: ${FontSize.small};
  }

  .input-container {
    max-width: 28rem;
    margin: 0.5rem auto;
  }

  @media ${MediaQueries.MD} {
    min-width: 35rem;
    border-radius: 0;
    box-shadow: none;
  }
`;

export default SignInForm;
