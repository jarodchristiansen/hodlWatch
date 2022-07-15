import React, { useState, useEffect } from "react";
import ProviderContainer from "./ProviderContainer";
import { Form, Button } from "react-bootstrap";
import { isMobile } from "../../helpers/device/ClientSide";
import { toast, ToastContainer } from "react-nextjs-toast";
import { SuccessMessageConsts, ErrorMessageConsts } from "../../helpers/Consts";

const SignInForm = ({ providers }) => {
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("handleSignInSubmit", e);
  };
  useEffect(() => {}, []);

  return (
    <form
      className={isMobile() ? "w-100 my-5" : "w-50 my-5"}
      onSubmit={handleSignInSubmit}
    >
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
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
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />

        <label className="form-check-label">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      <div>
        <ProviderContainer providers={providers} />
      </div>
      <ToastContainer position={"bottom"} />

      {/*<ToastHolder />*/}
    </form>
  );
};

export default SignInForm;
