import React, { useState } from 'react';
import './forgotpassword.css'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [errors, setErrors] = useState({})

    const [FormData, setFormData] = useState({email:''})

    const handleToken = (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.email.trim()) {
            validationErrors.email = 'Email is required !';
        } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(FormData.email)) {
            validationErrors.email = 'Enter a Valid Email!';
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            alert('Reset Token Sent to Email!')
        }

    }

    const handleChange = (e) => {
        const { email, value } = e.target;
        setFormData({
            ...FormData, email: value
        })
    }

    return (
        <div className="p-10">
            <section className="">
                <div className="h-full md:mb-32 ">

                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
                            <h1 className='text-stone-200 text-left mt-0 headingtextfp'>Forgot Password <span className='text-yellow-600'>?</span></h1> 
                            <h2 className='text-stone-200 text-left headingtext2fp'>
                            
                            Enter your email address, and we'll send you a reset token to reset your password securely for your <span className='text-yellow-600'>EGold Haven</span> account here.
                                
                               </h2>
                            <img
                                src="/images/forgotpasswordillu.png"
                                className="w-full p-20"
                                alt="User Login"
                            />
                        </div>

                        {/* <!-- Right column container --> */}

                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 ">
                    
                            <h1 className='text-stone-200 headingtext3fp mb-5 '>Email Address</h1>

                            <form>

                                <TEInput
                                    type="email"
                                    label="Email"
                                    size="lg"
                                    className="mb-6 text-white"
                                    name='email'
                                    onChange={handleChange}
                                ></TEInput>
                                {errors.email && <h1 className='text-danger mt-[-15px] mb-6'>{errors.email}</h1>}





                                <div className="text-center">
                                    <TERipple rippleColor="light">
                                        <button
                                            type="button"
                                            onClick={handleToken}
                                            className="bodytext inline-block rounded bg-white px-7 pb-2.5 pt-3 mb-6  font-semibold  uppercase leading-normal text-black  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                                        >
                                            Get Code
                                        </button>
                                    </TERipple>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;