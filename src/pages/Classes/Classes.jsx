import { useEffect, useState } from "react";
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

  const [courses, SetCourses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        SetCourses(data);
      });
  }, []);

  const handleAddCourse = (courseInfo) => {
    if (user && user?.email) {
      const { _id, ...rest } = courseInfo;
      const bookingItem = {
        bookingItemId: _id,
        ...rest,
        email: user?.email,
      };

      fetch(`${import.meta.env.VITE_API_URL}/courseBookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Course added on the selected courses");
            navigate("/dashboard/selected-courses");
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
        {courses.map((courseInfo) => (
          <div
            key={courseInfo._id}
            className={`card card-compact w-full h-full px-7 shadow-xl ${
              courseInfo.seats === 0
                ? "bg-red-400 hover:shadow-red-500 hover:shadow-2xl"
                : "bg-purple-400 hover:shadow-purple-500 hover:shadow-2xl"
            }`}
          >
            <figure className=" pt-10">
              <img
                src={courseInfo.image}
                alt="Course Image"
                className="w-80 h-52 object-fill rounded-xl"
              />
            </figure>

            <div className="my-3 space-y-2">
              <h2 className="card-title">{courseInfo.name}</h2>

              <p className="font-medium">Instructor: {courseInfo.instructor}</p>

              <p className="font-medium">Available Seats: {courseInfo.seats}</p>

              <p className="font-medium">Tk. {courseInfo.price}</p>

              <div className="card-actions justify-center">
                {courseInfo.seats === 0 ? (
                  <h2 className="text-red-500 font-medium">
                    There are no available seats
                  </h2>
                ) : userInfo?.role === "admin" ? (
                  <h2 className="text-red-500 font-medium">
                    Admin can&apos;t buy courses
                  </h2>
                ) : userInfo?.role === "instructor" ? (
                  <h2 className="text-red-500 font-medium">
                    Instructor can&apos;t buy courses
                  </h2>
                ) : (
                  <button
                    onClick={() => handleAddCourse(courseInfo)}
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
