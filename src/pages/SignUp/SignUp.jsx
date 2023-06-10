import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import signUpImg from "../../assets/signup/signup.png";
import useAuth from "../../hooks/useAuth/useAuth";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassVisibility = () => {
    setConfirmPassVisible(!confirmPassVisible);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [passError, setPassError] = useState(false);

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const { name, email, password, confirmPassword, photo } = data || {};

    console.log(photo);

    if (password !== confirmPassword) {
      setPassError(true);
      return;
    }

    setPassError(false);

    const formData = new FormData();
    formData.append("image", photo[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        const photoUrl = imageResponse.data.display_url;

        createUser(email, password)
          .then(() => {
            updateUserProfile(name, photoUrl)
              .then(() => {
                const saveUser = { name, email, image: photoUrl };
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
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Sign Up</title>
      </Helmet>
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
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600 py-2">Name is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600 py-2">Email is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
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
                    <label
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <RiEyeOffFill size={20}></RiEyeOffFill>
                      ) : (
                        <RiEyeFill size={20}></RiEyeFill>
                      )}
                    </label>
                  </div>
                  {errors.password?.type === "required" && (
                    <span className="text-red-600 py-2">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600 py-2">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600 py-2">
                      Password must have one uppercase, one special character
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Confirm Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={confirmPassVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                      })}
                      className="input input-bordered w-full"
                    />
                    <label
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                      onClick={toggleConfirmPassVisibility}
                    >
                      {confirmPassVisible ? (
                        <RiEyeOffFill size={20}></RiEyeOffFill>
                      ) : (
                        <RiEyeFill size={20}></RiEyeFill>
                      )}
                    </label>
                  </div>
                  {passError && (
                    <span className="text-red-600 py-2">
                      Password doesn&apos;t match
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Upload Photo</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: true })}
                    className="file-input file-input-bordered file-input-ghost w-full"
                  />
                  {errors.photo && (
                    <span className="text-red-600 py-2">Photo is required</span>
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
    </>
  );
};

export default SignUp;
