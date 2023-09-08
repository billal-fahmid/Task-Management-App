// src/SignInForm.js
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from "react-hook-form";


const Signin = () => {

    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';
    console.log(from)

    const {signInUser} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {

        console.log(data)
        signInUser(data.email, data.password)
            .then(result => {
                const LoggedInUser = result.user;
                console.log(LoggedInUser)
                navigate(from, { replace: true })
               
            })
            .catch(err => {
                console.log(err.message)
            })

    };


  return (
    <div className="h-full mx-auto mt-10 lg:w-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        {...register("email", { required: true })} placeholder="Email"

                    />

                    {errors.email && <span>Email is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="password"
                            {...register("password", { required: true })} placeholder="Password"

                        />

                        {errors.password && <span>Password is required</span>}
                        <span
                            onClick={handleTogglePassword}
                            className="absolute right-0 top-0 mt-2 mr-4 cursor-pointer"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                </div>
         
             
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                <p className="text-gray-600 text-sm mt-5">
                    Not registered? <Link to={'/registration'}>Registration In here</Link>.
                </p>
            </form>
    </div>
  );
};

export default Signin;
