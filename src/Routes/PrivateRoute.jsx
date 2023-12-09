import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center mt-48 md:mt-80">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }}></Navigate>
    }


    return children;
};

export default PrivateRoute;