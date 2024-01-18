import Modal from "../../../component/Modal/Modal";

const StatusDetails = ({ isOpen, setIsOpen, courseInfo }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={courseInfo?.name} bgColor={"bg-green-100"}>
      <div className="my-2 space-y-2">
        <p>
          <span className="font-medium">Seats:</span> {courseInfo?.seats}
        </p>
        <p>
          <span className="font-medium">Total Enrolled:</span>{" "}
          {courseInfo?.enrolled}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`capitalize font-medium p-1 text-white text-xs rounded-md ${
              courseInfo?.status === "approved" ? "bg-emerald-600" : ""
            }${courseInfo?.status === "denied" ? "bg-yellow-400" : ""}${
              courseInfo?.status === "pending" ? "bg-cyan-400" : ""
            }`}
          >
            {courseInfo?.status}
          </span>
        </p>
        {courseInfo?.feedback && (
          <p>
            <span className="font-medium">Feedback:</span>{" "}
            {courseInfo?.feedback}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-error text-white btn-xs"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default StatusDetails;
