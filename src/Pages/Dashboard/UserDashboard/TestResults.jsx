import { FaDownload } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TestResults = () => {

    const { user } = useAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure()
    console.log(user);


    const { data: appointments, isLoading, refetch } = useQuery({
        queryKey: ['/appointments', user?.email],
        queryFn: () =>
            axiosSecure.get(`/appointments/${user?.email}`).then(({ data }) => data.result),
    });

    console.log(appointments);

    const deliveredAppointments = appointments?.filter(appointment => appointment?.status === 'delivered')

    console.log(deliveredAppointments);


    const handleDownload = (test_result) => {
        console.log(test_result);

        const link = document.createElement('a');
        link.href = test_result;
        link.download = 'test_result.pdf';
        link.click();
    }


    return (
        <div>
            <SectionTitle title="Test Results"></SectionTitle>

            <div className="w-11/12 mx-auto border-y-4 border-teal-600 my-10 -mt-12">
                <table className="table w-full overflow-x-scroll">

                    <thead className="text-lg">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Test Name</th>
                            <th> Date </th>
                            <th> Status </th>
                            <th> Download </th>
                        </tr>
                    </thead>

                    <tbody className="text-center">

                        {
                            deliveredAppointments?.map(
                                ({ _id, test_name, status, test_result, booking_date }, index) => {
                                    const isLast = index === deliveredAppointments?.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (<>
                                        <tr key={_id}>
                                            <th>
                                                {index + 1}
                                            </th>

                                            <td className={classes}>{test_name}</td>

                                            <td className={classes}>{booking_date}</td>

                                            <td className={classes}>{status}</td>
                                            <th>
                                                {
                                                    status === 'delivered' ?
                                                        <button onClick={() => handleDownload(test_result)} className="btn btn-ghost btn-lg text-teal-500">
                                                            <FaDownload></FaDownload>
                                                        </button> : <></>
                                                }
                                            </th>
                                        </tr>

                                    </>);
                                }
                            )}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default TestResults;