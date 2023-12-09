import { useFormik } from "formik";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const initialValues = {
  title: "",
  coupon: "",
  image: "",
  discount_rate: "",
  banner_text: "",
};

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const AddBanner = () => {

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()


  const handleFileUpload = (e) => {

    const file = e.target.files[0];
    console.log(file);
    if (file) {
      formik.setFieldValue("image", file);
    }

  };


  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const {
          title,
          coupon,
          discount_rate,
          image,
          banner_text,
        } = values;

      
        const imageFile = { image: image };

        // Upload image
        const uploadImagePromise = axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });


        // Wait for all promises to resolve
        const [imageUploadResult] = await Promise.all([
          uploadImagePromise,
        ]);

        console.log(imageUploadResult);
        
        // Check if image upload was successful
        if (imageUploadResult.data.success) {

          // create banner entry in the database
          const bannerInfo = {
            title: values.title,
            coupon: values.coupon,
            image: imageUploadResult.data.data.display_url,
            discount_rate: values.discount_rate,
            banner_text: values.banner_text,

          }


          const { data } = await axiosSecure.post("/banners", bannerInfo);

          formik.resetForm();

          if (data.result.insertedId) {
            toast.success("Banner successfully!");
            navigate('/dashboard/banners');

            window.location.reload();
          }
        }
      }
      catch (error) {
        console.error(error);
      } finally {
        console.log('Banner added');
      }
    },
  });




  return (
    <div>
      <SectionTitle
        title="Add Banner"
      />

      <form onSubmit={formik.handleSubmit} className="space-y-6 p-10">
        <div className="md:flex lg:justify-between md:gap-5">
          <div className="flex-1">
            <p className="font-semibold pb-2">Banner Title</p>
            <input
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="lg"
              name="title"
              placeholder="Test Title"
              className="p-2 rounded input input-bordered w-full"
            />
          </div>

          <div className="flex-1">
            <p className="font-semibold pb-2 pt-3 md:pt-0">Coupon Code</p>
            <input
              value={formik.values.coupon}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="lg"
              name="coupon"
              placeholder="coupon"
              className="p-2 rounded input input-bordered w-full"
            />
          </div>
        </div>



        {/* discount & image */}
        <div className="md:flex lg:justify-between md:gap-5">

          <div className="flex-1">
            <p className="font-semibold pb-2"> Discount </p>
            <input
              value={formik.values.discount_rate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="lg"
              type="number"
              name="discount_rate"
              placeholder="discount rate"
              className="p-2 rounded input input-bordered w-full"
            />
          </div>

          <div className="flex-1">
            <p className="font-semibold pb-2 pt-3 md:pt-0">Image</p>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              className="file-input rounded file-input-accent file-input-bordered file-input-md w-full"
            />
          </div>
        </div>

        <div className="md:flex lg:justify-between md:gap-5">

          <div className="flex-1">
            <p className="font-semibold pb-2">Banner Text</p>
            <textarea required
              value={formik.values.banner_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="banner_text"
              placeholder="banner text"
              className="textarea shadow-xl textarea-bordered textarea-lg w-full" ></textarea>

          </div>

        </div>



        <button
          type="submit"
          className="btn w-full bg-teal-600 text-white hover:bg-teal-800 text-lg"
        >
          Add Banner
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
