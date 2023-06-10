import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import { Helmet } from "react-helmet-async";

const EnrolledClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [] } = useQuery({
    queryKey: ["enrolledClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClasses/${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Crown Art | Enrolled Classes</title>
      </Helmet>
      <div className="w-full px-6">
        {classes && Array.isArray(classes) && classes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-[#90c641e6]">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Transaction Id</th>
                </tr>
              </thead>
              <tbody>
                {classes &&
                  classes.map((cls, idx) => (
                    <tr key={cls._id}>
                      <th>{idx + 1}</th>
                      <td>
                        <div className="font-bold">{cls?.className}</div>
                      </td>
                      <td>${cls?.price}</td>
                      <td>{new Date(cls?.date).toDateString()}</td>
                      <td>{cls?.transactionId}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You didn't enrolled any class. Pay first!"}
            address={"/dashboard/selected-classes"}
            label={"pay"}
          ></EmptyInfo>
        )}
      </div>
    </>
  );
};

export default EnrolledClasses;
