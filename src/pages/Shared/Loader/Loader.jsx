import React from "react";
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <GridLoader size={20} color="#90c641e6"></GridLoader>
    </div>
  );
};

export default Loader;
