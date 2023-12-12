import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import FeaturedTests from "../Services/FeaturedTest/FeaturedTests";
import Recommendations from "./Recommendations/Recommendations";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import ScrollToTop from "../../components/ScrollToTop";
// ..
AOS.init();

const Home = () => {
    return (
        <div>
              <ScrollToTop />
            <Helmet>
                <title>Awesome | Home</title>
            </Helmet>

           
           
            <div id="services-container" className="" data-aos="fade-up"
                    data-aos-delay="500"
                >
                     <Banner></Banner>
                </div>

            <div id="services-container" className="py-20" data-aos="fade-up"
                    data-aos-delay="1000"
                >
                    <FeaturedTests></FeaturedTests>
                </div>
            




            <Recommendations></Recommendations>
          
        </div>
    );
};

export default Home;