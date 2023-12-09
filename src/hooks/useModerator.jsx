import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.email, 'isModerator'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res?.data?.admin; 
        }
    })

    return [isModerator, isModeratorLoading]

};

export default useModerator;