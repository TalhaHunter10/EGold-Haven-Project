import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { getListingsById } from '../../../services/listingservice';
import { FileAnimation } from '../../loader/loader';

const MyListingDetails = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState('false')

    const { id } = useParams();
    const [listing, setListing] = useState({});


    useEffect(() => {
        setIsLoading(true)
        const fetchListing = async () => {
            try {
                const data = await getListingsById(id);
                if (!data) {
                    navigate('/')
                }
                setListing(data.listings[0]);
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        };
        fetchListing();
    }, [id]);


    const SampleNextArrow = props => {
        const { className, style, onClick } = props
        return (
            <div
                className={className}
                style={{
                    ...style,
                    color: 'black',
                    fontSize: '28px',
                    lineHeight: '1.5715'
                }}
                onClick={onClick}
            >
                <RightOutlined />
            </div>
        )
    }

    const SamplePrevArrow = props => {
        const { className, style, onClick } = props
        return (
            <div
                className={className}
                style={{
                    ...style,
                    color: 'black',
                    fontSize: '28px',
                    lineHeight: '1.5715'
                }}
                onClick={onClick}
            >
                <LeftOutlined />
            </div>
        )
    }
    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    const formatPriceWithCommas = (price) => {
        return price.toLocaleString();
    };

    const getTimeSinceCreation = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const timeDiff = now.getTime() - createdDate.getTime();

        // Convert milliseconds to days
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff > 0) {
            return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
        } else {
            // Calculate hours difference if less than a day
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
            return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
        }
    };



    return (
        <div className='p-5'>
            {isLoading && <FileAnimation />}




            <div className=" p-4">

                <h1 className='alluse text-4xl text-stone-200 pb-5'>My Listing Details</h1>

                <div className='mt-3 mr-0 ml-0 md:mr-20 md:ml-20'>

                    <Carousel className='m-8 mt-2 p-8' arrows {...settings} dots>
                        {listing.images && listing.images.map((image, index) => (
                            <div key={index} className=''>
                                <img className='aspect-video w-[100%]  object-contain' src={`${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>


                    <div className=' p-8 rounded-md bg-neutral-900'>

                        <div className='flex justify-between'>
                            <p className='alluse font-semibold text-4xl text-stone-200 tracking-wider'>
                                Rs. {formatPriceWithCommas(parseInt(listing.price))}
                            </p>

                        </div>

                        {listing && listing.title && (<p className='pt-2 alluse text-3xl text-stone-200'>
                            {listing.title.split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                        </p>
                        )}

                        <div className='flex justify-between pt-5'>
                            <div className='flex justify-start'>
                                <img className='w-6 h-6' src='/images/location.png' alt='seller' />

                                <p className='pl-5 alluse text-base text-stone-200 my-auto'>
                                    {listing.address}
                                </p>

                            </div>

                            <p className='alluse text-base text-stone-200'>{getTimeSinceCreation(listing.createdAt)}</p>

                        </div>


                    </div>


                    <div className='mt-3 p-6 rounded-md bg-neutral-900'>


                        <p className='alluse font-semibold text-3xl text-stone-200 tracking-wider pt-2 pl-2'>
                            Details
                        </p>

                        <div className='text-stone-200 alluse tracking-wide text-lg'>
                            <div className='pt-3 pb-1 grid grid-flow-col justify-stretch lg:ml-4 lg:mr-4'>
                                <div className='flex flex-col md:flex-row w-full'>
                                    <div className='flex justify-between ml-6 mr-6 mb-3 md:my-auto md:w-1/2'>
                                        <div className='p-1 w-[100%] md:w-auto text-center lg:text-left text-yellow-600 font-semibold'>
                                            Category
                                        </div>
                                        <div className='p-1 w-[100%] md:w-auto text-center lg:text-left'>
                                            {listing.category}
                                        </div>
                                    </div>

                                    <div className='flex justify-between ml-6 mr-6 md:w-1/2'>
                                        <div className='p-1 w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold'>
                                            Stones
                                        </div>
                                        <div className=' p-1 w-[100%] md:w-auto text-center md:text-left'>
                                            {listing.stones}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='pt-1 pb-3 grid grid-flow-col justify-stretch lg:ml-4 lg:mr-4'>
                                <div className='flex flex-col md:flex-row w-full'>
                                    <div className='flex  justify-between ml-6 mr-6 my-auto  mb-3 md:my-auto md:w-1/2'>
                                        <div className='p-1 w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold'>
                                            Karats
                                        </div>
                                        <div className='p-1 w-[100%] md:w-auto text-center md:text-left'>
                                            {listing.karats}
                                        </div>
                                    </div>
                                    <div className='flex justify-between ml-6 mr-6  md:w-1/2'>
                                        <div className='p-1 my-auto w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold'>
                                            Weight
                                        </div>
                                        <div className='p-1 w-[100%] md:w-auto text-center md:text-left'>
                                            <p className='text-right'>{listing.weights && parseFloat(listing.weights.tola).toFixed(2)} tola</p>
                                            <p className='text-right'>{listing.weights && parseFloat(listing.weights.gram).toFixed(2)} gram</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                    <div className='mt-3 p-6 rounded-md bg-neutral-900'>
                        <p className='alluse font-semibold text-3xl text-stone-200 tracking-wider pt-2 pl-2'>
                            Description
                        </p>

                        <p className='alluse text-lg text-stone-200 pt-3 pl-10' style={{ whiteSpace: 'pre-line' }}>
                            {listing.description}
                        </p>
                    </div>


                </div>




            </div>



        </div>
    );
}

export default MyListingDetails;