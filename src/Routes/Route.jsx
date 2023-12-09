import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Layouts/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AccountServices/Login";
import Register from "../Pages/AccountServices/Register";
import AllTests from "../Pages/Services/AllTests/AllTests";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import UserHome from "../Pages/Dashboard/UserDashboard/UserHome";
import TestDetails from "../components/TestDetails";
import Payment from "../Pages/Services/Payment/Payment";
import UpComingAppointments from "../Pages/Dashboard/UserDashboard/UpComingAppointments";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import AddTest from "../Pages/Dashboard/AdminDashboard/AddTest";
import Tests from "../Pages/Dashboard/AdminDashboard/Tests";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers";
import Reservations from "../Pages/Dashboard/AdminDashboard/Reservations";
import AddBanner from "../Pages/Dashboard/AdminDashboard/AddBanner";
import AllBanner from "../Pages/Dashboard/AdminDashboard/AllBanner";
import TestResults from "../Pages/Dashboard/UserDashboard/TestResults";
import Reviews from "../Pages/ExtraPages/Reviews";
import Blog from "../Pages/ExtraPages/Blog";
import Faq from "../Pages/ExtraPages/Faq";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/all-tests',
                element: <AllTests></AllTests>
            },
            {
                path: '/reviews',
                element: <Reviews></Reviews>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/faq',
                element: <Faq></Faq>
            },
            {
                path: '/tests/:slug/:date',
                element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/tests/${params.slug}/${params.date}`)
            }
        ]
    },
    {
        path: '/payment',
        element: <Payment></Payment>

    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // normal user routes,

            {
                path: 'user-home',
                element: <UserHome></UserHome>
            },
            {
                path: 'appointments',
                element: <UpComingAppointments></UpComingAppointments>
            },
            {
                path: 'profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'test-results',
                element: <TestResults></TestResults>
            },


            // admin routes
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'add-test',
                element: <AddTest></AddTest>
            },
            {
                path: 'tests',
                element: <Tests></Tests>
            },
            {
                path: 'reservations',
                element: <Reservations></Reservations>
            },
            {
                path: 'add-banner',
                element: <AddBanner></AddBanner>
            },
            {
                path: 'banners',
                element: <AllBanner></AllBanner>
            }


        ]
    }
]);


export default router;