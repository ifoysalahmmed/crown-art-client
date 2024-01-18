import { useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import StatusDetails from "./StatusDetails";

const MyClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/courses/instructor/${user?.email}`
      );
      return res.data;
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [courseInfo, setCourseInfo] = useState({});

  const handleModal = (course) => {
    setCourseInfo(course);
    setIsOpen(!isOpen);
  };

  const handleDelete = (course) => {
    axiosSecure.delete(`/courses/${course?._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Course has been deleted");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | My Courses</title>
      </Helmet>
      <StatusDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        courseInfo={courseInfo}
      ></StatusDetails>
      <div className="w-full px-6">
        {courses && Array.isArray(courses) && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-green-300">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Name</th>
                  <th>Course Fee</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={course._id}>
                    <th>{idx + 1}</th>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-40 h-20 rounded">
                            <img src={course?.image} alt="" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{course?.name}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="font-medium">Tk. {course.price}</div>
                    </td>

                    <td>
                      <button
                        onClick={() => handleModal(course)}
                        className="btn btn-ghost btn-sm"
                      >
                        <FcViewDetails size={20}></FcViewDetails>
                      </button>
                    </td>

                    <td>
                      <div className="flex gap-2 items-center">
                        <div>
                          <Link to={`/dashboard/update-course/${course._id}`}>
                            <button className="btn btn-ghost btn-sm">
                              <FaEdit
                                className="text-success"
                                size={20}
                              ></FaEdit>
                            </button>
                          </Link>
                        </div>

                        <div>
                          <button
                            onClick={() => handleDelete(course)}
                            className="btn btn-ghost btn-sm"
                          >
                            <RiDeleteBin6Line
                              className="text-error"
                              size={20}
                            ></RiDeleteBin6Line>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You haven't add any course. Add First."}
            address={"/dashboard/add-course"}
            label={"Add Course"}
          ></EmptyInfo>
        )}
      </div>
    </>
  );
};

export default MyClasses;
