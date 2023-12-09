/* eslint-disable react/prop-types */

const RecommendationsCard = ({ recommendation }) => {

    const {title, description, doctor} = recommendation


    return (
        <div className="bg-teal-100 rounded-3xl w-11/12 mx-auto">
            <div className="shadow-lg rounded-3xl text-center space-y-10 py-20 border ">
                <h4 className="text-lg md:text-2xl">{title}</h4>

                <h2 className="text-2xl md:text-4xl xl:text-6xl font-fontTitle w-11/12 mx-auto py-10">{description}</h2>

                <h4 className=" text-lg md:text-xl">{doctor}</h4>

            </div>
        </div>
    );
};

export default RecommendationsCard;