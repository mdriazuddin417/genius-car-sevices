import { async } from "@firebase/util";
import { sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { useUpdateProfile } from "react-firebase-hooks/auth";

import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useToken from "../../../hooks/useToken";
const Register = () => {
  const [agree, setAgree] = useState(false);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [token] = useToken(user);

  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  if (token) {
    navigate("/home");
  }

  if (loading || updating) {
    return <Loading />;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });

    toast("Updated profile");
  };

  return (
    <div className="register-form">
      <h2 className="text-center text-success mt-4">Please Register</h2>
      <>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Your Name" />
          <br />
          <input type="email" name="email" placeholder="Your Email" required />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            required
          />
          <br />
          <input
            onClick={() => setAgree(!agree)}
            type="checkbox"
            name="terms"
            id="terms"
          />
          {/* <label
            htmlFor="terms"
            className={agree ? " text-primary" : "text-danger"}
          >
            Accept Genius Car Terms and Conditions
          </label>{" "} */}
          <label
            htmlFor="terms"
            className={`ps-2 ${agree ? "text-primary" : "text-danger"}`}
          >
            Accept Genius Car Terms and Conditions
          </label>{" "}
          <input
            disabled={!agree}
            type="submit"
            value="Register"
            className="bg-primary bg-opacity-50 w-50 mx-auto d-block mt-2"
          />
        </form>
      </>
      <p>
        All Ready have an account ?
        <Link
          to={"/login"}
          className="text-primary text-decoration-none"
          onClick={navigateLogin}
        >
          Please Login
        </Link>
      </p>
      <SocialLogIn />
    </div>
  );
};

export default Register;
