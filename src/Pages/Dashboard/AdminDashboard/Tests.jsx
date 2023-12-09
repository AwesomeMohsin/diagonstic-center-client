import { FaCalendarCheck, FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useState } from "react";
import { format } from "date-fns";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Tests = () => {
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [selectedSlug, setSelectedSlug] = useState("");
    const [selectedReservations, setSelectedReservations] = useState();

    console.log(selectedReservations);



    const date = new Date();
    const today = format(date, "dd-MM-yyyy");

    const {
        data: tests,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["tests"],
        queryFn: () => axiosSecure.get("/tests").then(({ data }) => data.result),

    });

    console.log(tests);

    const { data: test, isLoading: testIsLoading } = useQuery({
        queryKey: ["tests", selectedSlug, today],
        queryFn: () =>
            axiosSecure.get(`/tests/${selectedSlug}/${today}`)
                .then(({ data }) => data.result),
        enabled: selectedSlug.length > 0 ? true : false,
    });


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            formik.setFieldValue("image", file);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            image: "",
            description: "",
            price: "",
            promo_code: "",
            discount_percent: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                if (values.image) {
                    const imageFile = { image: values.image };

                    const uploadImagePromise = axiosPublic.post(image_hosting_api, imageFile, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    });

                    const [imageUploadResult] = await Promise.all([uploadImagePromise]);

                    if (imageUploadResult.data.success) {
                        values.image = imageUploadResult.data.data.display_url;
                    } else {
                        console.error("Image upload failed:", imageUploadResult.data.error);
                        return;
                    }
                }

                const payload = {
                    title: values.title || test?.title,
                    slug: values.title.toLowerCase().split(" ").join("-") || test?.slug,
                    image: values.image || test?.image,
                    description: values.description || test?.description,
                    price: values.price || test?.price,
                    promo_code: values.promo_code || test?.promo_code,
                    discount_percent: values.discount_percent || test?.discount_percent,
                };

                const { data } = await axiosSecure.patch(`/admin/tests/${selectedSlug}`, payload);

                if (data.result.modifiedCount) {
                    formik.resetForm();
                    refetch();
                    document.getElementById("my_modal_3").close();
                    setSelectedSlug("");
                    toast.success("Test updated successfully!");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (loading || isLoading) {
        return <Spinner />;
    }

    const deleteTest = (slug) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/admin/tests/${slug}`).then(({ data }) => {

                    if (data?.result?.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Test has been deleted.",
                            icon: "success"
                        });
                        refetch();
                        toast.success("Test deleted successful");
                    }
                });
            }
        });
    };

    return (
        <div>
            <SectionTitle title="All Tests"></SectionTitle>

            <div className="w-11/12 mx-auto border-y-4 border-teal-600 my-10 overflow-x-scroll lg:overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-lg">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Image</th>
                            <th>Test Name</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Reservations</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests?.map((el, idx) => (
                            <tr key={el?._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={el?.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-lg font-semibold text-center">
                                    {el?.title}
                                </td>
                                <td className="text-lg font-semibold text-center">
                                    ${el?.price}
                                </td>
                                <td className="text-lg font-semibold text-center">
                                    {el?.discount_percent}%
                                </td>

                                <td className="text-lg font-semibold text-center">
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => {
                                                setSelectedReservations(el?.reservations);
                                                document.getElementById("my_modal_1").showModal();
                                            }}
                                            className="btn btn-ghost btn-sm text-2xl"
                                        >
                                            <FaCalendarCheck className="text-teal-600"></FaCalendarCheck>
                                        </button>

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <button
                                                    onClick={() => {
                                                        document.getElementById("my_modal_1").close();

                                                    }}
                                                    type="button"
                                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                >
                                                    ✕
                                                </button>
                                                <h3 className="font-bold text-2xl text-teal-500  pb-6">Reservations</h3>

                                                {
                                                    selectedReservations?.map((res, idx) =>
                                                        <div key={res?._id} className="grid mb-4">

                                                            <div className="border text-base rounded-lg shadow-lg">
                                                                <p>({idx + 1})</p>
                                                                <p>User: {res?.user_email}</p>
                                                                <p>Date: {res?.booking_date}</p>
                                                                <p>Slot: {res?.booking_slot}</p>
                                                            </div>

                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </dialog>

                                    </div>
                                </td>






                                <th>
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => {
                                                setSelectedSlug(el?.slug);
                                                document.getElementById("my_modal_3").showModal();
                                            }}
                                            className="btn btn-ghost btn-sm text-2xl"
                                        >
                                            <FaEdit className="text-teal-600"></FaEdit>
                                        </button>
                                        {/* modal starts here */}
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box lg:w-10/12 lg:max-w-2xl bg-teal-100">
                                                <button
                                                    onClick={() => {
                                                        document.getElementById("my_modal_3").close();
                                                        setSelectedSlug("");
                                                    }}
                                                    type="button"
                                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                >
                                                    ✕
                                                </button>

                                                {testIsLoading ? (
                                                    <Spinner />
                                                ) : (
                                                    <form onSubmit={formik.handleSubmit} method="dialog">
                                                        <h3 className="font-bold text-3xl px-4 text-center">
                                                            Update Test
                                                        </h3>
                                                        <div className="space-y-6 lg:p-10 mt-10 lg:mt-0">
                                                            <div className="md:flex lg:justify-between md:gap-5">
                                                                <div className="flex-1">
                                                                    <p className="font-semibold pb-2">
                                                                        Test Title
                                                                    </p>
                                                                    <input
                                                                        value={formik.values.title}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        size="lg"
                                                                        name="title"
                                                                        placeholder="Test Title"
                                                                        className="p-2 rounded-md input input-bordered w-full"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* price & image */}
                                                            <div className="md:flex lg:justify-between md:gap-5">
                                                                <div className="flex-1">
                                                                    <p className="font-semibold pb-2"> Price </p>
                                                                    <input
                                                                        value={formik.values.price}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        size="lg"
                                                                        type="number"
                                                                        name="price"
                                                                        placeholder="price"
                                                                        className="p-2 rounded-md input input-bordered w-full"
                                                                    />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <p className="font-semibold pb-2 pt-3 md:pt-0">
                                                                        Image
                                                                    </p>
                                                                    <input
                                                                        type="file"
                                                                        name="image"
                                                                        onChange={handleFileUpload}
                                                                        className="file-input rounded-md file-input-teal-500 file-input-bordered file-input-md w-full"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* discount and promo code */}
                                                            <div className="md:flex lg:justify-between md:gap-5">
                                                                <div className="flex-1">
                                                                    <p className="font-semibold pb-2">
                                                                        Discount Percent
                                                                    </p>
                                                                    <input
                                                                        value={formik.values.discount_percent}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        size="lg"
                                                                        type="number"
                                                                        name="discount_percent"
                                                                        placeholder="discount percent"
                                                                        className="p-2 rounded-md input input-bordered w-full"
                                                                    />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <p className="font-semibold pb-2 pt-3 md:pt-0">
                                                                        Promo Code
                                                                    </p>
                                                                    <input
                                                                        value={formik.values.promo_code}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        size="lg"
                                                                        name="promo_code"
                                                                        placeholder="promo code"
                                                                        className="p-2 rounded-md input input-bordered w-full"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* description */}
                                                            <div className="md:flex lg:justify-between md:gap-5">
                                                                <div className="flex-1">
                                                                    <p className="font-semibold pb-2">
                                                                        Description
                                                                    </p>
                                                                    <textarea
                                                                        value={formik.values.description}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        name="description"
                                                                        placeholder="description"
                                                                        className="textarea textarea-bordered textarea-lg w-full"
                                                                    ></textarea>
                                                                </div>
                                                            </div>

                                                            <button
                                                                type="submit"
                                                                disabled={formik.isSubmitting}
                                                                className="btn w-full bg-teal-500 text-white hover:bg-teal-600 text-lg"
                                                            >
                                                                {formik.isSubmitting && (
                                                                    <span className="loading loading-spinner"></span>
                                                                )}
                                                                Edit Test
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        </dialog>
                                        <button
                                            onClick={() => deleteTest(el?.slug)}
                                            className="btn btn-ghost btn-sm text-xl text-red-600"
                                        >
                                            <FaTrash></FaTrash>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tests;