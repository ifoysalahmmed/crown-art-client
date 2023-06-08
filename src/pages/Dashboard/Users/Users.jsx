import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GrUserAdmin } from "react-icons/gr";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleMakeInstructor = (user) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/instructor/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is INSTRUCTOR Now!!!`);
        }
      });
  };

  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/admin/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is ADMIN Now!!!`);
        }
      });
  };

  return (
    <div className="w-full px-6">
      <div className="overflow-x-auto">
        <table className="table-md w-full text-center">
          {/* head */}
          <thead className="bg-[#90c641e6]">
            <tr className="text-white uppercase">
              <th></th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="font-bold">{user?.name}</div>
                </td>
                <td>{user?.email}</td>
                <th>
                  {user?.role === "instructor" ? (
                    "instructor"
                  ) : (
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      className="btn btn-ghost btn-xs"
                    >
                      make instructor
                    </button>
                  )}
                  {user?.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost btn-xs"
                    >
                      make admin
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
