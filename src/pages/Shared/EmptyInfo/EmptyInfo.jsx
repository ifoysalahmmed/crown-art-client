import { Link } from "react-router-dom";

const EmptyInfo = ({ message, address, label }) => {
  return (
    <div className="h-screen gap-5 flex flex-col justify-center items-center">
      <p className="text-green-800 text-xl lg:text-3xl">{message}</p>
      <Link to={address}>
        <button className="btn bg-green-400 hover:btn-info text-white hover:text-white">
          {label}
        </button>
      </Link>
    </div>
  );
};

export default EmptyInfo;
