import { FaTimes } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAppointments from "../../../hooks/useAppointments";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UpComingAppointments = () => {

    const { user } = useAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure()
    console.log(user);

    // const [appointments, refetch] = useAppointments();

    const { data: appointments, isLoading, refetch } = useQuery({
        queryKey: ['/appointments', user?.email],
        queryFn: () =>
            axiosSecure.get(`/appointments/${user?.email}`).then(({ data }) => data.result),
    });

    console.log(appointments);

    const handleCancel = (id) => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/appointments/${id}/${user?.email}`)
                    .then(result => {
                        console.log(result);
                        if (result?.data?.result?.deletedCount > 0) {
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your appointment has been cancelled.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(error => console.log(error))

            }
        });

    }


    return (
        <div>
            <SectionTitle title="Upcoming Appointments"></SectionTitle>
            <div className="w-11/12 mx-auto border-y-4 border-teal-600 my-10 -mt-12">
                <table className="table w-full overflow-x-scroll">

                    <thead className="text-lg">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Test Name</th>
                            <th> Date </th>
                            <th> Slot </th>
                            <th> Price </th>
                            <th> Cancel </th>
                        </tr>
                    </thead>

                    <tbody className="text-center">

                        {
                            appointments?.map(
                                ({ _id, test_name, booking_slot, test_price, booking_date }, index) => {
                                    const isLast = index === appointments?.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (<>
                                        <tr key={_id}>
                                            <th>
                                                {index + 1}
                                            </th>

                                            <td className={classes}>{test_name}</td>

                                            <td className={classes}>{booking_date}</td>
                                            <td>
                                                <div>
                                                    {" "}
                                                    <p>{booking_slot}</p>

                                                </div>
                                            </td>
                                            <td className={classes}>$ {test_price}</td>
                                            <th>
                                                <button onClick={() => handleCancel(_id)} className="btn btn-ghost btn-lg text-red-500">
                                                    <FaTimes></FaTimes>
                                                </button>
                                            </th>
                                        </tr>

                                    </>);
                                }
                            )}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UpComingAppointments;