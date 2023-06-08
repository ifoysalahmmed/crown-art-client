import React from "react";
import useAuth from "./useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdminClasses = () => {
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/classes`);
      return res.json();
    },
  });

  return [classes, refetch];
};

export default useAdminClasses;
