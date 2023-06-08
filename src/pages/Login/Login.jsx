import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import loginImg from "../../assets/login/login.png";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const Login = () => {
  const { signIn } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data || {};

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        toast.success("Login Successful!");
        console.log(loggedUser);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2">
          <img src={loginImg} alt="login image" className="w-2/3 m-auto" />
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-200">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center text-[#90c641e6]">
              Login now!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-red-600 px-4 py-2">
                    Email is required
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                    })}
                    className="input input-bordered w-full"
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <RiEyeOffFill size={20}></RiEyeOffFill>
                    ) : (
                      <RiEyeFill size={20}></RiEyeFill>
                    )}
                  </button>
                </div>
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
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
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

export default Login;
