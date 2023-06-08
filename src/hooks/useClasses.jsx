import React from "react";
import useAuth from "./useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/classes/instructor/${user?.email}`
      );
      return res.data;
    },
  });

  return [classes, refetch];
};

export default useClasses;
