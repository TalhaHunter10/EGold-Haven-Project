import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { ChangePassword, UpdateUser, getUserData } from "../../services/authservice";
import { useEffect, useState } from "react";
import { FileAnimationsmall, Loader } from "../loader/loader";
import { TEInput } from "tw-elements-react";


const UserProfile = () => {

    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);
    const [errors, setErrors] = useState({})
    const [profileerrors, setProfileErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [userData, setUserData] = useState([]);

    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        phoneno: '',
        oldpassword: '',
        password: '',
        confirmpassword: '',
    })

    const { oldpassword, password, name, email, phoneno } = FormData;

   

    const fetchdata = async () => {
        try {
            const data = await getUserData();

            setUserData(data);
            setFormData({
                name: data.name,
                email: data.email,
                phoneno: data.phoneno
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData, [name]: value
        })
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.oldpassword.trim()) {
            validationErrors.oldpassword = 'Old Password is required !';
        } else if (FormData.oldpassword.length < 8) {
            validationErrors.oldpassword = 'Password needs to have 8 characters minimum !';
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
                oldpassword, password
            }
            setIsLoading(true)
            try {
                const data = await ChangePassword(userData)
                
                setShowChangePasswordForm(false);
                setShowEditProfileForm(false);
                
                setIsLoading(false)

            } catch (error) {
                setIsLoading(false)
            }
        }
    }


    const handleProfileChange = async (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormData.name.trim()) {
            validationErrors.name = 'Name is required !';
          } else if (!/^[a-zA-Z]{2,40}(?: [a-zA-Z]{2,40}){1,3}$/.test(FormData.name)) {
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

        setProfileErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            const userData = {
                name, email, phoneno
            }
            setIsLoading(true)
            try {
                const data = await UpdateUser(userData)
                
                setShowChangePasswordForm(false);
                setShowEditProfileForm(false);
                
                setIsLoading(false)

            } catch (error) {
                setIsLoading(false)
            }
        }
    }



    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();


    const handlelisting = (e) => {
        if (isLoggedIn) {
            navigate('/createlisting');
        }
        else {
            toast.error('Login first to create listing !')
            navigate('/login');
        }
    };

    const handleShowChangePasswordForm = () => {
        setShowChangePasswordForm(true);
        setShowEditProfileForm(false);
    };

    const handleShowEditProfileForm = () => {
        setShowChangePasswordForm(false);
        setShowEditProfileForm(true);
    };

    const handleShowProfile = () => {
        setShowChangePasswordForm(false);
        setShowEditProfileForm(false);
    };

    return (
        <div className="p-12">
            {isLoading && <Loader />}
            <div className="flex flex-wrap justify-between">
                <h1 className="alluse text-4xl text-stone-200 pb-8">My Profile</h1>
                <div>
                    <button className="m-2 px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" onClick={handleShowProfile}>
                        <p className="">View Profile</p>
                    </button>
                    <button className="m-2 px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" onClick={handleShowChangePasswordForm}>
                        <p className="">Change Password</p>
                    </button>
                    <button className="m-2 px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" onClick={handleShowEditProfileForm}>
                        <p className="">Edit Profile</p>
                    </button>
                </div>
            </div>

            {showChangePasswordForm && (
                // Change password form
                <div className="p-6 rounded-md bg-neutral-900 alluse text-xl text-stone-200 text-center align-center justify-center">
                    <p className="text-3xl text-center">Change Password</p>
                    <div className="mt-5 w-96 text-center m-auto">


                        <TEInput
                            type="password"
                            label="Old Password"
                            className="mb-6 text-white"
                            onChange={handleChange}
                            name='oldpassword'
                            size="lg"
                        ></TEInput>
                        {errors.oldpassword && <h1 className='text-danger mt-[-15px] mb-6'>{errors.oldpassword}</h1>}

                        <TEInput
                            type="password"
                            label="New Password"
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

                        <button className="m-2 px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" onClick={handlePasswordChange}>
                            <p className="">Submit</p>
                        </button>
                    </div>

                </div>
            )}

            {showEditProfileForm && (
                // Edit profile form
                <div className="p-6 rounded-md bg-neutral-900 alluse text-xl text-stone-200 text-center align-center justify-center">
                <p className="text-3xl text-center">Edit Profile</p>
                <div className="mt-5 w-96 text-center m-auto">

                    <TEInput
                  type="text"
                  label="Full Name"
                  size="lg"
                  className="mb-6 text-white"
                  name='name'
                  value={FormData.name}
                  onChange={handleChange}
                ></TEInput>
                {profileerrors.name && <h1 className='text-danger mt-[-15px] mb-6'>{profileerrors.name}</h1>}


                <TEInput
                  type="email"
                  label="Email"
                  size="lg"
                  className="mb-6 text-white"
                  name='email'
                  value={FormData.email}
                  onChange={handleChange}
                ></TEInput>
                {profileerrors.email && <h1 className='text-danger mt-[-15px] mb-6'>{profileerrors.email}</h1>}

                <TEInput
                  type="tel"
                  label="Phone no"
                  size="lg"
                  className="mb-6 text-white"
                  name='phoneno'
                  value={FormData.phoneno}
                  onChange={handleChange}
                ></TEInput>
                {profileerrors.phoneno && <h1 className='text-danger mt-[-15px] mb-6'>{profileerrors.phoneno}</h1>}                    

                    <button className="m-2 px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" onClick={handleProfileChange}>
                        <p className="">Save</p>
                    </button>
                </div>

            </div>
            )}

            {!showChangePasswordForm && !showEditProfileForm && userData && Object.keys(userData).length > 0 && (
                // Display user profile details when userData is fetched and not empty
                <div className="mt-3 p-6 rounded-md bg-neutral-900">
                    <p className="alluser text-stone-200 text-4xl text-right m-5">{userData.name && userData.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    <div className="flex flex-wrap justify-between m-5 alluse">
                        <p className="text-yellow-600 text-xl p-1">Registered Email:</p>
                        <p className="text-stone-200 text-xl p-1">{userData.email}</p>
                    </div>
                    <div className="flex flex-wrap justify-between m-5 alluse">
                        <p className="text-yellow-600 text-xl p-1">Registered Phone:</p>
                        <p className="text-stone-200 text-xl p-1">{userData.phoneno}</p>
                    </div>
                </div>
            )}

            {!showChangePasswordForm && !showEditProfileForm && (!userData || Object.keys(userData).length === 0) && (
                <FileAnimationsmall />
            )}

            <div className="text-stone-200 border-2 border-yellow-600 p-10 rounded-lg ml-10 mr-10 mt-10">
                <h1 className="headingtextlanding pl-8">Want to sell your gold items on <span className="text-yellow-600">EGold Haven?</span></h1>
                <p className="buttontextlanding text-right mt-4 mr-8">
                    <button
                        type="button"
                        onClick={handlelisting}
                        className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        Start Selling
                    </button>
                </p>
            </div>
        </div>
    )
}

export default UserProfile;