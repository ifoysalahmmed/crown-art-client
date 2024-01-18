import { Link } from "react-router-dom";
import MovingText from "../../../component/MovingText/MovingText";
import img1 from "../../../assets/whyUs/piggy-bank-green-icon.svg";
import img2 from "../../../assets/whyUs/hand-with-brush-green-icon.svg";
import img3 from "../../../assets/whyUs/video-green-icon.svg";

const data = [
  {
    id: 1,
    image: img1,
    desc: "Learn to draw, paint, and design from the comfort of your home for a fraction of the cost of traditional art school.",
    path: "login",
    pathHeading: "SUBSCRIBE",
  },
  {
    id: 2,
    image: img2,
    desc: "Learn to draw, paint, and design from the comfort of your home for a fraction of the cost of traditional art school.",
    path: "instructors",
    pathHeading: "MEET THE INSTRUCTORS",
  },
  {
    id: 1,
    image: img3,
    desc: "Control your own schedule, have easy access to pre-recorded lectures that you can re-watch as many times as you want.",
    path: "courses",
    pathHeading: "OUR COURSES",
  },
];

const WhyUs = () => {
  return (
    <div className="mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">
          <MovingText text="Why Crown Art?" />
        </h2>
        <hr className="border-[1px] border-[#90c641e6] w-4/12 md:w-2/12  mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((list) => (
          <div
            key={list.id}
            className="card bg-emerald-100 w-full shadow-xl hover:shadow-[#90c641e6] hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-700"
          >
            <figure className="px-10 pt-10">
              <img src={list.image} className="rounded-xl h-32" />
            </figure>
            <div className="card-body items-center text-center">
              <p>{list.desc}</p>
              <Link to={`/${list.path}`}>
                <h4 className="card-title text-base font-bold uppercase text-[#90c641e6]">
                  {list.pathHeading}
                </h4>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
