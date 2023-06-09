import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Classes from "../pages/Classes/Classes";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AdminRoute from "./AdminRoute";
import Users from "../pages/Dashboard/Users/Users";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import FeedbackForm from "../pages/Dashboard/ManageClasses/FeedbackForm";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import UpdateClass from "../pages/Dashboard/UpdateClass/UpdateClass";
import MySelectedClasses from "../pages/Dashboard/MySelectedClasses/MySelectedClasses";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/feedback/:id",
        element: (
          <AdminRoute>
            <FeedbackForm></FeedbackForm>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-class",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/my-classes",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/update-class/:id",
        element: (
          <InstructorRoute>
            <UpdateClass></UpdateClass>
          </InstructorRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/classes/${params.id}`),
      },
      {
        path: "/dashboard/selected-classes",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "/dashboard/enrolled-classes",
        element: <h2>My Enrolled Classes is coming</h2>,
      },
    ],
  },
]);
