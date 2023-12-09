import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa6";
import SectionTitle from "../../components/SectionTitle";

const Reviews = () => {
  return (
    <div className="pb-20">
      <SectionTitle title="What our Client say"></SectionTitle>

      <div className=" mx-auto  grid grid-cols-1 xl:grid-cols-2 justify-center">
        <div className="md:flex items-center  bg-teal-100 w-9/12 mx-auto shadow-xl mt-8 rounded-t-full gap-6 md:rounded-l-full rounded-r-xl">
          <figure className="w-72 flex justify-center items-center mx-auto">
            <img src="https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg"  className="w-72 h-72 rounded-full" />
          </figure>
          <div className="flex-1 pt-8 pr-8 pl-8 pb-4">
            <div className="flex gap-2 text-3xl text-yellow-400 my-4">
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <h2 className="card-title">
              <FaQuoteLeft className="text-3xl my-3 text-gray-400" />
            </h2>
            <p>
            Impressed with the diagnostic centers professionalism and friendly staff. State-of-the-art facilities and expert knowledge ensure reliable test results. Highly recommended!
            </p>
            <h2 className="card-title flex justify-end pr-5">
              <FaQuoteRight className="text-3xl text-right my-3 text-gray-400" />
            </h2>
          </div>
        </div>

        <div className="md:flex flex-row-reverse items-center  bg-teal-100 w-9/12 mx-auto shadow-xl mt-8 rounded-t-full gap-6 md:rounded-l-full rounded-r-xl">
          <figure className="w-72 flex justify-center items-center mx-auto">
            <img src="https://etimg.etb2bimg.com/photo/97132390.cms"  className="w-72 h-72 rounded-full" />
          </figure>
          <div className="flex-1 pt-8 pr-8 pl-8 pb-4">
            <div className="flex gap-2 text-3xl text-yellow-400 my-4">
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <h2 className="card-title">
              <FaQuoteLeft className="text-3xl my-3 text-gray-400" />
            </h2>
            <p>
            Seamless online scheduling, quick results delivery, and a commitment to accuracy. An efficient and stress-free experience—will choose them for future diagnostics.
            </p>
            <h2 className="card-title flex justify-end pr-5">
              <FaQuoteRight className="text-3xl text-right my-3 text-gray-400" />
            </h2>
          </div>
        </div>

        <div className="md:flex items-center  bg-teal-100 w-9/12 mx-auto shadow-xl mt-8 rounded-t-full gap-6 md:rounded-l-full rounded-r-xl">
          <figure className="w-72 flex justify-center items-center mx-auto">
            <img src="https://polsinelli.gjassets.com/content/uploads/2022/02/tanwar_p_ptanw_thumb-default-headshot-closeup-headshot-photo-15591.jpg" className="w-72 h-72 rounded-full" />
          </figure>
          <div className="flex-1 pt-8 pr-8 pl-8 pb-4">
            <div className="flex gap-2 text-3xl text-yellow-400 my-4">
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <h2 className="card-title">
              <FaQuoteLeft className="text-3xl my-3 text-gray-400" />
            </h2>
            <p>
            A comforting environment with compassionate staff. They make the diagnostic process easy and reassuring. Highly appreciate their care.
            </p>
            <h2 className="card-title flex justify-end pr-5">
              <FaQuoteRight className="text-3xl text-right my-3 text-gray-400" />
            </h2>
          </div>
        </div>

        <div className="md:flex  flex-row-reverse items-center  bg-teal-100 w-9/12 mx-auto shadow-xl mt-8 rounded-t-full gap-6 md:rounded-l-full rounded-r-xl">
          <figure className="w-72 flex justify-center items-center mx-auto">
            <img src="https://www.wikibiodata.com/wp-content/uploads/2021/04/Prithvi-Tanwar.jpg"  className="w-72 h-72 rounded-full" />
          </figure>
          <div className="flex-1 pt-8 pr-8 pl-8 pb-4">
            <div className="flex gap-2 text-3xl text-yellow-400 my-4">
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <h2 className="card-title">
              <FaQuoteLeft className="text-3xl my-3 text-gray-400" />
            </h2>
            <p>
            Transparent communication, extensive test options, and a user-friendly website. A reliable choice for diagnostics with a focus on clarity and comprehensive testing.
            </p>
            <h2 className="card-title flex justify-end pr-5">
              <FaQuoteRight className="text-3xl text-right my-3 text-gray-400" />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
