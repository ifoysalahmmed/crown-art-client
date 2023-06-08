import React, { useEffect, useState } from "react";

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
    <div>
      <div>
        {popularClasses.map((popularClass) => (
          <p key={popularClass._id}>{popularClass.name}</p>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
