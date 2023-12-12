import SectionTitle from "../../../components/SectionTitle";
import FeaturedCard from "../../../components/FeaturedCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const FeaturedTests = () => {

    const date = new Date();
    const today = format(date, "dd-MM-yyyy");
    

    const axiosPublic = useAxiosPublic();

    const { data } = useQuery({
        queryKey: ['/tests'],
        queryFn: () =>
            axiosPublic.get(`/tests`).then(({ data }) => data.result),
    });


    return (
        <div className="max-w-7xl mx-auto">
            <SectionTitle title="Featured Tests"></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up"
                    data-aos-delay="500">

                {
                    data?.slice(5, 9)?.map(featuredTest => <FeaturedCard
                        key={featuredTest._id}
                        today={today}
                        featuredTest={featuredTest}
                    ></FeaturedCard>)
                }

            </div>

        </div>
    );
};

export default FeaturedTests;