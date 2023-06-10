import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Container from "../pages/Shared/Container/Container";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <div className="pt-20">
          <Outlet></Outlet>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Main;
