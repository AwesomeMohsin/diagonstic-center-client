import Carousel from "react-multi-carousel";
import SectionTitle from "../../../components/SectionTitle";
import RecommendationsCard from "./RecommendationsCard";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Recommendations = () => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1023, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
        },
    };

    // const [recommendations, setRecommendations] = useState([])

    const axiosPublic = useAxiosPublic();

    const { data: recommendations, isLoading } = useQuery({
        queryKey: ['/recommendations'],
        queryFn: () =>
        axiosPublic.get(`/recommendations`).then(({ data }) => data?.result),
    });

    if (isLoading) {
        return <Spinner></Spinner>
    }


    // useEffect(() => {
    //     fetch('recommendations.json')
    //         .then(res => res.json())
    //         .then(data => setRecommendations(data))

    // }, [])


    return (
        <div
            className="py-20"
            data-aos="fade-up" data-aos-delay="1000"


        >
            <SectionTitle title='Recommendations'></SectionTitle>

            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
            >
                {/* {
                reviews.map(review => <Reviews
                    review={review}
                    key={review.id}
                    eventName={review.eventName}
                    description={review.description}
                    name={review.name}
                ></Reviews>)
            } */}

                {
                    recommendations?.map(recommendation => <RecommendationsCard
                        key={recommendation.id}
                        recommendation={recommendation}
                    ></RecommendationsCard>)
                }

            </Carousel>

        </div>
    );
};

export default Recommendations;