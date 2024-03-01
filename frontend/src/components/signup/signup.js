import React, { useState } from 'react';
import './signup.css'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';

const Signup = () => {

  const [errors, setErrors] = useState({})

  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    phone:'',
    password: '',
    confirmpassword:''
  })


  const handleSignUp = (e) => {
    e.preventDefault();
    const validationErrors = {}

    if (!FormData.name.trim()) {
      validationErrors.name = 'Name is required !';
    }else if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(FormData.name)) {
      validationErrors.email = 'Enter a Valid Name !';
    }

    if (!FormData.email.trim()) {
      validationErrors.email = 'Email is required !';
    } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(FormData.email)) {
      validationErrors.email = 'Enter a Valid Email !';
    }

    if (!FormData.phone.trim()) {
      validationErrors.phone = 'Phone No. is required !';
    } else if (!/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(FormData.phone)) {
      validationErrors.phone = 'Enter a Valid Phone No. !';
    }

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

    if (Object.keys(validationErrors).length === 0) {
      alert('SignUp Successful !')
    }

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData, [name]: value
    })
  }

  return (
    <div className='p-10'>
      <section className="">
        <h1 className='text-stone-200 text-left md:mt-10 headingtextsignup text-center'>Are you a <span className='text-yellow-600'>Jeweler</span>?</h1>
        <h2 className='text-stone-200 text-left headingtext2signup text-center mb-5'>Join <span className='text-yellow-600'>EGold Haven</span> as a certified jeweler to showcase your craft to a broader audience. Enjoy the perks of earning commissions for certifying gold items, managing your own store page, and becoming a trusted name in the world of gold elegance.</h2>
        <div className='text-center mt-5  mb-10'>
          <Link to='/signupjeweler'>
          <button
            type="button"
            className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
            Sign Up as Jeweler
          </button>
          </Link>
        </div>
        <div className="h-full md:mb-32 ">

          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">



            {/* <!-- Left column container --> */}

            <div className="mb-20 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 h-[500px] ">
              <h1 className='text-center text-stone-200 headingtext3 mb-7 '><span className='border-b-2 border-yellow-600 pb-2'>User Sign Up</span></h1>
              <form>

                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg bodytext text-stone-200">Sign up with</p>


                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="flex items-center justify-center mx-1 h-9 w-9 rounded-full bg-white uppercase leading-normal text-primary-600 transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:text-white focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none"
                    >


                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </button>
                  </TERipple>


                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="flex items-center justify-center mx-1 h-9 w-9 rounded-full bg-white uppercase leading-normal text-danger-600 transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:text-white focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none "
                    >

                      <svg xmlns="http://www.w3.org/2000/svg" className='ml-1.5 mt-1.5 h-5 w-5' fill="currentColor" viewBox="0 0 24 24"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" /> </svg> </button>
                  </TERipple>


                </div>


                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-yellow-600 after:mt-0.5 after:flex-1 after:border-t after:border-yellow-600">
                  <p className="mx-4 mb-0 text-center font-semibold text-stone-200 dark:text-white">
                    Or
                  </p>
                </div>

                <TEInput
                  type="text"
                  label="Full Name"
                  size="lg"
                  className="mb-6 text-white"
                  name='name'
                  onChange={handleChange}
                ></TEInput>
                {errors.name && <h1 className='text-danger mt-[-15px] mb-6'>{errors.name}</h1>}


                <TEInput
                  type="email"
                  label="Email"
                  size="lg"
                  className="mb-6 text-white"
                  name='email'
                  onChange={handleChange}
                ></TEInput>
                {errors.email && <h1 className='text-danger mt-[-15px] mb-6'>{errors.email}</h1>}

                <TEInput
                  type="tel"
                  label="Phone no"
                  size="lg"
                  className="mb-6 text-white"
                  name='phone'
                  onChange={handleChange}
                ></TEInput>
                {errors.phone && <h1 className='text-danger mt-[-15px] mb-6'>{errors.phone}</h1>}

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

                <div className="mb-6 ">

                  <a href="#!" className='bodytext text-stone-200 hover:text-yellow-600 text-center'>Terms and Conditions</a>
                </div>


                <div className="text-center lg:text-left">
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      onClick={handleSignUp}
                      className="bodytext inline-block rounded bg-white px-7 pb-2.5 pt-3  font-semibold  uppercase leading-normal text-black  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                      Sign Up
                    </button>
                  </TERipple>


                  <p className="mb-0 mt-2 pt-1 text-sm  bodytext1 text-stone-200">
                    Have an account?{" "}
                    <Link
                      to='/login'
                      className="text-danger transition duration-150 ease-in-out hover:text-yellow-600 focus:text-yellow-600 active:text-yellow-600">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* <!-- Right column container --> */}
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
              <img
                src="/images/signupillu.png"
                className="w-full p-20"
                alt="User Login"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;