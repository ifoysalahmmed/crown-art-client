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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    data.instructor = user?.displayName;
    data.email = user?.email;
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
          .post(`${import.meta.env.VITE_API_URL}/courses`, data)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              toast.success("Course added successfully");
              navigate("/dashboard/my-courses");
            }
          });
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Add Course</title>
      </Helmet>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Name</span>
              </label>
              <input
                type="text"
                placeholder="Course Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600 py-2">
                  Course Name is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Banner</span>
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered file-input-ghost w-full"
              />
              {errors.image && (
                <span className="text-red-600 py-2">
                  Course Banner is required
                </span>
              )}
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
              {errors.seats && (
                <span className="text-red-600 py-2">
                  Available Seats is required
                </span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Fee</span>
              </label>
              <input
                type="number"
                placeholder="Course Fee"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className="text-red-600 py-2">
                  Course Fee is required
                </span>
              )}
            </div>
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-semibold">Course Content</span>
            </label>
            <textarea
              placeholder="Write something about your course..."
              {...register("description", { required: true })}
              className="textarea textarea-bordered textarea-md w-full h-40"
            ></textarea>
            {errors.description && (
              <span className="text-red-600 py-2">
                Course Content is required
              </span>
            )}
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Add Course"
              className="btn btn-info bg-green-400 border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClass;
