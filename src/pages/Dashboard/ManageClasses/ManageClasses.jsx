import React from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/classes/admin`
      );
      return res.data;
    },
  });

  const handleApprove = (course) => {
    axiosSecure
      .patch(
        `${import.meta.env.VITE_API_URL}/classes/admin/approve/${course?._id}`
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${course?.name} is Approved`);
        }
      });
  };

  const handleDeny = (course) => {
    axiosSecure
      .patch(
        `${import.meta.env.VITE_API_URL}/classes/admin/deny/${course?._id}`
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${course?.name} is Denied`);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Manage Classes</title>
      </Helmet>
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="bg-[#90c641e6]">
              <tr className="text-white">
                <th>Class Image</th>
                <th>Class Name</th>
                <th>Instructor Name</th>
                <th>Email</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {classes.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={course.image} alt="Avatar" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{course.name}</div>
                  </td>
                  <td>{course.instructor}</td>
                  <td>{course.email}</td>
                  <td>{course.seats}</td>
                  <td>{course.price}</td>
                  <td>
                    <div className="capitalize font-medium">
                      {course.status}
                    </div>
                  </td>
                  <th>
                    <div className="space-y-2">
                      {course?.status === "approved" ? (
                        <div>
                          <Link to={`/dashboard/feedback/${course._id}`}>
                            <button className="btn btn-info btn-xs text-white">
                              feedback
                            </button>
                          </Link>
                        </div>
                      ) : course?.status === "denied" ? (
                        <div>
                          <Link to={`/dashboard/feedback/${course._id}`}>
                            <button className="btn btn-info btn-xs text-white">
                              feedback
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(course)}
                            className="btn btn-success btn-xs text-white"
                          >
                            approve
                          </button>
                          <button
                            onClick={() => handleDeny(course)}
                            className="btn btn-warning btn-xs text-white"
                          >
                            deny
                          </button>
                          <div>
                            <Link to={`/dashboard/feedback/${course._id}`}>
                              <button className="btn btn-info btn-xs text-white">
                                feedback
                              </button>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageClasses;
