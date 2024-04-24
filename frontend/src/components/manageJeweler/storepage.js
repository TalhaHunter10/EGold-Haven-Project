import { useEffect, useState } from "react";
import { getloginStatus } from "../../services/authservice";
import { getJewelerDetails, getJewelerProducts } from "../../services/jewelerservice";
import { Link, useNavigate } from "react-router-dom";
import { FileAnimationsmall, Loader } from "../loader/loader";
import { Image, Select } from "antd";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ProductContainerVertical from "./productcontainervertical";
import { ChatState } from "../chat/ChatProvider";


const StorePage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [jeweler, setJeweler] = useState([]);
    const [product, setProduct] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const [notificationno, setNotificationno] = useState(0);
    const [chatno, setChatno] = useState(0);
    const [certificationno, setCertificationno] = useState(0);
    const [activeno, setActiveno] = useState(0);
    const [pendingno, setPendingno] = useState(0);
    const [isCategory, setIsCategory] = useState('');

    const handleCategoryChange = (value) => {
        setIsCategory(value);
    };

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

                let pending = 0;
                let active = 0;
                data.data.map((product) => {
                    if (product.status === 'pending approval') {
                        pending += 1;
                    }
                    if (product.status === 'active') {
                        active += 1;
                    }
                });

                setPendingno(pending);
                setActiveno(active);

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
                    if (status.status != "jeweler") {
                        navigate('/')
                    }
                    else {
                        fetchdata();
                        fetchProducts();
                    }
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

    const {setChatType} = ChatState();

    const handleChat = () => {
        localStorage.setItem('chatType', 'jeweler');
        setChatType('jeweler');
        navigate('/chat');
    }


    return (
        <div className="pt-10 pb-10">
            {isLoading && <Loader />}
            <div className="alluse text-stone-200 lg:flex lg:flex-wrap justify-center">

                <div className="lg:w-2/6 p-6 bg-neutral-900 rounded-lg order-2 md:order-1 mb-8 ">

                    <div className="">
                        {jeweler.coverimage && <Image src={`http://localhost:5000/${jeweler.coverimage[0].filePath}`} alt="Cover" className="rounded-lg aspect-video  object-contain" />}
                    </div>


                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>

                    <h1 className='alluse pt-8 text-3xl  text-center text-stone-200 pb-6'>Commission Rate</h1>
                    <div className='flex justify-start allusebody'>

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
                    <div className='flex justify-start text-left allusebody'>
                        <img className='w-6 h-6 ml-2' src='/images/phone.png' alt='seller' />


                        <p className='pl-5 alluse lg:text-xl text-stone-200 tracking-widest'>
                            {jeweler.phoneno && jeweler.phoneno.slice(0, 4) + '-' + jeweler.phoneno.slice(4)}
                        </p>


                    </div>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>
                    <h1 className='alluse pt-8 text-3xl text-center text-stone-200 pb-6'>Store Address</h1>
                    <div className='flex justify-start text-left allusebody'>
                        <img className='w-8 h-8 ml-2' src='/images/location.png' alt='seller' />
                        <div className="my-auto">
                            <p className='pl-5 lg:text-xl text-stone-200'>
                                Store No. {jeweler.shopno}
                            </p>
                            <p className='pl-5 lg:text-xl text-stone-200'>
                                {jeweler.address}
                            </p>
                            <p className='pl-5 lg:text-xl text-stone-200 '>
                                {jeweler.city}
                            </p>
                        </div>

                    </div>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>

                    <h1 className='alluse pt-8 text-3xl text-center text-stone-200 pb-4'>Jeweler Profile</h1>
                    <p className='pl-5 allusebody lg:text-lg text-stone-200'>
                        You can edit your profile details here.
                    </p>

                    <Link to={`/editjewelerprofile`} className='mt-8 flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600'>

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
                    <div className="flex justify-between align-start ">
                        <p className="text-[40px] alluse text-left my-auto">{jeweler.storename}</p>
                        <p className="my-auto" >{!anchorEl ? (

                            <span onClick={handleClick}><Bars3Icon className="h-10 w-10 cursor-pointer my-auto" strokeWidth={2} /></span>
                        ) : (
                            <span onClick={handleClose}><XMarkIcon className="h-10 w-10 cursor-pointer my-auto" strokeWidth={2} /></span>
                        )}</p>
                    </div>
                    <div className='border-b-2 border-yellow-600'>
                    </div>
                    <p className=" text-2xl allusebody pt-6">Welcome to your personalised <span className="text-yellow-600">Jeweler Store</span></p>



                    <div className="rounded-lg mt-4 alluse">

                        <div className="md:grid md:grid-flow-col justify-stretch align-center text-xl text-stone font-semibold">

                            <div className="custom-shadow cursor-pointer bg-zinc-800 rounded-lg mt-5 m-3 p-3 hover:bg-yellow-600 hover:scale-105 duration-300">
                                <div className="flex">
                                    <img className="w-6 h-6" src="/images/notification.png" alt="notification" />
                                    <p className="text-left pl-1">Notifications</p>
                                </div>
                                <p className="text-right pt-2">{notificationno > 0 ? (
                                    <span className="text-stone-200 text-xs border-b">New Notifications</span>
                                ) : (
                                    <span className="text-stone-200 text-xs border-b allusebody">No New Notifications</span>
                                )}</p>
                                <p className="text-right m-1">{notificationno}</p>
                            </div>

                            <div className="custom-shadow cursor-pointer bg-zinc-800 rounded-lg mt-5 m-3 p-3 hover:bg-yellow-600 hover:scale-105 duration-300" onClick={handleChat}>
                                <div className="flex">
                                    <img className="w-6 h-7" src="/images/chat.png" alt="chat" />
                                    <p className="text-left pl-1"> Chats </p>
                                </div>
                                <p className="text-right pt-2">{chatno > 0 ? (
                                    <span className="text-stone-200 text-xs border-b">Active Chats</span>
                                ) : (
                                    <span className="text-stone-200 text-xs border-b allusebody">No Active Chats</span>
                                )}</p>
                                <p className="text-right m-1">{notificationno}</p>
                            </div>

                            <div className="custom-shadow cursor-pointer bg-zinc-800 rounded-lg mt-5 m-3 p-3 hover:bg-yellow-600 hover:scale-105 duration-300">
                                <div className="flex">
                                    <img className="w-6 h-7" src="/images/request.png" alt="certification" />
                                    <p className="text-left pl-1"> Certification Requests </p>
                                </div>
                                <p className="text-right pt-2">{certificationno > 0 ? (
                                    <span className="text-stone-200 text-xs border-b">Pending Requests</span>
                                ) : (
                                    <span className="text-stone-200 text-xs border-b allusebody">No Pending Requests</span>
                                )}</p>
                                <p className="text-right m-1">{notificationno}</p>
                            </div>

                        </div>

                    </div>

                    <div className="bg-neutral-900 m-2 p-3 rounded-lg duration-300 mt-8" >
                        <p className="alluse text-3xl">Products Overview</p>
                        <p className="allusebody pt-3 text-lg text-justify">Discover your virtual storefront at <span className="text-yellow-600">EGold Haven</span>, where you can effortlessly manage your gold jewelry collection. Easily add new products, update existing listings, and showcase your craftsmanship to a global audience.</p>

                        <div className="grid grid-flow-col justify-stretch pt-5">
                            <div className="text-center pr-5 pl-5">
                                <p className="text-stone-200 text-lg border-b allusebody pb-1">Pending Approval</p>
                                <p className="text-center text-xl m-1">{pendingno}</p>

                            </div>
                            <div className="text-center pl-5 pr-5">
                                <p className="text-stone-200 text-lg border-b allusebody pb-1">Active / Live</p>
                                <p className="text-center text-xl m-1">{activeno}</p>
                            </div>
                        </div>

                        <div className="text-center">

                            <Link to={`/addproduct`} className=' mx-auto mt-4 mb-4 flex justify-center md:w-2/4 alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-lg font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600'>

                                <img className='w-7 h-7' src='/images/addwhite.png' alt='request' />
                                <p className='my-auto pl-3'>Add Product</p>

                            </Link>

                        </div>
                    </div>

                    <h1 className='headingtextlanding pl-8 mt-5'>Store Products</h1>
                    <div className='categoriesarea text-stone-200 overflow-auto mb-5'>
                        <div className='categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  '>
                            {product.length === 0 && !isFetched ? (
                                <FileAnimationsmall />
                            ) : (
                                <div className="">

                                    <ProductContainerVertical Product={product} />

                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            <div className='border-b-2 border-yellow-600 pt-10'>
            </div>

            <h1 className="text-stone-200 text-4xl text-center alluse pt-8">Products (All Categories)</h1>
            
            <p className='field-heading pt-6 pb-2 text-stone-200'>Category</p>
                <Select className="" style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleCategoryChange}
                    options={[
                        {
                            value: 'Rings',
                            label: 'Rings',
                        },
                        {
                            value: 'Earrings',
                            label: 'Earrings',
                        },
                        {
                            value: 'Necklaces',
                            label: 'Necklaces',
                        },
                        {
                            value: 'Chains',
                            label: 'Chains',
                        },
                        {
                            value: 'Bracelets',
                            label: 'Bracelets',
                        },
                        {
                            value: 'Bangles',
                            label: 'Bangles',
                        },
                        {
                            value: 'Anklets',
                            label: 'Anklets',
                        },
                        {
                            value: 'Pendants',
                            label: 'Pendants',
                        },
                        {
                            value: 'Bridal Sets',
                            label: 'Bridal Sets',
                        },
                        {
                            value: 'Others',
                            label: 'Others',
                        }
                    ]} />
            <div className="p-5">
                {product.length === 0 && !isFetched ? (
                    <FileAnimationsmall />
                ) : product.length === 0 && isFetched ? (
                    <p className="text-stone-200 text-2xl text-center allusebody pt-8">No Products Found</p>
                ) : product.length > 0 && isFetched ? (
                    <div>
                        {product.filter(item => item.category === isCategory).length === 0 ? (
                            <div className="allusebody text-center pt-5 text-3xl text-danger-600">
                                No Products Found in this Category
                                </div>
                        ):(
                            <div>
                            <div className="allusebody text-center pt-2 text-4xl text-stone-200">
                                {isCategory}
                                </div>
                        <ProductContainerVertical Product={product.filter(item => item.category === isCategory)} />
                        </div>
                        )}
                    </div>
                ) : (
                    <div>

                    </div>
                )}

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
                <span onClick={handleChat}><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/chat.png' alt='user' />
                    <span className='headerbodytext'>Chats</span>
                </MenuItem></span>
                <Link to=""><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/request.png' alt='user' />
                    <span className='headerbodytext'>Certification Requests</span>
                </MenuItem></Link>
                <Link to="/addproduct"><MenuItem onClick={handleClose}>
                    <img className="h-6 w-8 pr-2" src='/images/addwhite.png' alt='user' />
                    <span className='headerbodytext'>Add Products</span>
                </MenuItem></Link>
                <Divider />
                <Link to="/editjewelerprofile"><MenuItem onClick={handleClose}>
                    <img className="h-5 w-8 pr-2" src='/images/edit.png' alt='user' />
                    <span className='headerbodytext'>Edit Profile</span>
                </MenuItem></Link>
            </Menu>

        </div>
    );
}

export default StorePage;
