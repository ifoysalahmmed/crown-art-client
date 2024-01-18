import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpdateClass = () => {
  const courseInfo = useLoaderData();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const defaultValues = {
    name: courseInfo.name,
    seats: courseInfo.seats,
    price: courseInfo.price,
    description: courseInfo?.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;

  const handleUpdateCourse = (data) => {
    data.seats = parseInt(data.seats);
    data.price = parseFloat(data.price);

    if (data.image[0] === undefined) {
      data.image = courseInfo?.image;

      const updatedData = { ...data, status: "pending" };

      axiosSecure
        .put(
          `${import.meta.env.VITE_API_URL}/courses/${courseInfo?._id}`,
          updatedData
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Course updated successfully");
            navigate("/dashboard/my-courses");
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

          const updatedData = { ...data, status: "pending" };

          axiosSecure
            .put(
              `${import.meta.env.VITE_API_URL}/courses/${courseInfo?._id}`,
              updatedData
            )
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                toast.success("Course updated successfully");
                navigate("/dashboard/my-courses");
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
        <title>Crown Art | Update Course</title>
      </Helmet>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(handleUpdateCourse)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Course Name</span>
              </label>
              <input
                type="text"
                placeholder="Course Name"
                {...register("name", { required: true })}
                defaultValue={defaultValues.name}
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
                {...register("image")}
                className="file-input file-input-bordered file-input-ghost w-full"
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
                defaultValue={defaultValues.price}
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className="text-red-600 py-2">
                  Course Fee is required
                </span>
              )}
            </div>
          </div>

          <div className="form-control w-full mt-6 mb-8">
            <label className="label">
              <span className="label-text font-semibold">Course Content</span>
            </label>
            <textarea
              placeholder="Write something about your course..."
              {...register("description", { required: true })}
              defaultValue={defaultValues.description}
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
              value="Update Course"
              className="btn btn-info bg-green-400 border-0 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateClass;
