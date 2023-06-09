import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import Avatar from "./Avatar";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navOptions = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Instructors</Link>
      </li>
      <li className="font-semibold">
        <Link to="/classes">Classes</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-base-100 xl:px-20 md:px-10 sm:px-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
              {user?.email && (
                <>
                  <li className="font-semibold">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Crown Art
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
            {user?.email && (
              <>
                <li className="font-semibold">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {!user?.email && (
            <Link
              className="btn btn-outline border-[#90c641e6] hover:btn-info text-[#90c641e6]"
              to="/login"
            >
              <span className="">Login</span>
            </Link>
          )}
          {user?.email && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <Avatar></Avatar>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <button
                  onClick={handleLogOut}
                  className="btn btn-outline bg-[#90c641e6] border-0 text-white hover:btn-warning"
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
