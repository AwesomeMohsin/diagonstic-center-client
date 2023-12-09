import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
    
    const axiosPublic = useAxiosPublic()
    const { user, loading } = useAuth()
    const { data: isUser, isLoading: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: () => axiosPublic.get(`/users/${user?.email}`).then(({data}) => data.result),
        enabled: !loading
    })

    console.log(isUser);

    return [isUser, isUserLoading]

};

export default useUser;