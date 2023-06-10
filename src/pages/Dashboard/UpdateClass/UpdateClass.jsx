import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpdateClass = () => {
  const classInfo = useLoaderData();

  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const defaultValues = {
    name: classInfo.name,
    instructor: user?.displayName,
    email: user?.email,
    seats: classInfo.seats,
    price: classInfo.price,
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.seats = parseInt(data.seats);
    data.price = parseFloat(data.price);

    axiosSecure
      .put(`${import.meta.env.VITE_API_URL}/classes/${classInfo._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Class updated successfully");
          navigate("/dashboard/my-classes");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Update Class</title>
      </Helmet>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Class Name</span>
              </label>
              <input
                type="text"
                placeholder="Class Name"
                {...register("name", { required: true })}
                defaultValue={defaultValues.name}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Instructor Name"
                {...register("instructor")}
                defaultValue={defaultValues.instructor}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                defaultValue={defaultValues.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Available Seats
                </span>
              </label>
              <input
                type="number"
                placeholder="Available Seats"
                {...register("seats", { required: true })}
                defaultValue={defaultValues.seats}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                defaultValue={defaultValues.price}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Update Class"
              className="btn btn-info bg-[#90c641e6] border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateClass;
