import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Container from "../pages/Shared/Container/Container";
import { FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

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
              {isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="text-white font-medium"
                    >
                      <FaUsers></FaUsers> Manage Classes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="text-white font-medium"
                    >
                      <FaUsers></FaUsers> Manage Users
                    </Link>
                  </li>
                </>
              )}
              {isInstructor && (
                <>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="text-white font-medium"
                    >
                      <FaUsers></FaUsers> Add a Class
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="text-white font-medium"
                    >
                      <FaUsers></FaUsers> My Classes
                    </Link>
                  </li>
                </>
              )}
              {!isAdmin && !isInstructor && (
                <>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="text-white font-medium"
                    >
                      <FaUsers></FaUsers> My Selected Classes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/users"
                      className="text-white font-medium"
                    >
                      <FaUsers></FaUsers> My Enrolled Classes
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
