import { NavLink, Outlet } from "react-router-dom";
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
            <ul className="menu p-4 w-60 h-full bg-green-300 text-base-content space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className="text-white font-medium"
                    >
                      <FaUsers size={20}></FaUsers> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-courses"
                      className="text-white font-medium"
                    >
                      <SiGoogleclassroom size={20}></SiGoogleclassroom> Manage
                      Courses
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
              {isInstructor ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-courses"
                      className="text-white font-medium"
                    >
                      <SiGoogleclassroom size={20}></SiGoogleclassroom> My
                      Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/add-course"
                      className="text-white font-medium"
                    >
                      <GiClassicalKnowledge size={20}></GiClassicalKnowledge>{" "}
                      Add a Course
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
              {!isAdmin && !isInstructor && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/selected-courses"
                      className="text-white font-medium"
                    >
                      <MdClass size={20}></MdClass> My Selected Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/enrolled-courses"
                      className="text-white font-medium"
                    >
                      <FcPaid size={20}></FcPaid> My Enrolled Courses
                    </NavLink>
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
