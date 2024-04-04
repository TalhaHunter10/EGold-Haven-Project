import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import { acceptListing, getListingRequests, getUserDetailsForListingRequest, rejectListing } from '../../services/adminservice';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import ModalDynamic from '../modaldynamic';
import { Loader } from '../loader/loader';
import { getloginStatus } from '../../services/authservice';

const ListingTable = ({ listings, triggerRefresh }) => {

    const [open, setOpen] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleAccept = async (listingId) => {
        try {
            await acceptListing(listingId);
            triggerRefresh();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReject = async (listingId) => {
        try {
            await rejectListing(listingId);
            triggerRefresh();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getUserDetails = async (userId) => {
        setIsLoading(true);
        try {
            const response = await getUserDetailsForListingRequest(userId);
            if (response.status === 200) {
                setUserListings(response.data.listings);
                setUserDetails({
                    name: response.data.name,
                    email: response.data.email
                });
                setOpen(true);
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="overflow-x-auto h-screen alluse text-xl">
            {isLoading && <Loader />}
            <ModalDynamic isOpen={open} onClose={() => setOpen(false)} className="overflow-auto">
                <div className='w-auto text-center font-semibold' onClick={(e) => e.stopPropagation()}>
                    <h1 className='text-4xl text-center text-yellow-600 font-semibold'>User Details</h1>
                    <div className='flex flex-wrap justify-center'>
                        <div className='m-5'>
                            <h1 className='text-2xl text-neutral-900 '>{userDetails.name}</h1>
                            <h1 className='text-2xl text-neutral-900'>{userDetails.email}</h1>
                        </div>
                    </div>
                    <h1 className='text-4xl text-center text-yellow-600 font-semibold'>User Listings</h1>
                    <div className='flex flex-wrap justify-center overflow-y-auto max-h-[50vh] border-2 border-neutral-900 m-5 rounded-lg'>
                        <div className='m-5'>
                            {userListings.length === 0 ? (
                                <p className="text-lg text-stone-200">No listings found for this user.</p>
                            ) : (
                                userListings.map((listing, index) => (
                                    <div key={index} className='border border-yellow-600 p-5 m-5 rounded-lg'>
                                        <p className='mb-3'><span className='text-xl text-stone-200 rounded-full bg-neutral-900 pl-3 pr-3 pt-1 pb-1'>{index + 1}</span></p>
                                        <div className="mb-4">
                                            <h2 className="text-2xl text-yellow-600 font-semibold">Listing Information</h2>

                                            <div className="flex flex-wrap justify-center">
                                                <table className="min-w-full border border-danger-600 border-2 border-stone-200 mt-3 mb-3 bg-zinc-700 rounded-lg text-center">
                                                    <tbody>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Title</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200 md:w-96">{listing.title}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Price</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200">{listing.price}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Category:</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200">{listing.category}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Stones</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200">{listing.stones}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Tola Weight</td>
                                                            <td className="border border-stone-200 px-4 py-2 text-lg text-stone-200">{listing.weights.tola}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-2xl text-yellow-600 font-semibold">Additional Details</h2>
                                            <div className="flex flex-wrap justify-center">
                                                <table className="min-w-full border border-danger-600 border-2 border-stone-200 mt-3 mb-3 bg-zinc-700 rounded-lg text-center">
                                                    <tbody>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Description</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200 md:w-96">{listing.description}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Address</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200">{listing.address}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Karats</td>
                                                            <td className="border border-stone-200 px-4 py-2 text-lg text-stone-200">{listing.karats}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Status</td>
                                                            <td className="border border-stone-200 px-4 py-2 text-lg text-stone-200">{listing.status}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-2xl text-yellow-600 font-semibold">Images</h2>
                                            <div className="flex flex-wrap">
                                                {listing.images.map((image, index) => (
                                                    <div key={index} className='w-20 h-20 border-2 border-yellow-600 rounded-lg m-1'>
                                                        <Image
                                                            width={'auto'}
                                                            src={`http://localhost:5000/${image.filePath}`}
                                                            alt={`Image ${index}`}
                                                            className="p-2 mx-auto my-auto"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>


                </div>
            </ModalDynamic>
            {listings.map((listing, index) => (
                <table key={index} className="min-w-full border border-danger-600 border-2 border-stone-200 mt-10 mb-10 bg-zinc-700 rounded-lg text-center">
                    <thead>
                        <tr className="text-stone-200">
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Creation Time/Date</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">User(Seller)</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Title</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Price</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Category</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">stones</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">weight</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Images</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-stone-200">
                            <td className="border border-stone-200 px-4 py-2">{new Date(listing.createdAt).toLocaleString()}</td>
                            <td className="border border-stone-200 px-4 py-2 text-center">{listing.user} <br /><span onClick={() => getUserDetails(listing.user)} className='text-yellow-600 p-2 rounded-lg hover:font-semibold cursor-pointer'>View Details</span></td>
                            <td className="border border-stone-200 px-4 py-2">{listing.title}</td>
                            <td className="border border-stone-200 px-4 py-2">{listing.price}</td>
                            <td className="border border-stone-200 px-4 py-2">{listing.category}</td>
                            <td className="border border-stone-200 px-4 py-2">{listing.stones}</td>
                            <td className="border border-stone-200 px-4 py-2">
                                {listing.weights?.tola ? `Tola: ${listing.weights.tola}` : "Loading..."}
                            </td>
                            <td className="border border-stone-200 px-4 py-2">
                                <div className="flex flex-wrap">
                                    {listing.images.map((image, index) => (
                                        <div className='w-20 h-20 border-2 border-yellow-600 rounded-lg m-1'>
                                            <Image
                                                key={index}
                                                width={'auto'}

                                                src={`http://localhost:5000/${image.filePath}`}
                                                alt={`Image ${index}`}
                                                className="p-2  mx-auto my-auto"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </td>

                            <td className="border border-stone-200 px-4 py-2">
                                <div className='text-center'>
                                    <button onClick={() => handleAccept(listing._id)} className="bg-green-500 text-lg text-white px-6 py-1 rounded m-1 transform duration-300 hover:scale-110">Accept</button>
                                    <button onClick={() => handleReject(listing._id)} className="bg-red-500 text-lg text-white px-6 py-1 rounded m-1 transform duration-300 hover:scale-110">Reject</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
};

const ListingRequests = () => {
    const [trigger, setTrigger] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    const triggerRefresh = () => {
        setTrigger(!trigger); // Toggle refresh trigger
    };

    const fetchdata = async () => {
        try {
            const data = await getListingRequests();
            setListings(data);
            setIsFetched(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const status = await getloginStatus();
                if (!status.verified) {
                    navigate('/home');
                } else {
                    fetchdata();
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, [trigger]);


    const goToDashboard = () => {
        navigate('/home');
    };

    return (
        <div className="bg-neutral-900 h-screen">
            <div className="p-10 flex flex-wrap justify-center md:justify-between ">
                <h1 className="m-5 text-5xl font-medium text-yellow-600 text-center">Listing Requests</h1>
                <button
                    type="button"
                    onClick={fetchdata}
                    className="m-5 inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                    Fetch Data
                </button>

                <button
                    type="button"
                    onClick={goToDashboard}
                    className="m-5 inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="table-container">
                {isFetched ? <ListingTable listings={listings} triggerRefresh={triggerRefresh} /> : <div className="text-center text-3xl text-stone-200">Refresh requests / No new Requests Found !!</div>}
            </div>
        </div>
    );
};

export default ListingRequests;