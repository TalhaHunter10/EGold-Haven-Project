import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getListingsById, getSimilarListings } from '../../services/listingservice';
import { FileAnimation, FileAnimationsmall } from '../loader/loader';
import { Carousel, Modal } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import ContainerVertical from './containervertical';

const ListingDetails = () => {

    const [isLoading, setIsLoading] = useState('false')

    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [seller, setSeller] = useState({});

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setIsLoading(true)
        const fetchListing = async () => {
            try {
                const data = await getListingsById(id);
                setListing(data.listings[0]);
                setSeller(data.seller[0]);
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        };
        fetchListing();
    }, [id]);


    const [similarListing, setSimilarListing] = useState([])

    const fetchdata = async (userdata, excludeId) => {
        try {
            const data = await getSimilarListings(userdata, excludeId);
            setSimilarListing(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (listing.category !== undefined && listing._id) {
            fetchdata(listing.category, listing._id);
        }
    }, [listing]);


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

            <div className="flex flex-wrap m-5">


                {/* <!-- left column container --> */}
                <div className="w-[100%] lg:w-2/3 p-4">

                    <h1 className='alluse text-4xl text-stone-200 pb-5'>Listing Details</h1>


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

                            <img alt="favorite" src="/images/favoriteblank.png" className="w-8 h-8 mb-4 hover:scale-110 duration-200 transform z-10 cursor-pointer" />

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
                            <div className='pt-3 pb-3 grid grid-flow-col justify-stretch lg:ml-4 lg:mr-4'>
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


                            <div className='pt-3 pb-3 grid grid-flow-col justify-stretch lg:ml-4 lg:mr-4'>
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
                                            <p>{listing.weights && parseFloat(listing.weights.tola).toFixed(2)} tola</p>
                                            <p>{listing.weights && parseFloat(listing.weights.gram).toFixed(2)} gram</p>
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

                        <p className='alluse text-lg text-stone-200 pt-3 pl-10'>
                            {listing.description}
                        </p>
                    </div>








                </div>

                {/* <!-- Right column container --> */}
                <div className="w-[100%] lg:w-1/3 bg-neutral-900 p-8 rounded-lg">
                    <div className=''>
                        <h1 className='alluse text-4xl text-center text-stone-200 pb-6'>Seller</h1>
                        <div className='flex justify-start'>
                            <img className='w-10 h-10' src='/images/usericon2.png' alt='seller' />
                            {seller && seller.name && (
                                <p className='pl-5 alluse text-2xl text-stone-200 my-auto'>
                                    {seller.name
                                        .split(' ')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}
                                </p>
                            )}

                        </div>
                        <p className='alluse tracking-widest pt-2 alluse text-sm pl-16 text-stone-200 my-auto'>
                            <span className='font-semibold'> Member since: </span> {seller && seller.createdAt && new Date(seller.createdAt).toLocaleDateString()}
                        </p>

                        <p className='text-center pt-8'>
                            <Link to={``} className='flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600'>

                                <img className='w-6 h-6' src='/images/chat.png' alt='chat' />
                                <p className='my-auto pl-3'>Chat with seller</p>

                            </Link>
                        </p>


                        <div className='border-b border-yellow-700 mt-6 mb-6'></div>

                        <h1 className='alluse text-4xl text-center text-stone-200 pb-3'>Gold Certification</h1>
                        <div className='flex flex-wrap text-stone-200 p-3 alluse hover:text-yellow-600 cursor-pointer' onClick={() => setOpen(true)}>
                            <img className='w-8 h-8' src='/images/information.png' alt='chat' />
                            <p className='my-auto pl-3 text-base'>About this feature</p>
                        </div>

                        <Modal isOpen={open} onClose={() => setOpen(false)}>
                            <>
                                <h1 className='modal-heading text-stone-700 text-xl font-bold p-2'>Gold Certification Request</h1>
                                <h3 className='modal-text p-2 text-lg font-semibold text-stone-700 '></h3>
                                <button className='modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-4 p-1 rounded-lg' onClick={() => setOpen(false)}>OK</button>
                            </>
                        </Modal>


                        <div className='border-b border-yellow-700 mt-10 mb-6'></div>


                        <h1 className='alluse text-4xl text-center text-stone-200 pb-6'>Location</h1>
                        <div className='flex justify-start'>
                            <img className='w-8 h-8 ml-2' src='/images/location.png' alt='seller' />

                            <p className='pl-5 alluse text-xl text-stone-200 my-auto'>
                                {listing.address}
                            </p>

                        </div>

                        <div className='border-b border-yellow-700 mt-10 mb-6'></div>

                        <div className='flex justify-start'>
                            <p className='pl-3 alluse text-sm text-stone-200 my-auto'>
                                Listing ID:
                            </p>

                            <p className='pl-2 alluse text-xs text-stone-200 my-auto'>
                                {listing._id}
                            </p>

                        </div>

                    </div>
                </div>
            </div>

            <div className='border-b border-yellow-700 mt-6 mb-6'></div>

            <h1 className='headingtextlanding text-stone-200 pt-5 pl-8'>Similar Listings</h1>
            <p className='buttontextlanding text-right mt-4 mr-8'><Link to="" className='text-stone-200 hover:text-yellow-600 text-xl'>View More</Link></p>
            <div className='categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  '>
                {similarListing.length === 0 ? (
                    <FileAnimationsmall />
                ) : (
                    <div className="">
                        <ContainerVertical listing={similarListing} />
                    </div>
                )}
            </div>


        </div>
    );
}

export default ListingDetails;