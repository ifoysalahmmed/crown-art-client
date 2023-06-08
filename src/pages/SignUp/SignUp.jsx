import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signUpImg from "../../assets/signup/signup.png";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-hot-toast";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
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

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            const saveUser = { name, email };
            fetch(`${import.meta.env.VITE_API_URL}/users`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  toast.success("User created successfully");
                  navigate(from, { replace: true });
                }
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2">
          <img src={signUpImg} alt="sign up image" className="w-2/3 m-auto" />
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-200">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center text-[#90c641e6]">
              Sign Up now!
            </h1>
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
                  className="btn bg-[#90c641e6] hover:btn-info hover:text-white text-white"
                />
              </div>
            </form>
            <p>
              <small>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-warning font-semibold">
                    Go to Login
                  </span>
                </Link>
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
