import React from "react";

const PopularClassCard = ({ popularClass }) => {
  return (
    <div
      key={popularClass._id}
      className="card card-compact w-full h-full px-7 shadow-xl bg-purple-400 hover:shadow-purple-500 hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700"
    >
      <figure className=" pt-10">
        <img
          src={popularClass.image}
          alt="Class Image"
          className="w-80 h-52 object-fill rounded-xl"
        />
      </figure>

      <div className="my-3 space-y-2">
        <h2 className="card-title">{popularClass.name}</h2>
        <p className="font-medium">Instructor: {popularClass.instructor}</p>
        <p className="font-medium">Available Seats: {popularClass.seats}</p>
        <p className="font-medium">Tk. {popularClass.price}</p>
        <p className="font-medium">
          Already Enrolled: {popularClass?.enrolled}
        </p>
      </div>
    </div>
  );
};

export default PopularClassCard;
