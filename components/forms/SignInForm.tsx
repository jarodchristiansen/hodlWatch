import { Colors, MediaQueries } from "@/styles/variables";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { ToastContainer } from "react-nextjs-toast";
import styled from "styled-components";

import ToggleSwitch from "../commons/switchers/toggle-switch";
import ProviderContainer from "./ProviderContainer/ProviderContainer";

/**
 *
 * @param providers: Sign In Providers github etc.
 * @returns Sign In/Sign Up Forms
 */
const SignInForm = ({ providers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(router.query.path === "SignIn");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSignInSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name) {
      switch (name) {
        case "email":
          setEmail(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
        case "passwordConfirm":
      }
    }
  };

  useEffect(() => {
    isSignIn
      ? router.push("/auth?path=SignIn")
      : router.push("/auth?path=SignUp");
  }, [isSignIn]);

  return (
    <FormStyling onSubmit={handleSignInSubmit}>
      <ToggleSwitch
        label={"Sign In"}
        label2={"Sign Up"}
        toggleState={isSignIn}
        setToggleState={setIsSignIn}
      />

      {isSignIn ? (
        <>
          {" "}
          <h1 className="form-header">Sign In</h1>
        </>
      ) : (
        <>
          <h1 className="form-header">Sign Up</h1>
        </>
      )}

      {isSignIn ? (
        <>
          <div className="input-container">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email Address
            </label>
            <StyledInput
              name={"email"}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleFormChange}
              autoComplete={"true"}
            />
          </div>
          <div className="input-container">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <StyledInput
              name={"password"}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
              autoComplete={"true"}
            />
          </div>
        </>
      ) : (
        <>
          <div className="input-container">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email Address
            </label>
            <StyledInput
              name={"email"}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleFormChange}
              autoComplete={"false"}
            />
          </div>
          <div className="input-container">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <StyledInput
              name={"password"}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
              autoComplete={"false"}
            />
          </div>

          <div className="input-container">
            <label htmlFor="confirmPasswordInput" className="form-label">
              Confirm Password
            </label>
            <StyledInput
              name={"passwordConfirm"}
              type="passwordConfirm"
              className="form-control"
              id="confirmPasswordInput"
              onChange={handleFormChange}
              autoComplete={"false"}
            />
          </div>
        </>
      )}

      {/* <SubmitWrapper>
        <button type="submit" className="standardized-button">
          Submit
        </button>
      </SubmitWrapper> */}

      <CheckMarkContainer>
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          onChange={() => setIsSubmitDisabled(!isSubmitDisabled)}
        />

        <label className="form-check-label">
          <span>You agree to our {"  "}</span>
          <Link href="/terms-of-service" passHref legacyBehavior>
            <a target="#">
              <span className="term-text">Terms of Service</span>
            </a>
          </Link>
        </label>
      </CheckMarkContainer>

      <ProviderWrapper>
        <h6>Sign in with:</h6>

        <span className="provider-note">
          Note: Signing in with providers for the first time also creates
          account
        </span>

        <ProviderContainer
          providers={providers}
          isSubmitDisabled={isSubmitDisabled}
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
    color: blue;
    text-decoration: underline;
  }

  .form-check-input {
    cursor: pointer;
    border: 2px solid black;
    padding: 0.5rem;

    :checked {
      color: ${Colors.elegant.accentPurple};
    }
  }
`;

const ProviderWrapper = styled.div`
  padding-top: 2rem;

  .provider-note {
    font-size: 14px;
    color: gray;
  }
`;

const StyledInput = styled.input`
  border: 2px solid gray;
  border-radius: 12px;
  color: gray;
  font-weight: 500;
  padding: 0.5rem;

  ::placeholder {
    color: gray;
    font-weight: 500;
  }
`;

const FormStyling = styled.form`
  width: 100%;
  text-align: center;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0px 4px 8px gray;
  border: 1px solid black;
  background-color: white;

  .form-header {
    padding: 2rem 0;
  }

  .input-container {
    max-width: 28rem;
    margin: 0.5rem auto;
  }

  @media ${MediaQueries.MD} {
    min-width: 35rem;
    border-radius: unset;
    box-shadow: unset;
  }
`;

export default SignInForm;
