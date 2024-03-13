import React, { useState } from 'react';
import './signup.css'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authservice';
import { Loader } from '../loader/loader';



const Signup = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})


  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    phoneno: '',
    password: '',
    confirmpassword: '',
  })

  const { name, email, phoneno, password } = FormData;

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = {}

    if (!FormData.name.trim()) {
      validationErrors.name = 'Name is required !';
    } else if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(FormData.name)) {
      validationErrors.name = 'Enter a Valid Name !';
    }

    if (!FormData.email.trim()) {
      validationErrors.email = 'Email is required !';
    } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(FormData.email)) {
      validationErrors.email = 'Enter a Valid Email !';
    }

    if (!FormData.phoneno.trim()) {
      validationErrors.phoneno = 'Phone No. is required !';
    } else if (!/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(FormData.phoneno)) {
      validationErrors.phoneno = 'Enter a Valid Phone No. !';
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
      const userData = {
        name, email, phoneno, password, status: "user"
      }
      setIsLoading(true)
      try {
        const data = await registerUser(userData)
        if (data.name) {
          navigate('/login')
        }
        setIsLoading(false)
      } catch (error) {
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
    <div className='p-10'>
      {isLoading && <Loader />}
      <section className="">
        <h1 className='text-stone-200 text-left md:mt-5 headingtextsignup text-center'>Are you a <span className='text-yellow-600'>Jeweler</span>?</h1>
        <h2 className='text-stone-200 text-left headingtext2signup text-center mb-5'>Join <span className='text-yellow-600'>EGold Haven</span> as a certified jeweler to showcase your craft to a broader audience. Enjoy the perks of earning commissions for certifying gold items, managing your own store page, and becoming a trusted name in the world of gold elegance.</h2>
        <div className="h-full md:mb-32 ">

          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">



            {/* <!-- Left column container --> */}

            <div className="mb-20 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 h-auto ">
              <h1 className='text-center text-stone-200 headingtext3 mb-7 '><span className='border-b-2 border-yellow-600 pb-2'>User Registration</span></h1>
              <form>

                


                

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
                  name='phoneno'
                  onChange={handleChange}
                ></TEInput>
                {errors.phoneno && <h1 className='text-danger mt-[-15px] mb-6'>{errors.phoneno}</h1>}

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
                      className="inline-block rounded bg-warning-600 px-7 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
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