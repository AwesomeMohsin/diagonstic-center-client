import { Link, NavLink, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { FaArrowRight, FaUserTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import Spinner from "../components/Spinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {


    const { user, logOut, loading } = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    // const [isUser, isUserLoading] = useUser();

    

    const { data: isUser, isLoading: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: () => axiosPublic.get(`/users/${user?.email}`).then(({ data }) => data.result),
        enabled: !loading
      })
    

    if (isUserLoading || loading) <Spinner></Spinner>
    
    console.log(isUser);



    const handleNavigate = () => {
        if (!isUser?.status) {
            toast.error('Access denied. Your account is inactive');
            return;
        }
        navigate('/dashboard')
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log out successfully')
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const navItems =
        <div className="flex flex-col lg:flex-row gap-1">
            <li className="border rounded-lg"><NavLink to='/'><button>Home</button></NavLink></li>
            
            <li className="border rounded-lg"><NavLink to='/all-tests'><button>All Tests</button></NavLink></li>
            
            <li className="border rounded-lg"><NavLink to='/reviews'><button>Reviews</button></NavLink></li>
            <li className="border rounded-lg"><NavLink to='/blog'><button>Blog</button></NavLink></li>
            <li className="border rounded-lg"><NavLink to='/faq'><button>FAQ</button></NavLink></li>
        </div>

    return (
        <div className="navbar flex flex-col-reverse md:flex-row max-w-7xl mx-auto ">

            <div className="md:navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <img className="h-10" src="/icons/logo.png" alt="" />
                <Link to='/' className="btn btn-ghost normal-case text-xl">Awesome Diagnostic</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>


            {
                user ?
                    <div className="md:navbar-end flex flex-row gap-2 items-center">
                        <FaArrowRight></FaArrowRight>
                        <button onClick={handleNavigate} tabIndex={0}  className="btn btn-ghost btn-circle avatar tooltip tooltip-left"  data-tip={user.displayName || 'Name not available'}>
                                <Link>
                                    {
                                        user.photoURL !== null ? <img className="w-10 rounded-full " src={user.photoURL} /> : <img src="/icons/user.png" />
                                    }
                                </Link>

                        </button>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-outline text-[#808080]"><FaUserTimes className="text-xl"></FaUserTimes>Log Out</button>
                    </div>

                    :

                    <div className="md:navbar-end flex flex-row gap-2 items-center">
                        
                        <Link to='/login' className="btn btn-outline text-[#808080]">  Login</Link>
                    </div>
            }


        </div>
    );
};

export default NavBar;