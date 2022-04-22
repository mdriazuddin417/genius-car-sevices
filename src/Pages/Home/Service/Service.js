import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";
const Service = ({ service }) => {
  const { _id, name, img, description, price } = service;
  const navigate = useNavigate();
  const navigateToServiceDetail = (id) => {
    navigate(`/service/${id}`);
  };
  return (
    <div className="service p-2">
      <img src={img} alt="" className="img-fluid" />
      <h3>{name}</h3>
      <p>price : {price}</p>
      <p>
        <small>{description}</small>
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigateToServiceDetail(_id)}
      >
        Book: {name}
      </button>
    </div>
  );
};

export default Service;
