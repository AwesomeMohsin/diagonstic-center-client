import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import FeaturedTests from "../Services/FeaturedTest/FeaturedTests";
import Recommendations from "./Recommendations/Recommendations";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Awesome | Home</title>
            </Helmet>

            <Banner></Banner>

            <FeaturedTests></FeaturedTests>




            <Recommendations></Recommendations>

        </div>
    );
};

export default Home;