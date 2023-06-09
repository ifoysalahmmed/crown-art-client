import React, { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/instructors`)
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
            className="card w-full bg-[#90c641e6] shadow-xl text-white"
          >
            <div className="card-body">
              <h2 className="card-title">{popularInstructor?.name}</h2>
              <p>{popularInstructor?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
