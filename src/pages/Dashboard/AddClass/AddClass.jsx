import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const AddClass = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const defaultValues = {
    instructor: user?.displayName,
    email: user?.email,
  };

  const { register, handleSubmit, reset } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    data.seats = parseInt(data.seats);
    data.price = parseFloat(data.price);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        data.image = imageResponse.data.display_url;
        data.status = "pending";
        data.enrolled = parseInt(0);

        axiosSecure
          .post(`${import.meta.env.VITE_API_URL}/classes`, data)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              toast.success("Class added successfully");
              navigate("/dashboard/my-classes");
            }
          });
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Add Class</title>
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
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Class Image</span>
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered file-input-ghost w-full"
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
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Add Class"
              className="btn btn-info bg-[#90c641e6] border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClass;
