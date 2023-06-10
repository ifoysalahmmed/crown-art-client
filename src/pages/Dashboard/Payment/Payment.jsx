import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const [axiosSecure] = useAxiosSecure();

  const { id } = useParams();

  const [bookingInfo, setBookingInfo] = useState({});

  useEffect(() => {
    axiosSecure.get(`/classBookings/${id}`).then((res) => {
      setBookingInfo(res.data);
    });
  }, [axiosSecure, id]);

  return (
    <div className="w-full px-6">
      <Elements stripe={stripePromise}>
        {Object.keys(bookingInfo).length > 0 && (
          <CheckoutForm bookingInfo={bookingInfo}></CheckoutForm>
        )}
      </Elements>
    </div>
  );
};

export default Payment;
