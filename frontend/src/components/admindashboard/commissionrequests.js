import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getloginStatus } from "../../services/authservice";
import { acceptCommissionChangeRequest, getCommissionChangeRequests, getJewelerDetailsForProductRequest, rejectCommissionChangeRequest } from "../../services/adminservice";
import { Image } from "antd";
import { Loader } from "../loader/loader";
import ModalDynamic from "../modaldynamic";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";



const RequestTable = ({ requests, triggerRefresh }) => {

    const [open, setOpen] = useState(false);
    const [jewelerProducts, setjewelerProducts] = useState([]);
    const [jewelerDetails, setJewelerDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const handleAccept = async (requestId) => {

        const validationErrors = {}
        if (!reason.trim() || reason === '' || reason === null) {
            validationErrors.reason = 'Response is required !';
        }
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            try {
                await acceptCommissionChangeRequest(requestId, reason);
                triggerRefresh();
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            toast.error('Please remove the field error !!')
        }
    };

    const handleReject = async (requestId) => {

        const validationErrors = {}
        if (!reason.trim() || reason === '' || reason === null) {
            validationErrors.reason = 'Response is required !';
        }
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            try {
                await rejectCommissionChangeRequest(requestId, reason);
                triggerRefresh();
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            toast.error('Please remove the field error !!')
        }
    };

    const getJewelerDetails = async (jewelerId) => {
        setIsLoading(true);
        try {
            const response = await getJewelerDetailsForProductRequest(jewelerId);
            if (response.status === 200) {
                setjewelerProducts(response.data.products);
                setJewelerDetails({
                    storename: response.data.storename,
                    shopno: response.data.shopno,
                    address: response.data.address,
                    city: response.data.city,
                    commissionrate: response.data.commissionrate,
                    phoneno: response.data.phoneno,
                    image: response.data.image
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

    const [errors, setErrors] = useState({})
    const [reason, setReason] = useState('');

    const onReasonChange = (e) => {
        setReason(e.target.value);
    }


    return (
        <div className="overflow-x-auto h-screen alluse text-xl">
            {isLoading && <Loader />}
            <ModalDynamic isOpen={open} onClose={() => setOpen(false)} className="overflow-auto">
                <div className='w-auto text-center font-semibold' onClick={(e) => e.stopPropagation()}>
                    <h1 className='text-4xl text-center text-yellow-600 font-semibold mb-6'>Jeweler Details</h1>
                    <div className='flex flex-wrap justify-start'>
                        <div className='w-64 m-2 my-auto'>
                            {jewelerDetails.image && <Image

                                width={'auto'}
                                src={`http://localhost:5000/${jewelerDetails.image[0].filePath}`}
                                alt={`Image`}
                                className="my-auto"
                            />}
                        </div>
                        <div className='m-2'>
                            <h1 className='text-4xl text-left text-neutral-900 pb-3'>{jewelerDetails.storename}</h1>
                            <h1 className='text-xl text-left text-neutral-900'>Store No.{jewelerDetails.shopno}, {jewelerDetails.address}</h1>
                            <h1 className='text-xl text-left text-neutral-900 mb-2'>{jewelerDetails.city}</h1>
                            <h1 className='text-xl text-left text-neutral-900'>Commission Rate : {jewelerDetails.commissionrate} %</h1>
                            <h1 className='text-xl text-left text-neutral-900'>Contact No : {jewelerDetails.phoneno} </h1>
                        </div>
                    </div>
                    <div className='border-b-2 border-yellow-600 pt-1'>
                    </div>
                    <h1 className='text-4xl text-center text-yellow-600 font-semibold mt-4'>Jeweler Products</h1>
                    <div className='flex flex-wrap justify-center overflow-y-auto max-h-[50vh] border-2 border-neutral-900 m-5 rounded-lg'>
                        <div className='m-5'>
                            {jewelerProducts.length === 0 ? (
                                <p className="text-lg text-stone-200">No products found for this jeweler.</p>
                            ) : (
                                jewelerProducts.map((product, index) => (
                                    <div key={index} className='border border-yellow-600 p-5 m-5 rounded-lg'>
                                        <p className='mb-3'><span className='text-xl text-stone-200 rounded-full bg-neutral-900 pl-3 pr-3 pt-1 pb-1'>{index + 1}</span></p>
                                        <div className="mb-4">
                                            <h2 className="text-2xl text-yellow-600 font-semibold">Product Information</h2>

                                            <div className="flex flex-wrap justify-center">
                                                <table className="min-w-full border border-danger-600 border-2 border-stone-200 mt-3 mb-3 bg-zinc-700 rounded-lg text-center">
                                                    <tbody>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Title</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200 md:w-96">{product.title}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Price</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200">{product.price}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Category:</td>
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200">{product.category}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Tola Weight</td>
                                                            <td className="border border-stone-200 px-4 py-2 text-lg text-stone-200">{product.weights.tola}</td>
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
                                                            <td className="border border-stone-200 px-4 py-2  text-lg text-stone-200 md:w-96">{product.description}</td>
                                                        </tr>

                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Karats</td>
                                                            <td className="border border-stone-200 px-4 py-2 text-lg text-stone-200">{product.karats}</td>
                                                        </tr>
                                                        <tr className="text-stone-200">
                                                            <td className="border border-stone-200 px-4 py-2 bg-zinc-800 font-semibold">Status</td>
                                                            <td className="border border-stone-200 px-4 py-2 text-lg text-stone-200">{product.status}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-2xl text-yellow-600 font-semibold">Images</h2>
                                            <div className="flex flex-wrap text-center">
                                                {product.images.map((image, index) => (
                                                    <div key={index} className='w-20 border-2 border-yellow-600 rounded-lg m-1'>
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


            {requests.map((request, index) => (
                <table key={index} className="min-w-full border border-danger-600 border-2 border-stone-200 mt-10 mb-10 bg-zinc-700 rounded-lg text-center">
                    <thead>
                        <tr className="text-stone-200">
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Creation Time/Date</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">jeweler(Seller)</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">New Commission Rate</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Reason</th>
                            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-stone-200">
                            <td className="border border-stone-200 px-4 py-2">{new Date(request.createdAt).toLocaleString()}</td>
                            <td className="border border-stone-200 px-4 py-2 text-center">{request.jeweler} <br /><span onClick={() => getJewelerDetails(request.jeweler)} className='text-yellow-600 p-2 rounded-lg hover:font-semibold cursor-pointer'>View Details</span></td>
                            <td className="border border-stone-200 px-4 py-2">{request.newcommission}</td>
                            <td className="border border-stone-200 px-4 py-2">{request.reason}</td>
                            <td className="border border-stone-200 px-4 py-2">
                                <div className='text-center'>
                                    <TextArea placeholder='Write response here...' allowClear style={{ width: '100%', height: 120, fontSize: '18px', marginBottom: 20 }} onChange={onReasonChange} />
                                    <p className="mt-[-15px] mb-6">{errors.reason && <span className='text-danger mt-[-15px] mb-6  w-auto'>{errors.reason}</span>}</p>
                                    <button onClick={() => handleAccept(request._id)} className="bg-green-500 text-lg text-white px-6 py-1 rounded m-1 transform duration-300 hover:scale-110">Accept</button>
                                    <button onClick={() => handleReject(request._id)} className="bg-red-500 text-lg text-white px-6 py-1 rounded m-1 transform duration-300 hover:scale-110">Reject</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
};


const CommissionRequests = () => {

    const [trigger, setTrigger] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const triggerRefresh = () => {
        setTrigger(!trigger); // Toggle refresh trigger
    };

    const fetchdata = async () => {
        try {
            const data = await getCommissionChangeRequests();
            setRequests(data);
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
                <h1 className="m-5 text-5xl font-medium text-yellow-600 text-center">Commission Change Requests</h1>
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
                {isFetched && requests.length != 0 ? <RequestTable requests={requests} triggerRefresh={triggerRefresh} /> : <div className="text-center text-3xl text-stone-200">Refresh requests / No new Requests Found !!</div>}
            </div>
        </div>
    );
}

export default CommissionRequests;