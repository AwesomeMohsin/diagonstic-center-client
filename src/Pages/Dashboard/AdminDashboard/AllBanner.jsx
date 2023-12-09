import { FaChalkboardTeacher, FaTrash, FaUserTie } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllBanner = () => {



  const axiosSecure = useAxiosSecure();

  const { data: banners, isLoading, refetch } = useQuery({
    queryKey: ['/banners'],
    queryFn: () =>
      axiosSecure.get(`/banners`).then(({ data }) => data.result),
  });

  console.log(banners);


  const handleUpdateBanner = (id) => {
    console.log(id);

    const updateData = {
  
    }

    axiosSecure.patch(`/banners/${id}`, updateData)
      .then(result => {
        console.log(result);
        if (result?.data?.result.modifiedCount > 0) {
          toast.success("Banner status Updated Successfully")
          refetch();
        }
      })
      .catch(error => console.log(error))


  }


  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

      if (result.isConfirmed) {

        axiosSecure.delete(`/banners/${id}`)
          .then(result => {

            console.log(result);

            if (result?.data?.result?.deletedCount === 1) {
              Swal.fire({
                title: "Deleted!",
                text: "Banner has been deleted.",
                icon: "success"
              });
              refetch();
            }
          })
          .catch(error => console.log(error))
      }
    });

  }


  return (
    <div>
      <SectionTitle
        title="All Banner"
      />

      <div className="mx-auto border-y-4 border-blue-600 my-10">
        <table className="table">
          {/* head */}
          <thead className="text-lg text-center">
            <tr>
              <th></th>
              <th>Image</th>
              <th>Banner Title</th>
              <th>isActive</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">

            {
              banners?.map(
                ({ _id, title, image, isActive }, index) => {
                  const isLast = index === banners?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (<>
                    <tr key={_id}>
                      <th>
                        {index + 1}
                      </th>

                      <td className={classes}>
                        <div className="flex items-center gap-3 justify-center">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div></td>
                      <td className={classes}>{title}</td>
                      <td className={classes} >
                        {
                          isActive ?
                            <button onClick={() => handleUpdateBanner(_id)}
                              disabled={isActive === true}
                              className="btn btn-ghost text-green-500 text-xl px-2 tooltip marker:tooltip-top" data-tip="Click to change status">
                              Active
                            </button>
                            :
                            <button onClick={() => handleUpdateBanner(_id)}
                              
                              className="btn btn-ghost text-red-500 text-xl px-2 tooltip marker:tooltip-top" data-tip="Click to change status">
                              Not Active
                            </button>
                        }
                      </td>

                      <th>
                        <button
                          onClick={() => handleDelete(_id)}
                          disabled={isActive === true}
                          className="btn btn-ghost btn-lg text-red-500 px-3">
                          <FaTrash></FaTrash>
                        </button>
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

export default AllBanner;
