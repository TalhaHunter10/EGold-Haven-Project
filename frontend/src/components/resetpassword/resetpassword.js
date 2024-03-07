import React, { useState } from 'react';
import './resetpassword.css'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../services/authservice';
import { Loader } from '../loader/loader';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [FormData, setFormData] = useState({
        password: '',
        confirmpassword: ''
     })

     const {resetToken} = useParams()

    const handleReset = async (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.password.trim()) {
            validationErrors.password = 'Password is required !';
          } else if (FormData.password.length < 8) {
            validationErrors.password = 'Password needs to have 8 characters minimum !';
          }
      
          if (!FormData.confirmpassword.trim()) {
            validationErrors.confirmpassword = 'Confirm Password is required !';
          } else if (FormData.password !== FormData.confirmpassword) {
            validationErrors.confirmpassword = 'Passwords do not match !';
          }

        setErrors(validationErrors)
        const { password } = FormData
        const userData = {
            password
        }
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true)
           try {
            await resetPassword(userData, resetToken);
            navigate("/login")
            setIsLoading(false)
            
           } catch (error) {
            console.log(error.message)
            setIsLoading(false)
           }
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...FormData, [name]: value
        })
      }

    return (
        <div className="p-10">
            {isLoading && <Loader />}
            <section className="">
                <div className="h-full md:mb-32 ">

                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
                            <h1 className='text-stone-200 text-left mt-0 headingtextfp'>Reset Password <span className='text-yellow-600'>↺</span></h1>
                            <h2 className='text-stone-200 text-left headingtext2fp'>

                                Enter your new password and set your password securely for your <span className='text-yellow-600'>EGold Haven</span> account here.

                            </h2>
                            <img
                                src="/images/resetillu.png"
                                className="w-full p-20"
                                alt="User Login"
                            />
                        </div>

                        {/* <!-- Right column container --> */}

                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 ">

                            <h1 className='text-stone-200 headingtext3rp mb-5 '>New Password</h1>
                            <form>

                                <TEInput
                                    type="password"
                                    label="Password"
                                    className="mb-6 text-white"
                                    onChange={handleChange}
                                    name='password'
                                    size="lg"
                                ></TEInput>
                                {errors.password && <h1 className='text-danger mt-[-15px] mb-6'>{errors.password}</h1>}

                                <TEInput
                                    type="password"
                                    label="Confirm Password"
                                    className="mb-6 text-white"
                                    onChange={handleChange}
                                    name='confirmpassword'
                                    size="lg"
                                ></TEInput>
                                {errors.confirmpassword && <h1 className='text-danger mt-[-15px] mb-6'>{errors.confirmpassword}</h1>}





                                <div className="text-center">
                                    <TERipple rippleColor="light">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="inline-block rounded bg-warning-600 px-8 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                                        >
                                            Reset Password
                                        </button>
                                    </TERipple>

                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default ResetPassword;