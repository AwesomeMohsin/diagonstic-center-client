/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const TestCard = ({ test, date, today }) => {
    


    const { image, title, price, slug, available_slots } = test;



    return (
        <div className="card  bg-base-100 shadow-xl mb-20">
            <figure className="relative"><img src={image}  />
                <div className="badge badge-outline absolute bg-teal-600 text-white p-3 border-0 top-2 right-2">$ {price}</div>

            </figure>
            <div className="card-body">
                <h2 className="card-title mx-auto pb-4 text-center">{title}</h2>
                <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-xl"></FaCalendarAlt>
                    <p>{date}</p>
                    
                </div>

                

                <div className="flex items-center gap-3">
                    <FaUsers className="text-xl"></FaUsers>
                    <p>{available_slots} Slots available</p>
                    
                </div>
                <div className="card-actions justify-center pt-4">
                    <Link to={`/tests/${slug}/${today}`}>
                        <button className="btn btn-sm flex btn-outline text-white mx-auto bg-[#0D9488]">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TestCard;