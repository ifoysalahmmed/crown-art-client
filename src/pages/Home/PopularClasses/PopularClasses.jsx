import React, { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard";
import MovingText from "../../../component/MovingText/MovingText";

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/popularClasses`)
      .then((res) => res.json())
      .then((data) => {
        setPopularClasses(data);
      });
  }, []);

  return (
    <div className="mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">
          <MovingText text="Popular Courses" />
        </h2>
        <hr className="border-[1px] border-[#90c641e6] w-4/12 md:w-2/12  mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularClasses.map((popularClass) => (
          <div key={popularClass._id}>
            {popularClass &&
              popularClass.seats > 0 &&
              popularClass.enrolled > 5 && (
                <PopularClassCard
                  popularClass={popularClass}
                ></PopularClassCard>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
