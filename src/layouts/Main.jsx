import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="pt-[68px]">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Main;
