import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>


            <Toaster></Toaster>
        </div>
    );
};

export default Main;