import { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard";
import MovingText from "../../../component/MovingText/MovingText";

const PopularClasses = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/popularCourses`)
      .then((res) => res.json())
      .then((data) => {
        setPopularCourses(data);
      });
  }, []);

  return (
    <>
      {popularCourses.length > 0 && (
        <div className="mt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-semibold mb-2">
              <MovingText text="Popular Courses" />
            </h2>
            <hr className="border-[1px] border-[#90c641e6] w-4/12 md:w-2/12  mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCourses.map((popularCourse) => (
              <div key={popularCourse._id}>
                {popularCourse &&
                  popularCourse.seats > 0 &&
                  popularCourse.enrolled > 5 && (
                    <PopularClassCard
                    popularCourse={popularCourse}
                    ></PopularClassCard>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularClasses;
