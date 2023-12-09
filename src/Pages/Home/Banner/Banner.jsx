import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Banner = () => {

    const axiosPublic = useAxiosPublic();

    const { data: banners, isLoading, refetch } = useQuery({
        queryKey: ['/banners'],
        queryFn: () =>
        axiosPublic.get(`/banners`).then(({ data }) => data.result),
    });

    if (isLoading) <Spinner></Spinner>

    const activeBanner = banners?.find(banner => banner.isActive === true);

    





    return (
        <div className="hero h-[500px] mb-10" style={{ backgroundImage: `url('${activeBanner?.image}')`}}>

            <div className="hero-overlay bg-opacity-20 "></div>
            <div className="hero-content text-center mr-3.5 mx-auto text-white">


                <div className="w-11/12 md:w-3/4 space-y-6">
                    <h1 className="mb-5 
                        text-4xl md:text-5xl lg:text-7xl font-fontTitle font-bold ">{activeBanner?.title}</h1>

                    <p className="font-fontTitle text-xl md:text-3xl pt-6">{activeBanner?.text}</p>

                    <div>
                        <p className="font-fontTitle text-xl md:text-3xl pt-6">Get {activeBanner?.discount_rate}% Discount with code: <span className="font-bold text-teal-400 mb-4">{activeBanner?.coupon}</span></p>
                        <Link to='/all-tests'><button className="btn btn-outline text-white mt-4">Check All Tests</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;