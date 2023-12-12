import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import TestCard from "../../../components/TestCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import DatePicker from "../../../components/DatePicker";
import { format } from "date-fns";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import ScrollToTop from "../../../components/ScrollToTop";
// ..
AOS.init();

const AllTests = () => {



    const date = new Date();
    const [products, setProducts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(date);
    const today = format(selectedDate, "dd-MM-yyyy");
    const todayDate = format(selectedDate, "PP");

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1)
    const itemsPerPage = 4;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(page => page + 1);

    const axiosPublic = useAxiosPublic();

    console.log({ selectedDate });

    const { data: test, isLoading, refetch } = useQuery({
        queryKey: ['/test', today, currentPage, itemsPerPage],
        queryFn: () =>
            axiosPublic.get(`/test?page=${currentPage - 1}&size=${itemsPerPage}`).then(({ data }) => {
                data.result
                setProducts(data.result)
            }),
    });


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/testCount`)
            .then(res => res.json())
            .then(data => setCount(data.count))

    }, [])


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    if (isLoading) {
        <Spinner></Spinner>
    }


    return (
        <div className="max-w-7xl mx-auto ">
              <ScrollToTop />

            <div className="all-test-banner aspect-auto flex justify-center">

                <DatePicker
                    selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                ></DatePicker>

            </div>
            <SectionTitle title='All Tests'></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up"
                    data-aos-delay="1000">

                {
                    products?.map(test => <TestCard
                        key={test.id}
                        test={test}
                        today={today}
                        date={todayDate}
                    ></TestCard>)
                }

            </div>

            <div className='pagination'>
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'selected btn btn-outline' : 'btn btn-outline'}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                    >{page}</button>)
                }
                <button onClick={handleNextPage}>Next</button>

            </div>

        </div>
    );
};

export default AllTests;