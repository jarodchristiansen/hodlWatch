import React, { useState, useEffect } from "react";
import ProviderContainer from "./ProviderContainer";
import { Form, Button } from "react-bootstrap";
import { isMobile } from "../../helpers/device/ClientSide";
import { toast, ToastContainer } from "react-nextjs-toast";
import { SuccessMessageConsts, ErrorMessageConsts } from "../../helpers/Consts";
import { signIn } from "next-auth/client";

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
      className={isMobile() ? "w-100 my-5" : "w-50 my-5"}
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
