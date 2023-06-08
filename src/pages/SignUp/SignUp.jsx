import React, { useState } from "react";
import { useForm } from "react-hook-form";
import signUpImg from "../../assets/signup/signup.png";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passError, setPassError] = useState(false);

  const onSubmit = (data) => {
    const { name, email, password, confirmPassword, photo } = data || {};

    if (password !== confirmPassword) {
      setPassError(true);
      return;
    }

    setPassError(false);
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2">
          <img src={signUpImg} alt="sign up image" className="w-2/3 m-auto" />
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-200">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 px-4 py-2">
                    Name is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600 px-4 py-2">
                    Email is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  })}
                  className="input input-bordered w-full"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600 px-4 py-2">
                    Password is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600 px-4 py-2">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600 px-4 py-2">
                    Password must have one uppercase, one special character
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  })}
                  className="input input-bordered w-full"
                />
                {errors.confirmPassword?.type === "required" && (
                  <span className="text-red-600 px-4 py-2">
                    Password is required
                  </span>
                )}
                {errors.confirmPassword?.type === "minLength" && (
                  <span className="text-red-600 px-4 py-2">
                    Password must be 6 characters
                  </span>
                )}
                {errors.confirmPassword?.type === "pattern" && (
                  <span className="text-red-600 px-4 py-2">
                    Password must have one uppercase, one special character
                  </span>
                )}
                {passError && (
                  <span className="text-red-600 px-4 py-2">
                    Password doesn&apos;t match
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  {...register("photo", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-600 px-4 py-2">
                    Photo URL is required
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn bg-[#90c641e6] hover:btn-info text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
