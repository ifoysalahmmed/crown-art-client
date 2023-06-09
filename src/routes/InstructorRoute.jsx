import React from "react";
import useAuth from "../hooks/useAuth/useAuth";
import useInstructor from "../hooks/useInstructor";
import { Navigate } from "react-router-dom";
import Loader from "../pages/Shared/Loader/Loader";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isInstructor, isInstructorLoading } = useInstructor();

  if (loading || isInstructorLoading) {
    return <Loader></Loader>;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
