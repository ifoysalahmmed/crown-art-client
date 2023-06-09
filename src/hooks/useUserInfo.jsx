import React from "react";
import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/users/${user?.email}`
      );
      return res.data;
    },
  });

  return [userInfo, refetch];
};

export default useUserInfo;
