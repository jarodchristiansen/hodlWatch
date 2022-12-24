import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-nextjs-toast";
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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(router.query.path === "SignIn");

  const handleSignInSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignIn) {
      await signIn("credentials", {
        email,
        password,
      });
    } else {
      // TODO: Add signUp method in graphQL with validation
      // console.log({ email, password, passwordConfirm });
    }
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
          setPasswordConfirm(e.target.value);
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
        toggleState={isSignIn}
        setToggleState={setIsSignIn}
      />

      {/* TODO: re-integrate credentials signup/in */}
      {/* {isSignIn ? (
        <>
          <div className="input-container">
            <h2 className={"form-header"}>Sign In</h2>

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
            <h2 className={"form-header"}>Sign Up</h2>

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
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              onChange={handleFormChange}
              autoComplete={"false"}
            />
          </div>


        </>
      )}

      <SubmitWrapper>
        <button type="submit" className="standardized-button">
          Submit
        </button>
      </SubmitWrapper> */}

      <ProviderWrapper>
        <h6>Sign in with:</h6>

        <span className="provider-note">
          Note: Signing in with providers for the first time also creates
          account
        </span>

        <ProviderContainer providers={providers} />
      </ProviderWrapper>
      <ToastContainer position={"bottom"} />

      {/*<ToastHolder />*/}
    </FormStyling>
  );
};

const StyledInput = styled.input`
  border: 1.5px solid black;
  border-radius: 8px;
  color: black;
  font-weight: bold;

  ::placeholder {
    color: black;
    font-weight: bold;
  }
`;

const SubmitWrapper = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const ProviderWrapper = styled.div`
  padding-top: 2rem;

  .provider-note {
    font-size: 14px;
    color: gray;
  }
`;

const FormStyling = styled.form`
  width: 100%;
  border: 2px solid black;
  text-align: center;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0px 4px 8px gray;

  .form-header {
    padding: 1rem 0;
  }

  .input-container {
    max-width: 28rem;
    margin: 0.5rem auto;
  }
`;

export default SignInForm;
