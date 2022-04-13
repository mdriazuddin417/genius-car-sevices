import React from "react";
import sleeping from "../../../images/sleeping.jpg";
const NotFound = () => {
  return (
    <div className="text-center">
      <h2 className="text-danger display-1 fw-bold">404</h2>
      <img src={sleeping} alt="" />
    </div>
  );
};

export default NotFound;
