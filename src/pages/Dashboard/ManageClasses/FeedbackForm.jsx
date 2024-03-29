import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const FeedbackForm = () => {
  const { id } = useParams();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosSecure
      .put(`${import.meta.env.VITE_API_URL}/courses/admin/feedback/${id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Feedback is submitted!");
          navigate("/dashboard/manage-courses");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Feedback</title>
      </Helmet>
      <div className="w-full px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Feedback</span>
            </label>
            <textarea
              placeholder="Write your reason for denying the course..."
              {...register("feedback", { required: true })}
              className="textarea textarea-bordered h-48"
            ></textarea>
            {errors.feedback && (
              <span className="text-red-600 px-4 py-2">
                Feedback is required
              </span>
            )}
          </div>

          <input
            type="submit"
            value="Submit Feedback"
            className="btn btn-info btn-block bg-green-400 border-0 text-white mt-4"
          />
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;
