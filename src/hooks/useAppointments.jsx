// api, axios (axios secure), tan stack

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAppointments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    console.log(user.email);
    
    const {data: appointments, refetch} = useQuery({
        queryKey: ['appointments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appointments/${user?.email}`);
            return res.data;
        }
    })    

    return [appointments, refetch]
};

export default useAppointments;