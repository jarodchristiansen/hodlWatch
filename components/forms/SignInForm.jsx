import React, { useState, useEffect } from "react";
import ProviderContainer from "./ProviderContainer";
import { Form, Button } from "react-bootstrap";
import { isMobile } from "../../helpers/device/ClientSide";
import { toast, ToastContainer } from "react-nextjs-toast";
import { SuccessMessageConsts, ErrorMessageConsts } from "../../helpers/Consts";
import { signIn } from "next-auth/client";
import styled from "styled-components";
import { MediaQueries } from "../../styles/MediaQueries";

const SignInForm = ({ providers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      }
    }
  };

  return (
    <FormStyling onSubmit={handleSignInSubmit}>
      <div className="mb-3">
        <h2 className={"py-2"}>Sign In</h2>

        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          name={"email"}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleFormChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          name={"password"}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handleFormChange}
        />
      </div>
      {/* <CheckboxWrapper>
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />

        <label className="form-check-label">Check me out</label>
      </CheckboxWrapper> */}

      <SubmitWrapper>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </SubmitWrapper>

      <ProviderWrapper>
        <ProviderContainer providers={providers} />
      </ProviderWrapper>
      <ToastContainer position={"bottom"} />

      {/*<ToastHolder />*/}
    </FormStyling>
  );
};

const CheckboxWrapper = styled.div`
  text-align: center;

  .form-check-label {
    padding-left: 1rem;
  }
`;

const SubmitWrapper = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const ProviderWrapper = styled.div`
  padding-top: 3rem;
`;

const FormStyling = styled.form`
  width: 100%;
  border: 2px solid black;
  text-align: center;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0px 4px 8px gray;

  @media ${MediaQueries.MD} {
    width: 34rem;
    margin: 1rem 0;
  }
`;

export default SignInForm;
