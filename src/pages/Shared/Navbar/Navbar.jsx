import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import Avatar from "./Avatar";
import logoImg from "../../../assets/logo/king.png";
import { toast } from "react-hot-toast";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

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
      <li className="font-semibold uppercase">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold uppercase">
        <NavLink to="/courses">Courses</NavLink>
      </li>
      <li className="font-semibold uppercase">
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`navbar fixed z-10 bg-slate-500 xl:px-20 md:px-10 sm:px-2 px-4  ${
          theme === "light" ? "text-base-100" : "text-green-100"
        }`}
      >
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#283333cc] rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="logo"
                className="w-5 h-5 object-fill mr-1"
              />
              <span>Crown Art</span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end items-center">
          <label className="swap swap-rotate mr-6">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
            />

            <svg
              className="swap-on fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Avatar></Avatar>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-500 rounded-box w-40 font-semibold"
              >
                {isAdmin && (
                  <li>
                    <Link to={"/dashboard/manage-users"}>Dashboard</Link>
                  </li>
                )}
                {isInstructor && (
                  <>
                    <li>
                      <Link to={"/instructor-profile"}>Profile</Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/my-courses"}>Dashboard</Link>
                    </li>
                  </>
                )}
                {!isAdmin && !isInstructor && (
                  <li>
                    <Link to={"/dashboard/selected-courses"}>Dashboard</Link>
                  </li>
                )}
                <li>
                  <Link onClick={handleLogOut} className="text-red-400">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                className="btn bg-violet-700 hover:bg-violet-900 text-white font-medium border-0 btn-sm mr-2"
                to="/sign-up"
              >
                Sign Up
              </Link>
              <Link
                className="btn border-violet-700 hover:border-violet-700 bg-inherit hover:bg-violet-900 text-white font-medium btn-sm"
                to="/login"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
