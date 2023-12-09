/* eslint-disable react/prop-types */
// import { format } from "date-fns";
import { Link } from "react-router-dom";


const FeaturedCard = ({ featuredTest, today }) => {

 
    const {image, price, title, slug, } = featuredTest

    


    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="relative p-7"><img  className="rounded-lg w-[195px] h-[165]" src={image} alt="test" />
            <div className="badge badge-outline absolute bg-teal-600 text-white border-0 top-2 right-2 px-4">$ {price}</div>

            </figure>
            <div className="card-body pt-3">
                <h2 className="card-title mx-auto text-center">{title}</h2>
                
                <div className="card-actions">
                    <Link to={`/tests/${slug}/${today}`} className="w-full">
                    <button className="btn btn-outline text-white mt-4 btn-sm w-full bg-[#0D9488]">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;