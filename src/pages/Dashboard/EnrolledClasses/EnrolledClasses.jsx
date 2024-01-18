import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import { Helmet } from "react-helmet-async";

const EnrolledClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: courses = [] } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledCourses/${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Crown Art | Enrolled Courses</title>
      </Helmet>
      <div className="w-full px-6">
        {courses && Array.isArray(courses) && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-green-300">
                <tr className="text-white capitalize">
                  <th>Name</th>
                  <th>Course Fee</th>
                  <th>Date</th>
                  <th>Transaction Id</th>
                </tr>
              </thead>
              <tbody>
                {courses &&
                  courses.map((course) => (
                    <tr key={course._id}>
                      <td>
                        <div className="font-bold">{course?.courseName}</div>
                      </td>

                      <td>Tk. {course?.price}</td>

                      <td>{new Date(course?.date).toDateString()}</td>

                      <td>{course?.transactionId}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You didn't enrolled in any course. Enroll first!"}
            address={"/dashboard/selected-courses"}
            label={"Pay for Selected Courses"}
          ></EmptyInfo>
        )}
      </div>
    </>
  );
};

export default EnrolledClasses;
