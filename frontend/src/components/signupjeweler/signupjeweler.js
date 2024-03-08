import React from 'react';
import './signupjeweler.css'
import { useState } from 'react';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading'




const SignupJeweler = () => {
    const [SignUpStep, setSignUpStep] = useState('stepone');

    const [errors, setErrors] = useState({})

    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    })


    const handleSignUp = (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.name.trim()) {
            validationErrors.name = 'Name is required !';
        } else if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(FormData.name)) {
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
            alert('SignUp Successful !');
            setSignUpStep('steptwo');
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData, [name]: value
        })
    }

    const handlebackClick = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: ''
        })
        setSignUpStep('stepone');
    };


    const [images, setImages] = React.useState([]);

    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append each image file to the FormData object
        images.forEach((image, index) => {
            console.log(index)
            formData.append(`image-${index + 1}`, image.file);
        });

        try {
            // Send FormData object containing all images to the backend API endpoint
            //const response = await axios.post('/upload-images', formData, {
            //  headers: {
            //    'Content-Type': 'multipart/form-data', // Set the Content-Type header to indicate multipart form data
            //   },
            //   });

            //console.log(imageList)

            // Handle the response from the backend
            //  console.log('Response from backend:', response.data);
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error uploading images:', error);
        }
    };


    return (

        <div className="p-10">
            <section className="">
                <h1 className='text-stone-200 text-left md:mt-10 headingtextsignup text-center'><span className='text-danger'>Not</span> a <span className=''>Jeweler</span>?</h1>
                <h2 className='text-stone-200 text-left headingtext2signup text-center mb-5'>Join as a user on <span className='text-yellow-600'>EGold Haven</span> to explore our collection of gold jewelry with ease. Sign up now and start discovering!</h2>
                <div className='text-center mt-5  mb-10'>
                    <Link to='/signup'>
                        <button
                            type="button"
                            className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                            Sign Up as User
                        </button>
                    </Link>
                </div>
                <div className="h-full md:mb-32 ">

                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">


                        {SignUpStep === 'stepone' ? (

                            <div className="mb-20 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 h-[500px] ">
                                <h1 className='text-center text-stone-200 headingtext3 mb-10 '><span className='border-b-2 border-yellow-600 pb-2'>Jeweler Registration</span></h1>
                                <h2 className='flex flex-wrap justify-center text-center mb-10'>
                                    <img
                                        src="/images/stepcurrent.png"
                                        className="w-3 mr-2 cursor-pointer"
                                        alt="Current step"

                                    />
                                    <img
                                        src="/images/remainingstep.png"
                                        className="w-3 cursor-pointer"
                                        alt="Remaining Step"
                                        onClick={handleSignUp}
                                    />
                                </h2>
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


                                    <div className="text-center lg:text-left">
                                        <h1
                                            className="bodytext inline-block rounded bg-white px-7 pb-2.5 pt-3  font-semibold  uppercase leading-normal text-black  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                                            onClick={handleSignUp}

                                        >
                                            Proceed

                                        </h1>


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

                        ) : (
                            <div className="mb-20 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 h-auto ">
                                <h1 className='text-center text-stone-200 headingtext3 mb-10 '><span className='border-b-2 border-yellow-600 pb-2'>Jeweler Registration</span></h1>
                                <h2 className='flex flex-wrap justify-center text-center mb-10 '>
                                    <img
                                        src="/images/stepcurrent.png"
                                        className="w-3 mr-2 cursor-pointer"
                                        alt="Current step"
                                        onClick={handlebackClick}
                                    />
                                    <img
                                        src="/images/stepcurrent.png"
                                        className="w-3 cursor-pointer"
                                        alt="Current Step"

                                    />
                                </h2>

                                <form>
                                    <TEInput
                                        type="text"
                                        label="Store Name"
                                        size="lg"
                                        className="mb-6 text-white"
                                    ></TEInput>


                                    <TEInput
                                        type="text"
                                        label="Owner Cnic No."
                                        size="lg"
                                        className="mb-6 text-white"
                                    ></TEInput>


                                    <TEInput
                                        type="text"
                                        label="Store/Shop No."
                                        className="mb-6 text-white"
                                        size="lg"
                                    ></TEInput>



                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (

                                            <fieldset className="upload__image-wrapper upload-container flex flex-wrap justify-left">
                                                <legend className='text-stone-300 ml-6 pl-2 pr-2'>Store Front Image (Cover)</legend>
                                                <div className='upload-button'
                                                    style={isDragging ? { color: 'white' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <img className='uploader-icon' src='/images/add.png' alt="add" />
                                                    Click / Drop
                                                </div>
                                                &nbsp;
                                                <div onClick={onImageRemoveAll} className='upload-button'>
                                                    <img className='uploader-icon' src='/images/remove.png' alt="remove" />
                                                    Drop Images
                                                </div>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item image-container">
                                                        <img className='m-auto mt-1 mb-3' src={image['data_url']} alt="" width="50" />
                                                        <div className="image-item__btn-wrapper flex flex-wrap justify-center">
                                                            <img className='single-image-icon' src='/images/update.png' onClick={() => onImageUpdate(index)} alt='update' />
                                                            <img className='single-image-icon' src='/images/remove.png' onClick={() => onImageRemove(index)} alt='remove' />
                                                        </div>
                                                    </div>
                                                ))}

                                            </fieldset>
                                        )}

                                    </ImageUploading>


                                    <TEInput
                                        type="text"
                                        label="Address"
                                        className="mb-6 text-white"
                                        size="lg"
                                    ></TEInput>

                                    <TEInput
                                        type="text"
                                        label="City"
                                        className="mb-6 text-white"
                                        size="lg"
                                    ></TEInput>

                                    <div className="mb-6 flex items-center justify-between">


                                        <h1 className='bodytext text-stone-200 hover:text-yellow-600 cursor-pointer' onClick={handlebackClick}>&#11164; Back</h1>



                                        <a href="#!" className='bodytext text-stone-200 hover:text-yellow-600'>Terms and Conditions</a>
                                    </div>


                                    <div className="text-center lg:text-left">
                                        <TERipple rippleColor="light">
                                            <button
                                                type="button"
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
                        )}


                        {/* <!-- Right column container --> */}
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
                            <img
                                src="/images/partnerillu.png"
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

export default SignupJeweler;