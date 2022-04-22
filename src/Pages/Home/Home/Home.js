import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import Banner from "../Banner/Banner";
import Experts from "../Experts/Experts";
import Services from "../Services/Services";

const Home = () => {
  return (
    <>
      <PageTitle title="Home" />
      <Banner />
      <Services />
      <Experts />
    </>
  );
};

export default Home;
