import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../Pages/Shared/Loading/Loading";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  if (!user.emailVerified) {
    return (
      <div>
        <ToastContainer />
        <h3 className="text-danger">Your Email is not verified</h3>
        <h5 className="text-success">Please Verify your Email address</h5>
        <button
          className="btn btn-outline-primary"
          onClick={async () => {
            await sendEmailVerification();
            toast.success("Sent email");
          }}
        >
          Send Verification Email Again
        </button>
      </div>
    );
  }
  return children;
};

export default RequireAuth;
