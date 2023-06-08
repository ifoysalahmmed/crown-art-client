import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Container from "../pages/Shared/Container/Container";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <div className="pt-20">
          <Outlet></Outlet>
        </div>
      </Container>
    </>
  );
};

export default Main;
