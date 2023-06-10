import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Container from "../pages/Shared/Container/Container";
import { FaUsers } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdClass } from "react-icons/md";
import { FcPaid } from "react-icons/fc";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import Footer from "../pages/Shared/Footer/Footer";

// TODO: need add icons in the dashboard routes

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <div className="drawer lg:drawer-open pt-20">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet></Outlet>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 h-full bg-[#90c641e6] text-base-content">
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      to="/dashboard/manage-classes"
                      className="text-white font-medium"
                    >
                      <SiGoogleclassroom size={20}></SiGoogleclassroom> Manage
                      Classes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-users"
                      className="text-white font-medium"
                    >
                      <FaUsers size={20}></FaUsers> Manage Users
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              {isInstructor ? (
                <>
                  <li>
                    <Link
                      to="/dashboard/add-class"
                      className="text-white font-medium"
                    >
                      <GiClassicalKnowledge size={20}></GiClassicalKnowledge>{" "}
                      Add a Class
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/my-classes"
                      className="text-white font-medium"
                    >
                      <SiGoogleclassroom size={20}></SiGoogleclassroom> My
                      Classes
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              {!isAdmin && !isInstructor && (
                <>
                  <li>
                    <Link
                      to="/dashboard/selected-classes"
                      className="text-white font-medium"
                    >
                      <MdClass size={20}></MdClass> My Selected Classes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/enrolled-classes"
                      className="text-white font-medium"
                    >
                      <FcPaid size={20}></FcPaid> My Enrolled Classes
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
