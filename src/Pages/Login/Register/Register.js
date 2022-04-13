import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
  };

  return (
    <div className="register-form">
      <h2 className="text-center text-success">Please Register</h2>
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
            type="submit"
            value="Register"
            className="bg-primary bg-opacity-50"
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
    </div>
  );
};

export default Register;
