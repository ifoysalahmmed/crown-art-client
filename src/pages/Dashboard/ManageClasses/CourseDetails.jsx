import Modal from "../../../component/Modal/Modal";

const CourseDetails = ({ isOpen, setIsOpen, courseInfo }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={courseInfo?.name} maxWidth={"max-w-2xl"} bgColor={"bg-rose-100"}>
      <div className="mt-4 text-black space-y-4">
        <div>
          <img src={courseInfo?.image} alt="" className="w-full rounded-md" />
        </div>
        <div>
          <h2>
            <span className="font-medium">Instructor:</span>{" "}
            {courseInfo?.instructor}
          </h2>
          <p>
            <span className="font-medium">Email:</span> {courseInfo?.email}
          </p>
        </div>
        <div>
          <p className="text-sm">{courseInfo?.description}</p>
        </div>
        <div className="flex justify-between">
          <p className="capitalize">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-medium p-1 text-white text-xs rounded-md ${
                courseInfo?.status === "approved" ? "bg-emerald-600" : ""
              }${courseInfo?.status === "denied" ? "bg-yellow-400" : ""}${
                courseInfo?.status === "pending" ? "bg-cyan-400" : ""
              }`}
            >
              {courseInfo?.status}
            </span>
          </p>
          <p>
            <span className="font-medium">Course Fee:</span> Tk.{" "}
            {courseInfo?.price}
          </p>
        </div>
        <div className="flex justify-between">
          <p>
            <span className="font-medium">Available Seats:</span>{" "}
            {courseInfo?.seats}
          </p>
          <p>
            <span className="font-medium">Enrolled:</span>{" "}
            {courseInfo?.enrolled}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(false)}
          className="btn bg-red-500 hover:bg-red-400 transition-all text-white btn-sm"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CourseDetails;
