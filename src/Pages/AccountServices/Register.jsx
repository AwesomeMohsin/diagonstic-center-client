import { Link, useNavigate } from "react-router-dom";
import SelectField from "../../components/SelectField.jsx";
import { blood, districts, upazilas } from "../../lib/enums/index.js";
import { useFormik } from "formik";
import navLogo from "/icons/logo.png";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import toast from "react-hot-toast";

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: "",
    blood_group: "",
    district_id: "",
    upazila_id: "",
};


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const { createUser, updateUserProfile, setLoading } = useAuth();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("avatar", file);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const {
                    name,
                    email,
                    avatar,
                    password,
                    confirm_password,
                    blood_group,
                    district_id,
                    upazila_id,
                } = values;

                // password validation
                if (password.length < 6) {
                    toast.error('Password should be at least 6 characters', {
                        duration: 5000,
                    });
                    return;
                }
                else if (!/[A-Z]/.test(password)) {
                    toast.error('Password must contain at least 1 UPPERCASE character', {
                        duration: 5000,
                    });
                    return;
                }
                // eslint-disable-next-line no-useless-escape
                else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
                    toast.error('Password must contain at least 1 special character', {
                        duration: 5000,
                    });
                    return;
                }
                else if (password !== confirm_password) {
                    toast.error('Password & Confirm password should be matched', {
                        duration: 5000,
                    });
                    return;
                }

                const imageFile = { image: avatar };

                // Upload image
                const uploadImagePromise = axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });

                // Sign up user
                const signUpPromise = createUser(email, password);

                // Wait for all promises to resolve
                const [imageUploadResult] = await Promise.all([
                    uploadImagePromise,
                    signUpPromise,
                ]);

                // Check if image upload was successful
                if (imageUploadResult.data.success) {
                    const userInfo = {
                        email: email,
                        name: name,
                        avatar: imageUploadResult.data.data.display_url,
                        blood_group: blood_group,
                        district_id: district_id,
                        upazila_id: upazila_id,
                    };

                    // Update user profile
                    await updateUserProfile(userInfo.name, userInfo.avatar);

                    // Add user to "/users"
                    const { data } = await axiosPublic.post("/users", userInfo);

                    formik.resetForm();

                    if (data.result.insertedId) {
                        toast.success("Account created successfully!");
                        navigate(from, { replace: true });

                        window.location.reload();
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
    });


    return (
        <div className="background">
            <div className="flex min-h-screen justify-center items-center max-w-7xl mx-auto px-5">
                <div className=" p-8 my-8 lg:w-8/12">
                    <Link to={"/"}>
                        <img className="w-36 mx-auto mb-4" src={navLogo} alt="" />
                    </Link>{" "}
                    <p className="text-3xl font-semibold mt-3 flex justify-center">Sign Up</p>

                    <div className="mt-6 mb-2">
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="md:flex lg:justify-between md:gap-5">
                                <div className="flex-1">
                                    <p className="font-semibold pb-2">Full Name</p>
                                    <input
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        size="lg"
                                        name="name"
                                        placeholder="Full Name"
                                        className="p-2 rounded input input-bordered w-full"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold pb-2 pt-3 md:pt-0">Email</p>
                                    <input
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        size="lg"
                                        name="email"
                                        placeholder="name@mail.com"
                                        className="p-2 rounded input input-bordered w-full"
                                    />
                                </div>
                            </div>


                            {/* district & upazila */}
                            <div className="md:flex lg:justify-between md:gap-5">
                                <div className="flex-1">
                                    <p className=" font-semibold pb-2">District</p>
                                    <SelectField
                                        name="district_id"
                                        options={districts}
                                        onChange={(selectedOption) =>
                                            formik.setFieldValue(
                                                "district_id",
                                                selectedOption ? selectedOption.value : ""
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        value={blood.find(
                                            (el) => el.value === formik.values.district_id
                                        )}
                                        isSearchable
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className=" font-semibold pb-2 pt-3 md:pt-0">Upazila</p>
                                    <SelectField
                                        name="upazila_id"
                                        options={upazilas}
                                        onChange={(selectedOption) =>
                                            formik.setFieldValue(
                                                "upazila_id",
                                                selectedOption ? selectedOption.value : ""
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        value={blood.find(
                                            (el) => el.value === formik.values.upazila_id
                                        )}
                                        isSearchable
                                    />
                                </div>
                            </div>

                            {/* blood and avatar */}
                            <div className="md:flex lg:justify-between md:gap-5">

                                <div className="flex-1">
                                    <p className="font-semibold pb-2">Blood Group</p>
                                    <SelectField
                                        name="blood_group"
                                        options={blood}
                                        onChange={(selectedOption) =>
                                            formik.setFieldValue(
                                                "blood_group",
                                                selectedOption ? selectedOption.value : ""
                                            )
                                        }
                                        onBlur={formik.handleBlur}
                                        value={blood.find(
                                            (el) => el.value === formik.values.blood_group
                                        )}
                                        isSearchable
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold pb-2 pt-3 md:pt-0">Avatar</p>
                                    <input
                                        type="file"
                                        name="avatar"
                                        onChange={handleFileUpload}
                                        className="file-input rounded file-input-accent file-input-bordered file-input-md w-full"
                                    />
                                </div>
                            </div>

                            {/* password */}
                            <div className="md:flex lg:justify-between md:gap-5">
                                <div className="flex-1">
                                    <p className="font-semibold pb-2">Password</p>
                                    <input
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="password"
                                        size="lg"
                                        name="password"
                                        placeholder="********"
                                        className="p-2 rounded input input-bordered w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold pb-2 pt-3 md:pt-0">Confirm Password</p>
                                    <input
                                        value={formik.values.confirm_password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="password"
                                        size="lg"
                                        name="confirm_password"
                                        placeholder="********"
                                        className="p-2 rounded input input-bordered w-full"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn w-full bg-teal-600 text-white hover:bg-teal-800 text-lg"
                            >
                                Sign up
                            </button>
                        </form>
                        <p className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium hover:text-blue-500 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;