import React, { useState, useEffect, useCallback, useMemo } from "react";
import ProviderContainer from "./ProviderContainer/ProviderContainer";
import { Form, Button } from "react-bootstrap";
import { isMobile } from "../../helpers/device/ClientSide";
import { toast, ToastContainer } from "react-nextjs-toast";
import { SuccessMessageConsts, ErrorMessageConsts } from "../../helpers/Consts";
import { signIn } from "next-auth/client";
import styled from "styled-components";
import { MediaQueries } from "../../styles/MediaQueries";
import { useRouter } from "next/router";
import ToggleSwitch from "../commons/switchers/toggle-switch";

const SignInForm = ({ providers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(router.query.path === "SignIn");

  console.log({ router, isSignIn });

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSignInSubmit", e);
    console.log({ email, password });

    await signIn("credentials", {
      email,
      password,
    });
  };

  const handleFormChange = (e) => {
    const { name } = e.target;

    console.log(name);

    if (name) {
      switch (name) {
        case "email":
          setEmail(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
        case "passwordConfirm":
          console.log("This is password confirm", e.target.value);
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
        label={"Sign In?"}
        toggleState={isSignIn}
        setToggleState={setIsSignIn}
      />

      {isSignIn ? (
        <>
          <div className="mb-3 input-container">
            <h2 className={"py-2"}>Sign In</h2>

            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <StyledInput
              name={"email"}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3 input-container">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <StyledInput
              name={"password"}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 input-container">
            <h2 className={"py-2"}>Sign Up</h2>

            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <StyledInput
              name={"email"}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleFormChange}
            />
            {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div className="mb-3 input-container">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <StyledInput
              name={"password"}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-3 input-container">
            <label htmlFor="confirmPasswordInput" className="form-label">
              Confirm Password
            </label>
            <StyledInput
              name={"passwordConfirm"}
              type="passwordConfirm"
              className="form-control"
              id="confirmPasswordInput"
              onChange={handleFormChange}
            />
          </div>
        </>
      )}

      {/* <CheckboxWrapper>
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />

        <label className="form-check-label">Check me out</label>
      </CheckboxWrapper> */}

      <SubmitWrapper>
        <button type="submit" className="standardized-button">
          Submit
        </button>
      </SubmitWrapper>

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

  .input-container {
    max-width: 28rem;
    margin: auto;
  }
`;

export default SignInForm;
