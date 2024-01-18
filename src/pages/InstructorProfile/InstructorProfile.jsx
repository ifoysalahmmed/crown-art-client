import { useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Avatar from "../Shared/Navbar/Avatar";
import { Helmet } from "react-helmet-async";
import EditInstructorProfile from "./EditInstructorProfile";

const InstructorProfile = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: instructors = [], refetch } = useQuery({
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

  const [isOpen, setIsOpen] = useState(false);
  const [instructorInfo, setInstructorInfo] = useState({});

  const handleModal = (data) => {
    setInstructorInfo(data);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Profile</title>
      </Helmet>
      <EditInstructorProfile
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        instructorInfo={instructorInfo}
        refetch={refetch}
      ></EditInstructorProfile>

      <div className="w-9/12 mx-auto relative mt-16 p-5 border-2 border-slate-300 rounded">
        <div className="my-5 flex justify-between">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-xl font-bold">{name}</h1>
              <p className="badge badge-ghost capitalize font-semibold">
                {role}
              </p>
            </div>
            <h2>
              Signed up using Email <span className="font-bold">{email}</span>
            </h2>
          </div>
          <div>
            <button
              onClick={() => handleModal(userInfo)}
              className="btn btn-outline btn-secondary btn-xs"
            >
              Edit Profile
            </button>
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
      </div>
      <div className="avatar absolute top-20 left-[607.5px]">
        <div className="w-32 rounded-full">
          {image ? (
            <img src={image} alt="" className="w-full object-fill" />
          ) : (
            <Avatar></Avatar>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorProfile;
