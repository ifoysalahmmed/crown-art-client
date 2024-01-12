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
        {instructors &&
          instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="card card-compact w-full text-rose-800 bg-violet-400 shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img
                  src={instructor?.image}
                  className="w-40 h-40 rounded-full object-fill"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title font-bold">{instructor?.name}</h2>
                <p className="font-medium">
                  <span className="font-bold">Email:</span> {instructor?.email}
                </p>
                <div className="card-actions">
                  <button className="btn bg-violet-700 hover:bg-violet-900 text-white font-medium border-0 btn-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Instructors;
