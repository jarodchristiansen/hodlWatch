import React, { useState, useEffect } from "react";
import ProviderContainer from "./ProviderContainer";
import { Form, Button } from "react-bootstrap";
import { isMobile } from "../../helpers/device/ClientSide";
import { toast, ToastContainer } from "react-nextjs-toast";
import { SuccessMessageConsts, ErrorMessageConsts } from "../../helpers/Consts";
import { signIn } from "next-auth/client";
import styled from "styled-components";

const SignInForm = ({ providers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSignInSubmit", e);
    console.log({ email, password });

    await signIn("credentials", {
      redirect: true,
      email,
      password,
    });
  };
  useEffect(() => {}, []);

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
    <form
      className={isMobile() ? "w-100 my-5 px-4" : "w-50 my-5"}
      onSubmit={handleSignInSubmit}
    >
      <div className="mb-3">
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
      <CheckboxWrapper>
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />

        <label className="form-check-label">Check me out</label>
      </CheckboxWrapper>

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
    </form>
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

export default SignInForm;
