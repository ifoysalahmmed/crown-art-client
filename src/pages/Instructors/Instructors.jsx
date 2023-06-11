import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/instructors`)
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Crown Art | Instructors</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card w-full h-96 bg-[#90c641e6] text-white shadow-xl group"
          >
            <figure className="h-full">
              <img
                src={instructor?.image}
                alt="Class Image"
                className="object-cover w-full h-full group-hover:scale-110 transition"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{instructor?.name}</h2>
              <p className="font-medium">Email: {instructor?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Instructors;
