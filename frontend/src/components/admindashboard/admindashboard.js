import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { getloginStatus, logoutUser } from '../../services/authservice';
import { SET_LOGIN, SET_NAME, SET_STATUS, SET_USER, selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getStats } from '../../services/adminservice';
import { Loader } from '../loader/loader';

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(useSelector(selectIsLoggedIn));

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        registeredUsers: 'reload',
        registeredJewelers: 'reload',
        jewelerRequests: 'reload',
        live: 'reload',
        expired: 'reload',
        rejected: 'reload',
        sold: 'reload',
        listingRequests: 'reload',
        livep: 'reload',
        rejectedp: 'reload',
        productsRequests: 'reload'
    })


    const logout = async () => {
        await logoutUser();
        dispatch(SET_LOGIN(false))
        dispatch(SET_NAME(""))
        dispatch(SET_STATUS("user"))
        navigate('/login')
    };

    const RefreshStats = async () => {
        setIsLoading(true);
        try {
            const getdata = await getStats();
            setData(data => ({
                ...data,
                registeredUsers: getdata.registeredUsers,
                registeredJewelers: getdata.registeredJewelers,
                jewelerRequests: getdata.jewelerRequests,
                live: getdata.liveListings,
                sold: getdata.soldListings,
                expired: getdata.expiredListings,
                rejected: getdata.rejectedListings,
                listingRequests: getdata.pendingApproval,
                livep: getdata.liveProducts,
                rejectedp: getdata.rejectedProducts,
                productsRequests: getdata.pendingProductsApproval
            }));
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const status = await getloginStatus();
                if (!status.verified) {
                    navigate('/login');
                    dispatch(SET_STATUS('user'));
                } else {
                    setIsLoggedIn(status.verified);
                    RefreshStats();
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
    
        checkLoginStatus();
    }, []);

    return (
        <div className='pb-20 bg-neutral-900 text-stone-200 alluse'>
            {isLoading && <Loader />}

            <div className='p-10 flex flex-wrap justify-center md:justify-between  '>
                <h1 className='m-5 text-5xl font-medium text-yellow-600 text-center'>Admin Dashboard</h1>
                <button
                    type="button"
                    onClick={RefreshStats}
                    className="m-5 inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg font-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                    Load / Refresh Stats
                </button>

                <button
                    type="button"
                    onClick={logout}
                    className="m-5 inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg font-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                    Logout
                </button>
            </div>

            <div className="flex flex-wrap">
                <div className="flex-grow m-10 border-4 border-yellow-600 rounded-lg h-max bg-zinc-800">
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                                <th colSpan={2} className="p-2 text-center text-3xl text-semibold font-medium border-b-4 border-yellow-600">User Stats</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Registered Users:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.registeredUsers}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Registered Jewelers:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.registeredJewelers}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold text-yellow-600">Pending Jeweler Requests:</td>
                                <td className="p-3 text-xl font-medium text-semibold text-yellow-600">{data.jewelerRequests}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="flex flex-wrap justify-left m-5">
                                    <Link to='/jewelerrequests' className="m-3 text-base font-semibold bg-transparent border border border-danger-600 rounded-lg px-8 py-2 hover:bg-danger-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500">Inspect Jeweler Requests</Link>
                                    <Link className="m-3 text-base font-semibold bg-transparent border border border-danger-600 rounded-lg px-8 py-2 hover:bg-danger-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500">Inspect User Profiles</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
                <div className="flex-grow m-10 border-4 border-yellow-600 rounded-lg h-max bg-zinc-800">
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                                <th colSpan={2} className="p-2 text-center text-3xl text-semibold font-medium border-b-4 border-yellow-600">Listings Stats</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Live Listings:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.live}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Sold Listings:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.sold}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Expired Listings:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.expired}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Rejected Listings:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.rejected}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold text-yellow-600">Pending Listings Approval Requests:</td>
                                <td className="p-3 text-xl font-medium text-semibold text-yellow-600">{data.listingRequests}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="flex-wrap justify-left m-5">
                                    <Link to="/listingrequests" className="m-3 text-base font-semibold bg-transparent border border border-danger-600 rounded-lg px-8 py-2 hover:bg-danger-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500">Inspect Listings Requests</Link>
                                    <button className="m-3 text-base font-semibold bg-transparent border border border-danger-600 rounded-lg px-8 py-2 hover:bg-danger-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500">Inspect All Listings</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex-grow m-10 border-4 border-yellow-600 rounded-lg h-max bg-zinc-800">
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                                <th colSpan={2} className="p-2 text-center text-3xl text-semibold font-medium border-b-4 border-yellow-600">Store Products Stats</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Live Products:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.livep}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold">Rejected Products:</td>
                                <td className="p-3 text-xl font-medium text-semibold">{data.rejectedp}</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-xl font-medium text-semibold text-yellow-600">Pending Products Approval Requests:</td>
                                <td className="p-3 text-xl font-medium text-semibold text-yellow-600">{data.productsRequests}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="flex flex-wrap justify-left m-5">
                                    <Link to='/productrequests' className="m-3 text-base font-semibold bg-transparent border border border-danger-600  rounded-lg px-8 py-2 hover:bg-danger-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500">Inspect Product Requests</Link>
                                    <button className="m-3 text-base font-semibold bg-transparent border border border-danger-600  rounded-lg px-8 py-2 hover:bg-danger-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500">Inspect All Products</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;