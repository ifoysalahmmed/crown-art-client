import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const FeedbackForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch(`${import.meta.env.VITE_API_URL}/classes/admin/feedback/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Your feedback is submitted!");
          navigate("/dashboard/manage-classes");
        }
      });
  };

  return (
    <div className="w-full px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Feedback</span>
          </label>
          <textarea
            placeholder="Write your reason for approving or denying the class..."
            {...register("feedback", { required: true })}
            className="textarea textarea-bordered h-48"
          ></textarea>
          {errors.feedback && (
            <span className="text-red-600 px-4 py-2">Feedback is required</span>
          )}
        </div>

        <input
          type="submit"
          value="Submit Feedback"
          className="btn btn-info btn-block bg-[#90c641e6] border-0 text-white mt-4"
        />
      </form>
    </div>
  );
};

export default FeedbackForm;
