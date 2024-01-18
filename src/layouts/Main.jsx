import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Container from "../pages/Shared/Container/Container";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <Container>
          <div className="pt-20 min-h-screen">
            <Outlet></Outlet>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
