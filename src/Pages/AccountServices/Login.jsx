import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import navLogo from "/icons/logo.png";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";

const initialValues = {
    email: "",
    password: "",

};


const Login = () => {

    const { user, loginUser, setLoading } = useAuth();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const { email, password } = values;
            loginUser(email, password)
                .then((result) => {
                    toast.success("Logged in successfully")
                    console.log(result);

                })
                .catch((error) => {
                    console.log(error);
                    if (error.message === "Firebase: Error (auth/invalid-login-credentials).") {
                        toast.error('Email or password is incorrect')
                    }
                })
                .finally(() => {
                    setLoading(false)

                });

        },
    });

    useEffect(() => {
        user && navigate('/dashboard');
    }, [user, navigate])

    return (
        <div className="background">
            <div className="flex min-h-screen justify-center items-center max-w-7xl mx-auto px-5">
                <div className=" p-8 my-8 lg:w-8/12">
                    <Link to={"/"}>
                        <img className="w-36 mx-auto mb-4" src={navLogo} alt="" />
                    </Link>{" "}
                    <p className="text-3xl font-semibold mt-3 flex justify-center">Sign In</p>

                    <div className="mt-6 mb-2">
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="md:flex lg:justify-between md:gap-5">

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

                            </div>

                            <button
                                type="submit"
                                className="btn w-full bg-teal-600 text-white hover:bg-teal-800 text-lg"
                            >
                                Sign in
                            </button>
                        </form>
                        <p className="mt-4 text-center font-normal">
                            Do not have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium hover:text-blue-500 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;