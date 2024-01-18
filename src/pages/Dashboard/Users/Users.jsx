import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import avatarImg from "../../../assets/avatar/placeholder.jpg";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`${import.meta.env.VITE_API_URL}/users/admin/${user?._id}`)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user?.name} is ADMIN Now!!!`);
        }
      });
  };

  const handleMakeInstructor = (user) => {
    axiosSecure
      .patch(`${import.meta.env.VITE_API_URL}/users/instructor/${user?._id}`)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user?.name} is INSTRUCTOR Now!!!`);
        }
      });
  };

  const handleMakeStudent = (user) => {
    axiosSecure
      .patch(`${import.meta.env.VITE_API_URL}/users/student/${user?._id}`)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user?.name} is STUDENT Now!!!`);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Manage Users</title>
      </Helmet>
      <div className="w-full px-6">
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="bg-green-300">
              <tr className="text-white capitalize">
                <th></th>
                <th>name</th>
                <th>email</th>
                <th>role</th>
                <th>change role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.image || avatarImg} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>{user?.email}</td>

                  <td>
                    <span
                      className={`capitalize font-semibold text-white p-1 rounded-md ${
                        user?.role === "admin" ? "bg-warning" : ""
                      } ${user?.role === "instructor" ? "bg-success" : ""} ${
                        user?.role === "student" ? "bg-info" : ""
                      }`}
                    >
                      {user?.role}
                    </span>
                  </td>

                  <th className="flex flex-col gap-2">
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-warning btn-xs capitalize text-white"
                      >
                        admin
                      </button>
                    )}

                    {user?.role !== "instructor" && (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-success btn-xs capitalize text-white"
                      >
                        instructor
                      </button>
                    )}

                    {user?.role !== "student" && (
                      <button
                        onClick={() => handleMakeStudent(user)}
                        className="btn btn-info btn-xs capitalize text-white"
                      >
                        student
                      </button>
                    )}
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

export default Users;
