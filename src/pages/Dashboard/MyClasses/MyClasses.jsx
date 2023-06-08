import React from "react";
import useClasses from "../../../hooks/useClasses";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const [classes, refetch] = useClasses();

  return (
    <div className="w-full px-6">
      <div className="overflow-x-auto">
        <table className="table-md w-full text-center">
          <thead className="bg-[#90c641e6]">
            <tr className="text-white uppercase">
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
                  <div className="capitalize font-medium">{course.status}</div>
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
