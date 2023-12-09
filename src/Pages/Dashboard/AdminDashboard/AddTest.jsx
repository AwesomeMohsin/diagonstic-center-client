import { useFormik } from "formik";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const initialValues = {
    title: "",
    slug: "",
    image: "",
    description: "",
    price: "",
    promo_code: "",
    discount_percent: "",
    available_slots: 10,
    slots: [
        "10.00 AM - 10.30 AM",
        "10.30 AM - 11.00 AM",
        "11.00 AM - 11.30 AM",
        "11.30 AM - 12.00 PM",
        "12.00 PM - 12.30 PM",
        "12.30 PM - 01.00 PM",
        "02.00 PM - 02.30 PM",
        "02.30 PM - 03.00 PM",
        "03.00 PM - 03.30 PM",
        "03.30 PM - 04.00 PM"
    ]
};

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const AddTest = () => {

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
                    slug,
                    image,
                    description,
                    price,
                    promo_code,
                    discount_percent,
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
                    const testInfo = {
                        title: values.title,
                        slug: values.slug,
                        image: imageUploadResult.data.data.display_url,
                        description: values.description,
                        price: values.price,
                        promo_code: values.promo_code,
                        discount_percent: values.discount_percent,
                        slots: [
                            "10.00 AM - 10.30 AM",
                            "10.30 AM - 11.00 AM",
                            "11.00 AM - 11.30 AM",
                            "11.30 AM - 12.00 PM",
                            "12.00 PM - 12.30 PM",
                            "12.30 PM - 01.00 PM",
                            "02.00 PM - 02.30 PM",
                            "02.30 PM - 03.00 PM",
                            "03.00 PM - 03.30 PM",
                            "03.30 PM - 04.00 PM"
                        ]

                    }

                    console.log(testInfo);

                    const { data } = await axiosSecure.post("/tests", testInfo);

                    formik.resetForm();

                    if (data.result.insertedId) {
                        toast.success("Test added successfully!");
                        navigate('/dashboard/tests');

                        window.location.reload();
                    }
                }
            }
            catch (error) {
                console.error(error);
            } finally {
                console.log('Test added');
            }
        },
    });

    return (
        <div>
            <SectionTitle
                title="Add a new Test"
            />

            <form onSubmit={formik.handleSubmit} className="space-y-6 p-10">

                <div className="md:flex lg:justify-between md:gap-5">
                    <div className="flex-1">
                        <p className="font-semibold pb-2">Test Title</p>
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
                        <p className="font-semibold pb-2 pt-3 md:pt-0">Slug</p>
                        <input
                            value={formik.values.slug}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            size="lg"
                            name="slug"
                            placeholder="slug"
                            className="p-2 rounded input input-bordered w-full"
                        />
                    </div>
                </div>



                {/* price & image */}
                <div className="md:flex lg:justify-between md:gap-5">

                    <div className="flex-1">
                        <p className="font-semibold pb-2"> Price </p>
                        <input
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            size="lg"
                            type="number"
                            name="price"
                            placeholder="price"
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

                
                {/* discount and promo code */}
                <div className="md:flex lg:justify-between md:gap-5">
                    <div className="flex-1">
                        <p className="font-semibold pb-2">Discount Percent</p>
                        <input
                            value={formik.values.discount_percent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            size="lg"
                            type="number"
                            name="discount_percent"
                            placeholder="discount percent"
                            className="p-2 rounded input input-bordered w-full"
                        />
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold pb-2 pt-3 md:pt-0">Promo Code</p>
                        <input
                            value={formik.values.promo_code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            size="lg"
                            name="promo_code"
                            placeholder="promo code"
                            className="p-2 rounded input input-bordered w-full"
                        />
                    </div>
                </div>

              

                {/* description */}
                <div className="md:flex lg:justify-between md:gap-5">

                    <div className="flex-1">
                        <p className="font-semibold pb-2">Description</p>
                        <textarea required
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="description"
                            placeholder="description"
                            className="textarea shadow-xl textarea-bordered textarea-lg w-full" ></textarea>

                    </div>

                </div>



                <button
                    type="submit"
                    className="btn w-full bg-teal-600 text-white hover:bg-teal-800 text-lg"
                >
                    Add Test
                </button>
            </form>
        </div>
    );
};

export default AddTest;
