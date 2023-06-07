import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const navOptions = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Instructors</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Classes</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-base-100">
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
                    <Link to="/">Classes</Link>
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
                  <Link to="/">Classes</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {!user?.email && (
            <Link className="btn btn-outline border-[#90c641e6]" to="/login">
              <span className="text-[#90c641e6]">Login</span>
            </Link>
          )}
          {user?.email && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img title={user.displayName} src={user.photoURL} alt="" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  {/* onClick={handleLogOut} */}
                  <button className="btn btn-outline bg-[#90c641e6]">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
