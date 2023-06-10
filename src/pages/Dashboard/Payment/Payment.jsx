import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { id } = useParams();

  const [axiosSecure] = useAxiosSecure();

  const { data: bookingInfo = {}, refetch } = useQuery(
    ["classBookings"],
    async () => {
      const res = await axiosSecure.get(`/classBookings/${id}`);
      return res.data;
    }
  );

  return (
    <div>
      <h2>Payment is coming</h2>
    </div>
  );
};

export default Payment;
