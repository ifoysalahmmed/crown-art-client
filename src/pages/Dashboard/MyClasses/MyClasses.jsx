import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [] } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/classes/instructor/${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Crown Art | My Classes</title>
      </Helmet>
      <div className="w-full px-6">
        {classes && Array.isArray(classes) && classes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-[#90c641e6]">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Total Enrolled</th>
                  <th>Feedback</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((course, idx) => (
                  <tr key={course._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="font-medium">{course.name}</div>
                    </td>
                    <td>
                      <div className="font-medium">${course.price}</div>
                    </td>
                    <td>{course.enrolled}</td>
                    <td>{course?.feedback}</td>
                    <td>
                      <Link to={`/dashboard/update-class/${course._id}`}>
                        <button className="btn btn-ghost btn-md">
                          <FaEdit size={24}></FaEdit>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <div className="capitalize font-medium">
                        {course.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You haven't add any class. Add First."}
            address={"/dashboard/add-class"}
            label={"add class"}
          ></EmptyInfo>
        )}
      </div>
    </>
  );
};

export default MyClasses;
