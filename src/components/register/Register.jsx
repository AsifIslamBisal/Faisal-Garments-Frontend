import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerAnimi from '../../assets/lottie/register.json';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { authContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register: registerHook, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(authContext);
    const navigate = useNavigate();
    const [photoFile, setPhotoFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            let email = data.emailOrPhone;
            let password = data.password;

            const result = await createUser(email, password);

            let photoURL = "";
            if(photoFile){
                const reader = new FileReader();
                reader.readAsDataURL(photoFile);
                photoURL = await new Promise(resolve => {
                    reader.onload = () => resolve(reader.result);
                });
            }

            await updateUserProfile(data.name, photoURL);

            const userInfo = {
                name: data.name,
                emailOrPhone: email,
                photo: photoURL
            };

            const res = await axiosPublic.post('/users', userInfo);
            if(res.data.insertedId){
                reset();
                setPhotoFile(null);
                Swal.fire({ icon: 'success', title: 'User created successfully' });
                navigate('/');
            }

        } catch (error) {
            Swal.fire({ icon: 'error', title: error.message });
        }
    }

    return (
        <>
            <Helmet>
                <title>Foysal Garments | Sign Up</title>
            </Helmet>

            <div className="min-h-screen bg-white px-4 md:px-8 flex items-start md:items-center justify-center pt-24 md:pt-0">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl">

                    <div className="w-full md:w-1/2 flex justify-center">
                        <Lottie.default 
                            animationData={registerAnimi} 
                            loop 
                            className="w-[280px] md:w-[350px] lg:w-[450px] xl:w-[520px]"
                        />
                    </div>

                    <div className="bg-white w-full md:w-1/2 max-w-md p-6 rounded-2xl ">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            <div>
                                <label className="text-sm font-semibold">Name</label>
                                <input 
                                    type="text"
                                    {...registerHook("name", { required: true })}
                                    placeholder="Your name"
                                    className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                            </div>

                            <div>
                                <label className="text-sm font-semibold">Email</label>
                                <input 
                                    type="email"
                                    {...registerHook("emailOrPhone", { required: true })}
                                    placeholder="Enter email"
                                    className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.emailOrPhone && <p className="text-red-500 text-sm">Email is required</p>}
                            </div>

                            <div className="relative">
                                <label className="text-sm font-semibold">Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    {...registerHook("password", { 
                                        required: true, 
                                        minLength: 6 
                                    })}
                                    placeholder="Enter password"
                                    className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                                />

                                <span 
                                    className="absolute top-[38px] right-3 cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                                </span>

                                {errors.password?.type === "required" && (
                                    <p className="text-red-500 text-sm">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-blue-600">Upload Photo</label>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhotoFile(e.target.files[0])}
                                    className="w-full mt-1 border px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-center pt-2">
                                <input 
                                    type="submit"
                                    value="Sign Up"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 cursor-pointer"
                                />
                            </div>
                        </form>

                        <p className="text-center mt-4 text-sm">
                            Already have an account? 
                            <Link to="/login" className="text-blue-600 ml-1">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;