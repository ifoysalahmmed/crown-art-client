import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Avatar from "../Shared/Navbar/Avatar";
import { Helmet } from "react-helmet-async";

const InstructorProfile = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/instructors");
      return res.data;
    },
  });

  const userInfo = instructors?.find(
    (instructorInfo) => instructorInfo?.email === user?.email
  );

  const {
    name,
    email,
    image,
    role,
    bio,
    qualification,
    experience,
    teachingArea,
  } = userInfo || {};

  return (
    <>
      <Helmet>
        <title>Crown Art | Profile</title>
      </Helmet>
      <div className="mx-40 mt-5 p-5 border-2 border-slate-300 rounded">
        <h2 className="text-xl font-bold mb-3">Your Profile</h2>
        <div className="grid grid-cols-1 justify-center">
          <div className="mt-5 avatar">
            <div className="w-40 rounded-full">
              {image ? (
                <img src={image} alt="" className="w-full object-cover" />
              ) : (
                <Avatar></Avatar>
              )}
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <h1 className="text-xl font-bold">
              {name}{" "}
              <span className=" badge badge-primary capitalize">{role}</span>
            </h1>
            <h2>
              Signed up using Email <span className=" font-bold">{email}</span>
            </h2>
          </div>
        </div>

        <div className="w-full my-5">
          <div className="space-y-4">
            {bio && (
              <div>
                <h3 className="font-bold">Biography:</h3>
                <p className="pl-4">{bio}</p>
              </div>
            )}
            {qualification && (
              <div>
                <h3 className="font-bold">Academic Qualification:</h3>
                <p className="pl-4">{qualification}</p>
              </div>
            )}
            {experience && (
              <div>
                <h3 className="font-bold">Professional Experience:</h3>
                <p className="pl-4">{experience}</p>
              </div>
            )}
            {teachingArea && (
              <div>
                <h3 className="font-bold">Teaching Area:</h3>
                <p className="pl-4">{teachingArea}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-outline btn-secondary btn-xs">
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default InstructorProfile;
