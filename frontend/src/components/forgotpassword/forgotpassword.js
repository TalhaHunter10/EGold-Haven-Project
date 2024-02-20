import React, { useState } from 'react';
import './forgotpassword.css'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [tokeninput, setTokenInput] = useState('notshow')

    const [errors, setErrors] = useState({})

    const [FormData, setFormData] = useState({
        email: '',
        token: ''
    })

    const handleToken = (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.email.trim()) {
            validationErrors.email = 'Email or Phone No. is required !';
        } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(FormData.name)) {
            validationErrors.email = 'Enter a Valid Email or Phone No. !';
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            alert('Reset Token Sent to Email!')
        }

    }

    const handleReset = (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.token.trim()) {
            validationErrors.token = 'Enter the reset token sent to your Email Address !';
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            alert('Reset Token Sent to Email!')
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
            <section className="">
                <div className="h-full md:mb-32 ">

                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
                            <h1 className='text-stone-200 text-left mt-0 headingtextfp'>Reset Password !</h1> 
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

                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 h-[500px] ">
                            <h1 className='text-stone-200 headingtext3fp mb-2 '>Email Address</h1>

                            <form>

                                <TEInput
                                    type="email"
                                    label="Email"
                                    size="lg"
                                    className="mb-6 text-white"
                                    name='name'
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

                                    <div className="my-4 mt-10 mb-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-yellow-600 after:mt-0.5 after:flex-1 after:border-t after:border-yellow-600">

                                    </div>

                                    {tokeninput !== 'show' ? (
                                        <div>
                                            <h1 className='text-left text-stone-200 headingtext3fp mb-2 '>Enter Reset Token sent to your Email</h1>

                                            <TEInput
                                                type="text"
                                                label="Reset Token"
                                                className="mb-6 text-white"
                                                size="lg"
                                                name='token'
                                                onChange={handleChange}
                                            ></TEInput>
                                            {errors.password && <h1 className='text-danger mt-[-15px] mb-6'>{errors.password}</h1>}


                                            <TERipple rippleColor="light">
                                                <button
                                                    type="button"
                                                    onClick={handleReset}
                                                    className="bodytext inline-block rounded bg-white px-7 pb-2.5 pt-3  font-semibold  uppercase leading-normal text-black  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                                                >
                                                    Verify
                                                </button>
                                            </TERipple>

                                        </div>
                                    ) : (
                                        <div>
                                        </div>
                                    )}

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