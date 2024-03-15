import './login.css'
import React, { useState } from 'react';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googlesso, loginUser } from '../../services/authservice';
import { SET_LOGIN, SET_NAME, SET_STATUS } from '../../redux/features/auth/authSlice';
import { Loader } from '../loader/loader';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({})
  const [FormData, setFormData] = useState({
    name: '',
    password: '',
    remember: ''
  })

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setFormData({
      ...FormData, remember: isChecked
    })
  };

  // Load the Google API client library
  const handleSignIn = async () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: `122547971868-cth18b7ghbhkn582ai0cj63jb87tk8pl.apps.googleusercontent.com`,
        scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        plugin_name: 'Web client 1'
      }).then(() => {
        console.log('Google API client initialized');
        window.gapi.auth2.getAuthInstance().signIn().then(async user => {
          const idToken = user.getAuthResponse().id_token;
          setIsLoading(true)
          const userData = {
            tokenId: idToken,
          }
          try {
            const data = await googlesso(userData);
            if (data.name) {
              dispatch(SET_LOGIN(true))
              dispatch(SET_NAME(data.name))
              dispatch(SET_STATUS(data.status))
              navigate('/home')
            }
            setIsLoading(false)
          } catch (error) {
            console.error('Error:', error);
          }
        }).catch(error => {
          console.error('Google Sign-In Error:', error);
        });
      }).catch((error) => {
        console.error('Error initializing Google API client:', error);
      });
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {}

    if (!FormData.name.trim()) {
      validationErrors.name = 'Email or Phone No. is required !';
    } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(FormData.name) && !/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(FormData.name)) {
      validationErrors.name = 'Enter a Valid Email or Phone No. !';
    }

    if (!FormData.password.trim()) {
      validationErrors.password = 'Password is required !';
    } else if (FormData.password.length < 8) {
      validationErrors.password = 'Password needs to have 8 characters minimum !';
    }

    setErrors(validationErrors)
    const { name, password, remember } = FormData
    const userData = {
      name, password, remember
    }

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true)
      try {
        const data = await loginUser(userData);
        if (data.name) {
          dispatch(SET_LOGIN(true))
          dispatch(SET_NAME(data.name))
          dispatch(SET_STATUS(data.status))
          navigate('/home')
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
        <div className="h-full md:mb-32 ">

          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
              <h1 className='text-stone-200 text-left mt-0 headingtext'>Welcome Back!</h1> <h2 className='text-stone-200 text-left headingtext2'>Log in to Your <span className='text-yellow-600'>EGold Haven</span> Account and Explore a World of Exquisite Gold Jewelry.</h2>
              <img
                src="/images/loginillu.png"
                className="w-full p-20"
                alt="User Login"
              />
            </div>

            {/* <!-- Right column container --> */}

            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 h-[500px] ">
              <h1 className='text-center text-stone-200 headingtext3 mb-7 '><span className='border-b-2 border-yellow-600 pb-2'>Log In</span></h1>

              <form onSubmit={handleLogin}> 

                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg bodytext text-stone-200">Sign in with</p>

                  <TERipple rippleColor="light">
                    <button onClick={handleSignIn}
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
                  type="email"
                  label="Email / Phone No"
                  size="lg"
                  className="mb-6 text-white"
                  name='name'
                  onChange={handleChange}
                ></TEInput>
                {errors.name && <h1 className='text-danger mt-[-15px] mb-6'>{errors.name}</h1>}


                <TEInput
                  type="password"
                  label="Password"
                  className="mb-6 text-white"
                  size="lg"
                  name='password'
                  onChange={handleChange}
                ></TEInput>
                {errors.password && <h1 className='text-danger mt-[-15px] mb-6'>{errors.password}</h1>}

                <div className="mb-6 flex items-center justify-between">

                  <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-yellow-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-white checked:bg-yellow-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-stone-200 checked:after:bg-yellow-600 checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_10px_#ca8a04] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent "
                      type="checkbox"
                      value=""
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      id="exampleCheck2"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer bodytext text-stone-200"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>


                  <Link to='/forgotpassword' className='bodytext text-stone-200 hover:text-yellow-600'>Forgot password?</Link>
                </div>


                <div className="text-center lg:text-left">
                  <TERipple rippleColor="light">
                    <button
                      type="submit"
                     
                      className="inline-block rounded bg-warning-600 px-7 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                      Login
                    </button>
                  </TERipple>


                  <p className="mb-0 mt-2 pt-1 text-sm  bodytext1 text-stone-200">
                    Don't have an account?{" "}
                    <Link
                      to='/signup'
                      className="text-danger transition duration-150 ease-in-out hover:text-yellow-600 focus:text-yellow-600 active:text-yellow-600"
                    >
                      Register Now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;