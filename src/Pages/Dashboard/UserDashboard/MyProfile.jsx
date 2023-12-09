import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { districts, upazilas } from "../../../lib/enums/index.js";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Spinner from "../../../components/Spinner.jsx";
import SectionTitle from "../../../components/SectionTitle.jsx";
import SelectField from "../../../components/SelectField.jsx";
import useUser from "../../../hooks/useUser.jsx";
import useAxiosPublic from "../../../hooks/useAxiosPublic.jsx";

const initialValues = {
  district_id: "",
  upazila_id: "",
};

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: () => axiosSecure.get(`/users/${user?.email}`).then(({ data }) => data),
    enabled: !loading,
  });

  const { data: isUser, isLoading: isUserLoading } = useQuery({
    queryKey: [user?.email, 'isUser'],
    queryFn: () => axiosPublic.get(`/users/${user?.email}`).then(({ data }) => data.result)

  })

  console.log(isUser?.result);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const payload = {
        district_id: values.district_id || profile?.result?.district_id,
        upazila_id: values.upazila_id || profile?.result?.upazila_id,
      };
      axiosSecure.patch(`/users/${user?.email}`, payload).then(({ data }) => {
        if (data?.result?.modifiedCount) {
          refetch();
          toast.success(data?.message);
          initialValues.district_id = "";
          initialValues.upazila_id = "";
          document.getElementById("my_modal_3").close();
        }
      });
    },
  });

  if (isLoading || loading || isUserLoading) {
    return <Spinner />;
  }

  const district = districts.find(
    (dis) => dis.value === profile?.result?.district_id
  );

  const upazila = upazilas.find(
    (upa) => upa.value === profile?.result?.upazila_id
  );

  return (
    <div className="pb-20">
      <SectionTitle
        title="My Profile"
      />

      <div className="w-9/12 mx-auto mt-8">
        <div className="avatar flex justify-center pb-4">
          <div className="w-24 rounded ">
            <img src={profile?.result?.avatar} />
          </div>
        </div>
        <h3 className="font-bold text-2xl px-4 text-center">
          {profile?.result?.name}
        </h3>
        <div className="pl-4 mt-6">
          <p className="py-2 text-lg font-semibold">
            Email Address : {profile?.result?.email}
          </p>
          <p className="py-2 text-lg font-semibold">
            Blood Group : {profile?.result?.blood_group}
          </p>
          <p className="py-2 text-lg font-semibold">
            District : {district?.label}
          </p>
          <p className="py-2 text-lg font-semibold">
            Upazila : {upazila?.label}
          </p>
          <p className="py-2 text-lg font-semibold">
            Status : {profile?.result?.status === true ? "Active" : "Blocked"}
          </p>
          <p className="py-2 text-lg font-semibold">Role : User</p>
        </div>
        <button
          className="btn flex w-full bg-teal-600 hover:bg-teal-800 text-white text-lg mt-6"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          {" "}
          <FaEdit></FaEdit>
          Edit
        </button>
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box w-10/12 max-w-2xl bg-teal-100">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-3xl px-4 text-gray-600 text-center">
              Update Your Information :
            </h3>
            <div className="avatar flex justify-center pt-6 ">
              <h3 className="font-bold text-2xl px-4 text-center text-teal-600">
                {profile?.result?.name}
              </h3>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="container flex flex-col mx-auto "
            >
              <div className="px-6 rounded-md">
                <div className="">
                  <div className="flex-1">
                    <p className=" font-semibold pb-2">District</p>
                    <SelectField
                      placeholder="Select your district"
                      name="district_id"
                      options={districts}
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "district_id",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      onBlur={formik.handleBlur}
                      value={districts.find(
                        (el) => el.value === formik.values.district_id
                      )}
                      isSearchable
                    />
                  </div>
                  <div className="flex-1 mt-2">
                    <p className=" font-semibold pb-2">Upazila</p>
                    <SelectField
                      placeholder="Select your upazila"
                      name="upazila_id"
                      options={upazilas}
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "upazila_id",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      onBlur={formik.handleBlur}
                      value={upazilas.find(
                        (el) => el.value === formik.values.upazila_id
                      )}
                      isSearchable
                    />
                  </div>
                  <div className="w-full mx-auto">
                    <button
                      type="submit"
                      className="w-full mt-5 mx-auto btn bg-teal-600 text-white text-lg hover:bg-teal-800"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyProfile;