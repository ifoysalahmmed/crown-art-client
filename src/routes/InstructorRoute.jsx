import React from "react";
import useAuth from "../hooks/useAuth/useAuth";
import useInstructor from "../hooks/useInstructor";
import { Navigate } from "react-router-dom";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isInstructor, isInstructorLoading } = useInstructor();

  if (loading || isInstructorLoading) {
    return (
      <div className="text-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
