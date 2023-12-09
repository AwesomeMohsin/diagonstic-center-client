import { FaUserTie } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import { useState } from "react";

import { districts, upazilas } from "../../../lib/enums/index.js";


const AllUsers = () => {

    const { user, loading } = useAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState();

    console.log(userData);


    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['/users'],
        queryFn: () =>
            axiosSecure.get(`/users`).then(({ data }) => data.result),
        enabled: !loading
    });

    console.log(users);


    const district = districts.find((dis) => dis.value === userData?.district_id);

    const upazila = upazilas.find((upa) => upa.value === userData?.upazila_id);

    const handleUpdateStatus = (email, status, role) => {
        console.log(email, status, role);

        const updateData = {
            status: !status,
            role: role
        }

        axiosSecure.patch(`/admin/users/${email}`, updateData)
            .then(result => {
                console.log(result);
                if (result?.data?.result.modifiedCount > 0) {
                    toast.success("Status Updated Successfully")
                    refetch();
                }
            })
            .catch(error => console.log(error))
    }

    const handleUpdateRole = (email, role, status) => {
        console.log(email, role, status);

        const updateData = {
            status: status,
            role: "admin"
        }

        axiosSecure.patch(`/admin/users/${email}`, updateData)
            .then(result => {
                console.log(result);
                if (result?.data?.result.modifiedCount > 0) {
                    toast.success("Role Updated Successfully")
                    refetch();
                }
            })
            .catch(error => console.log(error))

    }

    if (isLoading) <Spinner></Spinner>


    return (
        <div>
            <SectionTitle title="All Users"></SectionTitle>

            <div className="w-11/12 mx-auto border-y-4 border-teal-600 my-10 -mt-12 overflow-scroll">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead className="text-lg">
                        <tr className="text-center">
                            <th> # </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Status </th>
                            <th> Role </th>
                            <th> Details </th>
                        </tr>
                    </thead>


                    <tbody className="text-center">
                        {users?.map((el, idx) => (
                            <tr key={el?._id} className="text-lg">
                                <th>
                                    {idx + 1}
                                </th>
                                <td className="w-auto text-center">
                                    <div className="flex items-center gap-3 w-auto text-center">

                                        <div>
                                            <span className="font-bold">{el?.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-auto mx-auto text-left">
                                    <div>{el?.email}</div>
                                </td>
                                <td className="w-auto mx-auto text-center">
                                    {
                                        el?.status ?
                                            <button onClick={() => handleUpdateStatus(el?.email, el?.status, el?.role)}
                                                className="btn btn-ghost text-green-500 text-xl px-2 tooltip marker:tooltip-top" data-tip="Click to change status">
                                                Active
                                            </button>
                                            :
                                            <button onClick={() => handleUpdateStatus(el?.email, el?.status, el?.role)}
                                                className="btn btn-ghost text-red-500 text-xl px-2 tooltip marker:tooltip-top" data-tip="Click to change status">
                                                Block
                                            </button>
                                    }
                                </td>
                                <td className="w-auto mx-auto text-center">
                                    <button onClick={() => handleUpdateRole(el?.email, el?.role, el?.status)} disabled={el?.role === 'admin'}
                                        className="btn btn-ghost btn-lg text-teal-500 px-2 tooltip marker:tooltip-top" data-tip="Click to make ADMIN">
                                        <FaUserTie></FaUserTie>
                                    </button>
                                </td>
                                <td className="w-fit mx-auto text-center">
                                    <button
                                        className="btn bg-teal-600 hover:bg-teal-800 text-white text-lg block w-full whitespace-nowrap"
                                        onClick={() => {
                                            setUserData(el);
                                            document.getElementById("my_modal_3").showModal();
                                        }}
                                    >
                                        See Details
                                    </button>

                                    {/* modal starts here */}
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box w-10/12 max-w-2xl text-left">
                                            <form method="dialog">
                                                <button
                                                    onClick={() => {
                                                        setUserData(null);
                                                        document.getElementById("my_modal_3").close();
                                                    }}
                                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                >
                                                    ✕
                                                </button>
                                            </form>
                                            <h3 className="font-bold text-3xl px-4 text-center">
                                                User Information
                                            </h3>
                                            <div className="avatar flex justify-start p-4">
                                                <div className="w-24 rounded ">
                                                    <img src={userData?.avatar} />
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-2xl px-4 text-left">
                                                {userData?.name}
                                            </h3>
                                            <div className="pl-4 mt-6">
                                                <p className="py-2 text-lg font-semibold">
                                                    Email Address : {userData?.email}
                                                </p>
                                                <p className="py-2 text-lg font-semibold">
                                                    Blood Group : {userData?.blood_group || "N/A"}
                                                </p>
                                                <p className="py-2 text-lg font-semibold">
                                                    District : {district?.label || "N/A"}
                                                </p>
                                                <p className="py-2 text-lg font-semibold">
                                                    Upazila : {upazila?.label || "N/A"}
                                                </p>
                                                <p className="py-2 text-lg font-semibold">
                                                    Status :{" "}
                                                    {userData?.status === true ? "Active" : "Blocked"}
                                                </p>
                                                <p className="py-2 text-lg font-semibold capitalize">
                                                    Role :{" "}
                                                    {userData?.role === "admin" ? userData?.role : "User"}
                                                </p>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AllUsers;