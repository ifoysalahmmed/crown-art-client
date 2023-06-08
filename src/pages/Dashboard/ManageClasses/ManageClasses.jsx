import React from "react";
import useAdminClasses from "../../../hooks/useAdminClasses";
import { toast } from "react-hot-toast";

const ManageClasses = () => {
  const [classes, refetch] = useAdminClasses();

  const handleApprove = (course) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/classes/admin/approve/${course?._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`${course?.name} is Approved`);
        }
      });
  };

  const handleDeny = (course) => {
    fetch(`${import.meta.env.VITE_API_URL}/classes/admin/deny/${course?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`${course?.name} is Denied`);
        }
      });
  };

  return (
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
                  <div className="capitalize font-medium">{course.status}</div>
                </td>
                <th>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleApprove(course)}
                      className="btn btn-success btn-xs"
                    >
                      approve
                    </button>
                    <button
                      onClick={() => handleDeny(course)}
                      className="btn btn-warning btn-xs"
                    >
                      deny
                    </button>
                    <button className="btn btn-info btn-xs">feedback</button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
