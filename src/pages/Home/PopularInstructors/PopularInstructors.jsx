import React, { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/popularInstructors`)
      .then((res) => res.json())
      .then((data) => {
        setPopularInstructors(data);
      });
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-center text-3xl font-bold mb-6 text-[#90c641e6] animate__animated animate__bounceInLeft">
        Our Popular Instructors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularInstructors.map((popularInstructor) => (
          <div
            key={popularInstructor._id}
            className="card w-full h-96 bg-[#90c641e6] text-white shadow-xl group"
          >
            <figure className="h-full">
              <img
                src={popularInstructor?.image}
                alt="Class Image"
                className="object-cover w-full h-full group-hover:scale-110 transition"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{popularInstructor?.name}</h2>
              <p className="font-medium">Email: {popularInstructor?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
