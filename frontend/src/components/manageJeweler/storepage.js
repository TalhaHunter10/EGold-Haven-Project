import { useEffect, useState } from "react";
import { getloginStatus } from "../../services/authservice";
import { getJewelerDetails, getJewelerProducts } from "../../services/jewelerservice";
import { Link, useNavigate } from "react-router-dom";
import { FileAnimationsmall, Loader } from "../loader/loader";
import { Image } from "antd";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListIcon from '@mui/icons-material/List';
import Logout from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StorePage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [jeweler, setJeweler] = useState([]);
    const [product, setProduct] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const [notificationno, setNotificationno] = useState(0);
    const [chatno, setChatno] = useState(0);
    const [certificationno, setCertificationno] = useState(0);

    const fetchdata = async () => {
        setIsLoading(true);
        try {
            const data = await getJewelerDetails();
            if (data.result) {
                setJeweler(data.data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    const fetchProducts = async () => {
        setIsLoading(true);
        setIsFetched(false);
        try {
            const data = await getJewelerProducts();
            if (data.result) {
                setProduct(data.data);
                setIsLoading(false);
                setIsFetched(true);
            }
        } catch (error) {
            setIsLoading(false);
            setIsFetched(true);
        }
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const status = await getloginStatus();
                if (!status.verified) {
                    navigate('/login');
                } else {
                    fetchdata();
                    fetchProducts();
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);


    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };


    return (
        <div className="pt-10 pb-10">
            {isLoading && <Loader />}
            <div className="alluse alluse text-stone-200 lg:flex lg:flex-wrap justify-center">

                <div className="lg:w-2/6 p-6 bg-neutral-900 rounded-lg order-2 md:order-1 mb-8 ">

                    <div className="">
                        {jeweler.coverimage && <Image src={`http://localhost:5000/${jeweler.coverimage[0].filePath}`} alt="Cover" className="rounded-lg aspect-video  object-contain" />}
                    </div>


                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>

                    <h1 className='alluse pt-8 text-3xl  text-center text-stone-200 pb-6'>Commission Rate</h1>
                    <div className='flex justify-start'>

                        <img className='w-8 h-8 ml-2' src='/images/value.png' alt='seller' />

                        <p className='pl-5 alluse text-2xl text-stone-200 my-auto'>
                            {jeweler.commissionrate} %
                        </p>

                    </div>

                    <Link to={``} className='mt-8 flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600'>

                        <img className='w-6 h-6' src='/images/request.png' alt='request' />
                        <p className='my-auto pl-3'>Request Commission Change</p>

                    </Link>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>

                    <h1 className='alluse pt-8 text-3xl text-center text-stone-200 pb-6'>Phone No.</h1>
                    <div className='flex justify-start text-left'>
                        <img className='w-6 h-6 ml-2' src='/images/phone.png' alt='seller' />


                        <p className='pl-5 alluse lg:text-xl text-stone-200 tracking-widest'>
                            {jeweler.phoneno && jeweler.phoneno.slice(0, 4) + '-' + jeweler.phoneno.slice(4)}
                        </p>


                    </div>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>
                    <h1 className='alluse pt-8 text-3xl text-center text-stone-200 pb-6'>Store Address</h1>
                    <div className='flex justify-start text-left'>
                        <img className='w-8 h-8 ml-2' src='/images/location.png' alt='seller' />
                        <div className="my-auto">
                            <p className='pl-5 alluse lg:text-xl text-stone-200'>
                                Store No. {jeweler.shopno}
                            </p>
                            <p className='pl-5 alluse lg:text-xl text-stone-200'>
                                {jeweler.address}
                            </p>
                            <p className='pl-5 alluse lg:text-xl text-stone-200 '>
                                {jeweler.city}
                            </p>
                        </div>

                    </div>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>

                    <Link to={``} className='mt-8 flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600'>

                        <img className='w-6 h-6' src='/images/edit.png' alt='request' />
                        <p className='my-auto pl-3'>Edit Profile</p>

                    </Link>


                    <div className='border-b-2 border-yellow-600 pt-8'>
                    </div>

                    <div className='flex justify-start pt-5'>
                        <p className='pl-3 alluse text-sm text-stone-200 my-auto'>
                            Jeweler ID:
                        </p>

                        <p className='pl-2 alluse text-xs text-stone-200 my-auto'>
                            {jeweler._id}
                        </p>

                    </div>

                </div>

                <div className="lg:w-4/6 pl-5 pr-5 pt-3 pb-5  text-center md:text-left order-1 md:order-2">
                    <div className="flex justify-between align-start">
                        <p className="text-4xl alluse text-left">{jeweler.storename}</p>
                        {!anchorEl ? (

                            <span onClick={handleClick}><Bars3Icon className="h-10 w-10 cursor-pointer" strokeWidth={2} /></span>
                        ) : (
                            <span onClick={handleClose}><XMarkIcon className="h-10 w-10 cursor-pointer" strokeWidth={2} /></span>
                        )}
                    </div>
                    <p className=" text-2xl alluse pt-4">Welcome to your personalised <span className="text-yellow-600">Jeweler Store</span></p>

                    <div className="rounded-lg mt-8 alluse">
                        <p className="text-2xl "></p>
                        <div className="md:grid md:grid-flow-col justify-stretch align-center text-xl text-stone font-semibold">

                            <div className="custom-shadow cursor-pointer bg-neutral-900 rounded-lg mt-3 m-3 p-3 hover:bg-yellow-600 hover:scale-105 duration-300">
                                <div className="flex">
                                    <img className="w-6 h-6" src="/images/notification.png" alt="notification" />
                                    <p className="text-left pl-1">Notifications</p>
                                </div>
                                <p className="text-right pt-2">{notificationno > 0 ? (
                                    <span className="text-stone-200 text-xs border-b">New Notifications</span>
                                ) : (
                                    <span className="text-stone-200 text-xs border-b">No New Notifications</span>
                                )}</p>
                                <p className="text-right m-1">{notificationno}</p>
                            </div>

                            <div className="custom-shadow cursor-pointer bg-neutral-900 rounded-lg mt-3 m-3 p-3 hover:bg-yellow-600 hover:scale-105 duration-300">
                                <div className="flex">
                                    <img className="w-6 h-7" src="/images/chat.png" alt="chat" />
                                    <p className="text-left pl-1"> Chats </p>
                                </div>
                                <p className="text-right pt-2">{chatno > 0 ? (
                                    <span className="text-stone-200 text-xs border-b">Active Chats</span>
                                ) : (
                                    <span className="text-stone-200 text-xs border-b">No Active Chats</span>
                                )}</p>
                                <p className="text-right m-1">{notificationno}</p>
                            </div>

                            <div className="custom-shadow cursor-pointer bg-neutral-900 rounded-lg mt-3 m-3 p-3 hover:bg-yellow-600 hover:scale-105 duration-300">
                                <div className="flex">
                                    <img className="w-6 h-7" src="/images/request.png" alt="certification" />
                                    <p className="text-left pl-1"> Certification Requests </p>
                                </div>
                                <p className="text-right pt-2">{certificationno > 0 ? (
                                    <span className="text-stone-200 text-xs border-b">Pending Requests</span>
                                ) : (
                                    <span className="text-stone-200 text-xs border-b">No Pending Requests</span>
                                )}</p>
                                <p className="text-right m-1">{notificationno}</p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='border-b-2 border-yellow-600 pt-10'>
            </div>

            <div className='categoriesarea mt-10 text-stone-200 overflow-auto mb-20'>
                <h1 className='headingtextlanding pl-8'>Store Products</h1>
                <div className='categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  '>
                    {product.length === 0 && !isFetched ? (
                        <FileAnimationsmall />
                    ) : (
                        <div className="">



                        </div>
                    )}
                </div>
            </div>

            <Menu
                anchorEl={anchorEl}
                id="jeweler-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundColor: '#4b4e49',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        color: 'white',


                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            color: '#d2ac47',
                            backgroundColor: '#4b4e49'
                        },

                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Link to=""><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/notification.png' alt='user' />
                    <span className='headerbodytext'>Notifications</span>
                </MenuItem></Link>
                <Link to=""><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/chat.png' alt='user' />
                    <span className='headerbodytext'>Chats</span>
                </MenuItem></Link>
                <Link to=""><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/request.png' alt='user' />
                    <span className='headerbodytext'>Certification Requests</span>
                </MenuItem></Link>
                <Link to=""><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/addwhite.png' alt='user' />
                    <span className='headerbodytext'>Add Products</span>
                </MenuItem></Link>
                <Divider />
                <Link to=""><MenuItem onClick={handleClose}>
                    <img className="h-5 w-8 pr-2" src='/images/edit.png' alt='user' />
                    <span className='headerbodytext'>Edit Profile</span>
                </MenuItem></Link>
            </Menu>

        </div>
    );
}

export default StorePage;
