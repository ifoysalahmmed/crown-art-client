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
        <title>Crown Art | Courses</title>
      </Helmet>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classInfo) => (
          <div
            key={classInfo._id}
            className={`card card-compact w-full h-full px-7 shadow-xl ${
              classInfo.seats === 0
                ? "bg-red-400 hover:shadow-red-500 hover:shadow-2xl"
                : "bg-purple-400 hover:shadow-purple-500 hover:shadow-2xl"
            }`}
          >
            <figure className=" pt-10">
              <img
                src={classInfo.image}
                alt="Class Image"
                className="w-80 h-52 object-fill rounded-xl"
              />
            </figure>

            <div className="my-3 space-y-2">
              <h2 className="card-title">{classInfo.name}</h2>

              <p className="font-medium">Instructor: {classInfo.instructor}</p>

              <p className="font-medium">Available Seats: {classInfo.seats}</p>

              <p className="font-medium">Tk. {classInfo.price}</p>

              <div className="card-actions justify-center">
                {classInfo.seats === 0 ? (
                  <button className="btn btn-sm" disabled>
                    Add Now
                  </button>
                ) : userInfo?.role === "admin" ? (
                  <button className="bt btn-sm" disabled>
                    Add Now
                  </button>
                ) : userInfo?.role === "instructor" ? (
                  <button className="btn btn-sm" disabled>
                    Add Now
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddClass(classInfo)}
                    className="btn btn-sm bg-purple-600 hover:bg-rose-400 transition-all"
                  >
                    Add Now
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
