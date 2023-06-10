import React from "react";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Crown Art | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
    </>
  );
};

export default Home;
