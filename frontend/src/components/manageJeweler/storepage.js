import { useEffect, useState } from "react";
import { getloginStatus } from "../../services/authservice";
import { getJewelerDetails, getJewelerProducts } from "../../services/jewelerservice";
import { Link, useNavigate } from "react-router-dom";
import { FileAnimationsmall, Loader } from "../loader/loader";
import { Image } from "antd";

const StorePage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [jeweler, setJeweler] = useState([]);
    const [product, setProduct] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

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


    return (
        <div className="pt-10 pb-10">
            {isLoading && <Loader />}
            <div className="alluse alluse text-stone-200 flex flex-wrap justify-center">

                <div className="md:w-2/6 p-8 bg-neutral-900 rounded-lg order-2 md:order-1">

                    <div className="">
                        {jeweler.coverimage && <Image src={`http://localhost:5000/${jeweler.coverimage[0].filePath}`} alt="Cover" className="rounded-lg" />}
                    </div>

                    <Link to={``} className='mt-8 flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600'>

                            <img className='w-6 h-6' src='/images/edit.png' alt='request' />
                            <p className='my-auto pl-3'>Edit Profile</p>

                        </Link>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>
                    <h1 className='alluse pt-8 text-4xl text-center text-stone-200 pb-6'>Store Address</h1>
                    <div className='flex justify-start text-left'>
                        <img className='w-8 h-8 ml-2' src='/images/location.png' alt='seller' />
                        <div className="my-auto">
                            <p className='pl-5 alluse text-xl text-stone-200'>
                                Store No. {jeweler.shopno}
                            </p>
                            <p className='pl-5 alluse text-xl text-stone-200'>
                                {jeweler.address}
                            </p>
                            <p className='pl-5 alluse text-xl text-stone-200 '>
                                {jeweler.city}
                            </p>
                        </div>

                    </div>

                    <div className='border-b-2 border-yellow-600 pt-10'>
                    </div>

                    <h1 className='alluse pt-8 text-4xl text-center text-stone-200 pb-6'>Commission Rate</h1>
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

                    <div className='flex justify-start pt-5'>
                        <p className='pl-3 alluse text-sm text-stone-200 my-auto'>
                            Jeweler ID:
                        </p>

                        <p className='pl-2 alluse text-xs text-stone-200 my-auto'>
                            {jeweler._id}
                        </p>

                    </div>

                </div>

                <div className="md:w-4/6 pl-5 pr-5 pt-3 pb-5  text-center md:text-left order-1 md:order-2">
                    <p className="text-5xl alluse ">{jeweler.storename}</p>
                    <p className="text-justify text-lg alluse pt-5">Welcome to your personalised Jeweler Page, where craftsmanship meets opportunity. As a certified jeweler, you play an integral role in shaping the world of
                        gold elegance. Showcase your unique creations, from timeless classics to contemporary masterpieces, and connect with a discerning audience
                        passionate about quality and authenticitywhile increasing your visibility.
                        <br />
                        <br />
                        Here, you can view certification requests, accept them and interact with sellers wanting to certify their listing.
                        <br />
                        <br />
                        You can add products to your page, interact with potential buyers, and establish your presence
                        as a trusted name in the industry. </p>
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



        </div>
    );
}

export default StorePage;
