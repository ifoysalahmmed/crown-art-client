import React from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeInstructor = (user) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/instructor/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
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
          refetch();
          toast.success(`${user?.name} is ADMIN Now!!!`);
        }
      });
  };

  return (
    <div className="w-full px-6">
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead className="bg-[#90c641e6]">
            <tr className="text-white capitalize">
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
                    "Instructor"
                  ) : user?.role === "admin" ? (
                    "Admin"
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost btn-xs capitalize"
                      >
                        make admin
                      </button>

                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-ghost btn-xs capitalize"
                      >
                        make instructor
                      </button>
                    </>
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
