// import { FaBook, FaCalendarAlt, FaCalendarCheck, FaEnvelope, FaHome, FaList, FaShoppingBasket, FaShoppingCart, FaStar, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";

import { FaCalendarAlt, FaCalendarCheck, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GrDocumentTest, GrTest, GrTestDesktop } from "react-icons/gr";
import { MdAddPhotoAlternate } from "react-icons/md";

import { IoMdPhotos } from "react-icons/io";


import { NavLink, Outlet, useNavigate } from "react-router-dom";


import useAdmin from "../hooks/useAdmin";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";
import useUser from "../hooks/useUser";



const Dashboard = () => {


    // TODO get isAdmin value from the database
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isUser, isUserLoading] = useUser();
    const navigate = useNavigate()


    if(isUserLoading) <Spinner></Spinner>


    if (isUser?.status === false) {
        navigate('/');
    }

    console.log(isAdmin);

    isAdminLoading && <Spinner></Spinner>


    return (
        <div className="flex max-w-7xl mx-auto">

            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen bg-teal-600">

                <div className="py-10">
                    <h4 className="text-2xl text-center">Awesome Diagnostic </h4>
                    <h2 className="text-center text-xl">Center</h2>
                    <div className="divider"></div>

                </div>

                <ul className="menu p-4 space-y-2">

                    {
                        
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/users' className="text-lg">
                                        <FaUsers className="text-xl"></FaUsers>
                                        All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/add-test' className="text-lg">
                                        <GrTest className="text-xl"></GrTest>
                                        Add a Test
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/tests' className="text-lg">
                                        <GrTestDesktop className="text-xl"></GrTestDesktop>
                                        All Tests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservations' className="text-lg">
                                        <FaCalendarAlt  className="text-xl"></FaCalendarAlt>
                                        Reservations
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/add-banner' className="text-lg">
                                        <MdAddPhotoAlternate className="text-xl"></MdAddPhotoAlternate>
                                        Add banner

                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/banners' className="text-lg">
                                        <IoMdPhotos className="text-xl"></IoMdPhotos>
                                        All Banners
                                    </NavLink>
                                </li>
                            </>

                            :

                            <>
                                
                                <li>
                                    <NavLink to='/dashboard/profile' className="text-lg">
                                        <FaUser className="text-xl"></FaUser>
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/appointments' className="text-lg">
                                        <FaCalendarCheck className="text-xl"></FaCalendarCheck>
                                        Appointments
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/test-results' className="text-lg">
                                        <GrDocumentTest className="text-xl"></GrDocumentTest>
                                        Test Results
                                    </NavLink>
                                </li>
                            </>
                    }


                    {/* shared nav links */}
                    <div className="divider"></div>

                    <li>
                        <NavLink to='/' className="text-lg">
                            <FaHome className="text-xl"></FaHome>
                            Home
                        </NavLink>
                    </li>

                </ul>

            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Dashboard;