import React, { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard";

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
    <div className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularClasses.map((popularClass) => (
          <PopularClassCard
            key={popularClass._id}
            popularClass={popularClass}
          ></PopularClassCard>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
