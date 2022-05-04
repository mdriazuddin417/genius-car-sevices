import React from "react";
import google from "../../../images/social/google.png";
import facebook from "../../../images/social/facebook.png";
import github from "../../../images/social/github.png";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../hooks/useToken";

const SocialLogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  //Facebook and Google and GitHub log in System

  const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);
  const [signInWithFacebook, user2, loading2, error2] =
    useSignInWithFacebook(auth);
  const [signInWithGithub, user3, loading3, error3] = useSignInWithGithub(auth);
  const [token] = useToken(user1 || user2 || user3);
  let errorElement;

  if (error1 || error2 || error3) {
    errorElement = (
      <p className="text-danger">
        Error:{error1?.message}
        {error2?.message}
        {error3?.message}
      </p>
    );
  }
  if (token) {
    navigate(from, { replace: true });
  }
  if (loading1 || loading2 || loading3) {
    return <Loading />;
  }
  return (
    <div>
      <div className="d-flex align-items-center ">
        <div className=" bg-primary w-50" style={{ height: "1px" }}></div>
        <p className="mt-3 px-3">or</p>
        <div className=" bg-primary w-50" style={{ height: "1px" }}></div>
      </div>
      <div>
        {errorElement}
        <button
          className="btn border-1 border-primary w-50 d-flex justify-content-around align-items-center p-2 mx-auto "
          onClick={() => signInWithGoogle()}
        >
          <img src={google} alt="" width={30} />
          <span className="fw-bold text-danger">Google Sign in</span>
        </button>
        <button
          className="btn border-1 border-primary w-50 d-flex justify-content-around align-items-center p-2 mx-auto mt-2"
          onClick={() => signInWithFacebook()}
        >
          <img src={facebook} alt="" width={30} />
          <span className="fw-bold text-primary">facebook Sign in</span>
        </button>
        <button
          className="btn border-1 border-primary w-50 d-flex justify-content-around align-items-center p-2 mx-auto mt-2"
          onClick={() => signInWithGithub()}
        >
          <img src={github} alt="" width={30} />
          <span className="fw-bold text-secondary">GitHub Sign in</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
