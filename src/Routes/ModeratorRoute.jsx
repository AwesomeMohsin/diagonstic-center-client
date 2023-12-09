/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";

const ModeratorRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isModeratorLoading || isAdminLoading) {
        return <div className="flex justify-center items-center mt-48 md:mt-80">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    }

    if (user && isModerator || isAdmin) {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default ModeratorRoute;