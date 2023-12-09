/* eslint-disable react/no-unescaped-entities */
import { useLoaderData, useNavigate } from "react-router-dom";
import "../App.css";
import { FaBookBookmark, FaUsers } from "react-icons/fa6";
import { FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { useState } from "react";
import { calculateDiscount } from "../lib/discount";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import useUser from "../hooks/useUser";



const TestDetails = () => {

    const test = useLoaderData()

    const { image, title, price, slots, slug, available_slots, description, discount_percent, promo_code } = test.result;

    const { user } = useAuth();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const pathname = window.location.pathname.split("/");
    const date = pathname[pathname.length - 1];

    const [isUser, isUserLoading] = useUser();

    if (isUserLoading) <Spinner></Spinner>


    const [discountedPrice, setDiscountedPrice] = useState("");


    const handleDiscount = (e) => {
        e.preventDefault();
        const form = e.target;
        const code = form.code.value;
        if (code === promo_code) {
            const discountedAmount = calculateDiscount(price, discount_percent);
            console.log(discountedAmount);
            toast.success('Coupon Code Applied')
            setDiscountedPrice(discountedAmount);
            form.reset();
        }
    }

    const [selectedSlot, setSelectedSlot] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        phone: '',
    });


    const openModal = () => {


        if (!isUser?.status) {
            toast.error("Access denied. Your account is inactive")
        }

        else if (available_slots <= 0) {
            toast.error("Slots not available, Try on another date")
        }
        else if (!selectedSlot) {
            toast.error("Please select a slot")
        }

        else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
        const form = e.target;
        const phone = form.phone.value;

        const payload = {
            user_email: user?.email,
            phone,
            test_name: title,
            test_slug: slug,
            test_price: price,
            booking_slot: selectedSlot,
            booking_date: date,
        };
        console.log(payload);



        axiosSecure.post("/appointments", payload)
            .then(result => {
                console.log(result);

                if (result?.data?.result?.insertedId) {
                    toast.success(result?.data?.message);

                    

                    axiosSecure.patch(`/admin/test/${slug}`, payload)
                        .then(result => {

                            console.log(result);

                            const paymentInfo = {
                                appointment_id: result?.data?.result?.insertedId,
                                user_email: user?.email,
                                price: discountedPrice ? discountedPrice : price,
                            };


                            localStorage.setItem("appointment-info", JSON.stringify(paymentInfo));
                            navigate("/payment");
                            closeModal();

                        })
                        .catch(error => console.log(error))
                }

            })
            .catch(error => {
                if (error?.response?.status === 409) {
                    toast.error("You already have another booking at this time");
                }
            })
    };




    return (
        <div className="">
            <div className="details-banner h-auto aspect-auto">
                <div className="overlay">
                    <div className="flex justify-center items-center h-96 max-w-7xl mx-auto px-5 text-center flex-col">
                        <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold text-teal-600 uppercase">
                            {title}
                        </h1>
                        <h4 className="text-2xl pt-4 font-semibold font-fontTitle">Date: {date}</h4>
                    </div>
                </div>
            </div>

            {/* details section */}
            <div className="flex flex-col lg:flex-row  items-center gap-20 max-w-7xl mx-auto px-5 my-10 relative">
                <img className="w-11/12 lg:w-2/5" src={image} alt="" />


                <div className="w-11/12  lg:w-3/5 ">
                    <div className="flex items-center text-teal-600 gap-3 pb-4">
                        <FaMoneyBillWave className="text-2xl"></FaMoneyBillWave >
                        <span className="text-2xl font-semibold">
                            Get {discount_percent}% Discount with Code "{promo_code}"
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-8">
                        <div className="flex  items-center text-teal-600 gap-3 pb-4">
                            <FaUsers className="text-2xl"></FaUsers>
                            <span className="text-2xl font-semibold">
                                Available Slots: {available_slots}
                            </span>
                        </div>
                        <div className="flex items-center text-teal-600 gap-3 pb-4">
                            <FaWallet className="text-2xl"></FaWallet >
                            <span className="text-2xl font-semibold">
                                Price: ${price}
                            </span>
                        </div>
                    </div>
                    <div className="flex whitespace-nowrap flex-wrap pb-4 gap-3">

                        {slots?.map((slot, index) => (
                            <div key={index} className="badge badge-lg w-auto text-xl">
                                <input
                                    type="radio"
                                    id={`slot-${index}`}
                                    name="slots"
                                    value={slot}
                                    checked={selectedSlot === slot}
                                    onChange={() => setSelectedSlot(slot)}
                                />
                                <label className="pl-2" htmlFor={`slot-${index}`}>{slot}</label>
                            </div>
                        ))}

                    </div>
                    <p className="text-lg border-y py-4">
                        {description}
                    </p>

                    <button
                        onClick={openModal}
                        className="btn bg-teal-600 text-white hover:bg-teal-800 uppercase text-lg mt-4"
                    >
                        <FaBookBookmark className="text-2xl"></FaBookBookmark>
                        book appointments
                    </button>


                    <div className={`fixed inset-0 ${showModal ? '' : 'hidden'} overflow-y-auto `}>
                        <div className="flex items-center justify-center min-h-screen ">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="relative bg-white rounded-lg p-8">
                                <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={closeModal}>
                                    &times;
                                </span>
                                <div className="flex justify-between font-semibold pt-3 pb-6 px-6">
                                    <h1 className="text-3xl"> {title}</h1>
                                    <p className="text-3xl">$ {discountedPrice ? discountedPrice : price}</p>
                                </div>


                                {!discountedPrice && (

                                    <form onSubmit={handleDiscount}>

                                        <p>Coupon Code:</p>

                                        <label htmlFor="code" className=" mb-6 flex ">
                                            <input
                                                type="text"
                                                id="code"
                                                name="code"
                                                placeholder={promo_code}
                                                value={formData.code}
                                                onChange={handleChange}
                                                className="input input-bordered join-item w-full rounded"
                                            />
                                            <button type="submit" className="btn join-item rounded bg-teal-600 text-lg text-white border-0 hover:bg-teal-800">Apply</button>
                                        </label>
                                    </form>
                                )}

                                {/* phone number */}
                                <form onSubmit={handleFormSubmit}>
                                    <label htmlFor="firstName" className="block mb-2">
                                        Phone Number
                                        <input
                                            type="number"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="p-4 rounded input input-bordered w-full"
                                        />
                                    </label>


                                    <div className="flex justify-center gap-8 pt-4">
                                        <button type="button" onClick={closeModal} className="btn btn-outline hover:bg-red-600 hover:text-white border-red-600 hover:border-red-600 text-red-600 uppercase">
                                            Close
                                        </button>
                                        <button type="submit" className="btn bg-teal-600 hover:bg-teal-800 text-white uppercase">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetails;
