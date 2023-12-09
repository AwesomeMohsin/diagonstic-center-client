import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: () => axiosSecure.get(`/users/admin/${user?.email}`).then(({data}) => data)

    })


    return [isAdmin?.admin, isAdminLoading]

};

export default useAdmin;