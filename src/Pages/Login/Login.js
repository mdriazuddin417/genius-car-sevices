import { async } from "@firebase/util";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import SocialLogIn from "./SocialLogIn/SocialLogIn";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../Shared/PageTitle/PageTitle";
import axios from "axios";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //Sign in With Email and Password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (user) {
    // navigate(from, { replace: true });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post(
      "https://young-coast-37816.herokuapp.com/login",
      { email }
    );
    console.log(data);
    localStorage.setItem("accessToken", data.accessToken);
    navigate(from, { replace: true });
  };
  const navigateRegister = (event) => {
    navigate("/register");
  };
  //Password Reset
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Send Email !");
    } else {
      toast.error("Please enter your email address ?");
    }
  };

  let errorElement;
  if (error) {
    errorElement = <p className="text-danger">Error:{error.message}</p>;
  }

  return (
    <div className="container mx-auto w-50 mt-3 shadow rounded p-3">
      <PageTitle title="Login" />
      <h2 className="text-primary text-center">Please Log in</h2>
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary w-50 mx-auto d-block" type="submit">
            Login
          </Button>
        </Form>
      </>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <p className="mb-0">
          New Genius Car ?
          <Link
            to={"/register"}
            className="text-primary text-decoration-none"
            onClick={navigateRegister}
          >
            Please Register
          </Link>
        </p>
        <p className="mb-0">
          Forget Password ?
          <button
            to={"/register"}
            className="btn btn-link text-decoration-none"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </p>
      </div>
      {(loading || sending) && <Loading />}
      {errorElement}
      <SocialLogIn />
    </div>
  );
};

export default Login;
