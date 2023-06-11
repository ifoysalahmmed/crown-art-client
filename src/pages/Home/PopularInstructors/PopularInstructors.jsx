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
    <div className="mt-10">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-semibold mb-2 animate__animated animate__bounceInLeft">
          Our Popular Instructors
        </h2>
        <hr className="border-[1px] border-[#90c641e6] w-2/12 mx-auto" />
      </div>
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
