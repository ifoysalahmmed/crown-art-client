import React from "react";
import useAuth from "../../../hooks/useAuth";
import googleImg from "../../../assets/social/google.png";
import { toast } from "react-hot-toast";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;

        const saveUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
        };

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("User created successfully");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="divider text-warning font-medium">Or Sign in with</div>
      <div className="text-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-outline border-0"
        >
          <img src={googleImg} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
