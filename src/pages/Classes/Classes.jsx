import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  const { user } = useAuth();

  const [userInfo] = useUserInfo();

  const navigate = useNavigate();
  const location = useLocation();

  const [classes, SetClasses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/classes`)
      .then((res) => res.json())
      .then((data) => {
        SetClasses(data);
      });
  }, []);

  const handleAddClass = (classInfo) => {
    if (user && user?.email) {
      const { _id, ...rest } = classInfo;
      const bookingItem = {
        bookingItemId: _id,
        ...rest,
        email: user?.email,
      };

      fetch(`${import.meta.env.VITE_API_URL}/classBookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Class added on the selected classes");
            navigate("/dashboard/selected-classes");
          } else {
            toast.error(data.message);
          }
        });
    } else {
      toast.error("You must have to Login!");
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Classes</title>
      </Helmet>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classInfo) => (
          <div
            key={classInfo._id}
            className={`card w-full h-96 text-white shadow-xl ${
              classInfo.seats === 0 ? "bg-red-600" : "bg-[#90c641e6]"
            }`}
          >
            <figure className="h-full">
              <img
                src={classInfo.image}
                alt="Class Image"
                className="w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{classInfo.name}</h2>
              <p className="font-medium">
                Instructor Name: {classInfo.instructor}
              </p>
              <p className="font-medium">Seats: {classInfo.seats}</p>
              <p className="font-medium">Price: ${classInfo.price}</p>
              <div className="card-actions justify-end">
                {classInfo.seats === 0 ? (
                  <button className="btn btn-primary" disabled>
                    <span className="text-white">Add Now</span>
                  </button>
                ) : userInfo?.role === "admin" ? (
                  <button className="btn btn-primary" disabled>
                    <span className="text-white">Add Now</span>
                  </button>
                ) : userInfo?.role === "instructor" ? (
                  <button className="btn btn-primary" disabled>
                    <span className="text-white">Add Now</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddClass(classInfo)}
                    className="btn btn-success"
                  >
                    <span className="text-white">Add Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Classes;
