import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [userInfo] = useUserInfo();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;

  const handleUpdateProfile = (data) => {
    if (data.image[0] === undefined) {
      data.image = userInfo?.image;

      axiosSecure
        .put(
          `${import.meta.env.VITE_API_URL}/instructor/${userInfo?.email}`,
          data
        )
        .then((res) => {
          console.log(res);
          if (res.data.modifiedCount > 0) {
            toast.success("Profile updated successfully");
            navigate("/instructors");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          data.image = imageResponse.data.display_url;

          axiosSecure
            .put(
              `${import.meta.env.VITE_API_URL}/instructor/${userInfo?.email}`,
              data
            )
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                toast.success("Profile updated successfully");
                navigate("/instructors");
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Profile</title>
      </Helmet>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name")}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600 py-2">Name is required</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Profile Photo</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered file-input-ghost w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Biography</span>
              </label>
              <textarea
                placeholder="Write something about you..."
                {...register("bio")}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.bio && (
                <span className="text-red-600 py-2">Biography is required</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Academic Qualification
                </span>
              </label>
              <textarea
                placeholder="Write something about your academic qualification..."
                {...register("qualification")}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.qualification && (
                <span className="text-red-600 py-2">
                  Academic Qualification is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Professional Experience
                </span>
              </label>
              <textarea
                placeholder="Write something about your professional experience..."
                {...register("experience")}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.experience && (
                <span className="text-red-600 py-2">
                  Professional Experience is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Teaching Area</span>
              </label>
              <textarea
                placeholder="Write something about teaching area..."
                {...register("teachingArea")}
                className="textarea textarea-bordered textarea-md w-full h-20"
              ></textarea>
              {errors.teachingArea && (
                <span className="text-red-600 py-2">
                  Teaching Area is required
                </span>
              )}
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Update Profile"
              className="btn btn-info bg-[#90c641e6] border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
