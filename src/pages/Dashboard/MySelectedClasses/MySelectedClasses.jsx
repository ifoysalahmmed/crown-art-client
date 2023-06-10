import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";

const MySelectedClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: bookingItems = [], refetch } = useQuery(
    ["classBookings"],
    async () => {
      const res = await axiosSecure.get(`/classBookings?email=${user?.email}`);
      return res.data;
    }
  );

  const handleDelete = (bookingItem) => {
    fetch(`http://localhost:5000/classBookings/${bookingItem?._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Your booked class has been deleted");
        }
      });
  };

  return (
    <div>
      <div className="w-full px-6">
        {bookingItems &&
        Array.isArray(bookingItems) &&
        bookingItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-[#90c641e6]">
                <tr className="text-white capitalize">
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Instructor</th>
                  <th>Available Seats</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Pay</th>
                </tr>
              </thead>
              <tbody>
                {bookingItems &&
                  bookingItems.map((bookingItem, idx) => (
                    <tr key={bookingItem._id}>
                      <th>{idx + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={bookingItem?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold">{bookingItem?.name}</div>
                      </td>
                      <td>
                        <div className="font-bold">
                          {bookingItem?.instructor}
                        </div>
                      </td>
                      <td>{bookingItem?.seats}</td>
                      <td>${bookingItem?.price}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(bookingItem)}
                          className="btn btn-ghost btn-sm"
                        >
                          <RiDeleteBin6Line
                            className="text-warning"
                            size={20}
                          ></RiDeleteBin6Line>
                        </button>
                      </td>
                      <td>
                        <Link to={`/dashboard/payment/${bookingItem?._id}`}>
                          <button className="btn btn-ghost btn-sm">
                            <MdPayment
                              className="text-accent"
                              size={20}
                            ></MdPayment>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You haven't select any class. Select first!"}
            address={"/classes"}
            label={"select class"}
          ></EmptyInfo>
        )}
      </div>
    </div>
  );
};

export default MySelectedClasses;
