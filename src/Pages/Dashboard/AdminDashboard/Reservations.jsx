import { FaCloudUploadAlt, FaSearch, FaTimes } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../../components/Spinner";

const Reservations = () => {

    const { user } = useAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const [statusId, setStatusId] = useState(null);
    const [searchValue, setSearchValue] = useState('')

    const { data: appointments, isLoading, refetch } = useQuery({
        queryKey: ['/appointments'],
        queryFn: () =>
            axiosSecure.get(`/appointments`).then(({ data }) => data.result),
    });

    console.log(appointments);

    const handleSearch = (e) => {
        setSearchValue(e.target.value)

    }


    const handleSubmitReport = (e) => {
        e.preventDefault();

        const form = e.target;
        const result = form?.test_result?.value;

        const payload = {
            status: "delivered",
            test_result: result
        }
        console.log(statusId, payload);

        axiosSecure.patch(`/admin/appointments/${statusId}`, payload)
            .then(result => {
                console.log(result);
                if (result?.data?.result?.modifiedCount > 0) {
                    document.getElementById('my_modal_3').close();
                    toast.success("Report Delivered");
                    refetch();
                }
            })
            .catch(error => console.log(error))



    }


    const handleDelete = (id) => {

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


                axiosSecure.delete(`/appointments/${id}`)
                    .then(result => {

                        console.log(result);

                        if (result?.data?.result?.deletedCount === 1) {

                            Swal.fire({
                                title: "Cancelled!",
                                text: "Reservation has been cancelled.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(error => console.log(error))
            }
        });
    }



    if (isLoading) {
        <Spinner></Spinner>
    }

    console.log(appointments);


    const searchReservation = searchValue
        ? appointments?.filter(appointment => {
            const lowercasedUserEmail = appointment.user_email.toLowerCase();
            const lowercasedSearchValue = searchValue.toLowerCase();

            console.log("Lowercased User Email:", lowercasedUserEmail);
            console.log("Lowercased Search Value:", lowercasedSearchValue);

            return lowercasedUserEmail.includes(lowercasedSearchValue);
        })
        : appointments;

    console.log("Search Value:", searchValue);
    console.log("Search Result:", searchReservation);



    return (
        <div>
            <SectionTitle title="Reservations"></SectionTitle>

            <div className="mb-20 mt-4 mx-10 ">
                <FaSearch className="absolute mt-4 ml-4 text-lg text-gray-400"></FaSearch>
                <input onChange={(e) => handleSearch(e)}
                    type="text"
                    name="search"
                    placeholder="Search by email"
                    className="input input-bordered w-full pl-10"
                />
            </div>

            <div className="w-11/12 mx-auto border-y-4 border-teal-600 my-10 -mt-12 overflow-scroll">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead className="text-lg">
                        <tr className="text-center">
                            <th> # </th>
                            <th> Test Name </th>
                            <th> Booked by </th>
                            <th> Book Date </th>
                            <th> Slot </th>
                            <th> Status </th>
                            <th> Cancel </th>
                        </tr>
                    </thead>


                    <tbody className="text-center">

                        {
                            searchReservation?.map(
                                ({ _id, test_slug, booking_date, booking_slot, user_email, status }, index) => {
                                    const isLast = index === appointments?.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (<>
                                        <tr key={_id}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td className={classes}>
                                                {test_slug}


                                            </td>
                                            <td className={classes}>{user_email}</td>
                                            <td className={classes}>{booking_date}</td>
                                            <td className={classes}>
                                                <div>
                                                    {" "}
                                                    <p>{booking_slot}</p>

                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <button
                                                    disabled={status === 'delivered'}

                                                    onClick={() => {
                                                        setStatusId(_id);
                                                        document.getElementById('my_modal_3').showModal()
                                                    }}

                                                    className="btn btn-ghost btn-lg text-teal-500 px-0"
                                                >
                                                    <FaCloudUploadAlt></FaCloudUploadAlt>
                                                    {status}
                                                </button>
                                            </td>
                                            <th className={classes}>
                                                <button onClick={() => handleDelete(_id)} className="btn btn-ghost btn-lg text-red-500 px-2">
                                                    <FaTimes></FaTimes >
                                                </button>
                                            </th>
                                        </tr>



                                    </>);

                                }
                            )}

                    </tbody>

                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg text-center">Submit Report</h3>
                            <form onSubmit={handleSubmitReport}>

                                <label className="form-control w-full max-w-xs mx-auto pt-6">
                                    <div className="label">
                                        <span className="label-text">Report as PDF Link</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="test_result"
                                        placeholder="Only Submit PDF Link" className="input input-bordered w-full max-w-xs" />
                                    <button type="submit" className="mx-auto mt-4 btn  btn-outline text-teal-500 text-center">Submit</button>
                                </label>


                            </form>
                        </div>
                    </dialog>

                </table>

            </div>

        </div>
    );
};

export default Reservations;