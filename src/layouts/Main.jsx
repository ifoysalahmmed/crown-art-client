import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Container from "../pages/Shared/Container/Container";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      {/* TODO: fixed the issue of min height */}
      {/* className="min-h-[calc-(100vh-144px)]" */}
      <div>
        <Container>
          <div className="pt-20">
            <Outlet></Outlet>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
