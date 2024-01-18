import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { toast } from "react-hot-toast";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import { Helmet } from "react-helmet-async";

const MySelectedClasses = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: bookingItems = [], refetch } = useQuery(
    ["courseBookings"],
    async () => {
      const res = await axiosSecure.get(`/courseBookings?email=${user?.email}`);
      return res.data;
    }
  );

  const handleDelete = (bookingItem) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/courseBookings/${bookingItem?._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Your booked course has been deleted");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Crown Art | Selected Courses</title>
      </Helmet>
      <div className="w-full px-6">
        {bookingItems &&
        Array.isArray(bookingItems) &&
        bookingItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead className="bg-green-300">
                <tr className="text-white capitalize">
                  <th>Name</th>
                  <th>Available Seats</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Pay</th>
                </tr>
              </thead>
              <tbody>
                {bookingItems &&
                  bookingItems.map((bookingItem) => (
                    <tr key={bookingItem._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-40 h-20 rounded">
                              <img src={bookingItem?.image} alt="" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{bookingItem?.name}</div>
                          </div>
                        </div>
                      </td>

                      <td>{bookingItem?.seats}</td>

                      <td>Tk. {bookingItem?.price}</td>

                      <td>
                        <button
                          onClick={() => handleDelete(bookingItem)}
                          className="btn btn-ghost btn-sm"
                        >
                          <RiDeleteBin6Line
                            className="text-warning"
                            size={20}
                          ></RiDeleteBin6Line>
                        </button>
                      </td>

                      <td>
                        <Link to={`/dashboard/payment/${bookingItem?._id}`}>
                          <button className="btn btn-ghost btn-sm">
                            <MdPayment
                              className="text-accent"
                              size={20}
                            ></MdPayment>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyInfo
            message={"You haven't select any course. Select first!"}
            address={"/courses"}
            label={"Select Course"}
          ></EmptyInfo>
        )}
      </div>
    </>
  );
};

export default MySelectedClasses;
