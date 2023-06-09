import React from "react";

const PopularClassCard = ({ popularClass }) => {
  return (
    <div className="card w-full h-96 bg-[#90c641e6] text-white shadow-xl group">
      <figure className="h-full">
        <img
          src={popularClass?.image}
          alt="Class Image"
          className="object-cover w-full h-full group-hover:scale-110 transition"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{popularClass?.name}</h2>
        <p className="font-medium">Price: ${popularClass?.price}</p>
        <p className="font-medium">Available Seats: {popularClass?.seats}</p>
        <p className="font-medium">Already Enrolled: {popularClass?.enrolled}</p>
      </div>
    </div>
  );
};

export default PopularClassCard;
