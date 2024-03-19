import { useEffect, useState } from "react";
import ContainerVertical from "../listingcontainers/containervertical";
import { FileAnimationsmall } from "../loader/loader";
import { getFavoriteListings } from "../../services/listingservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";



const Favoritelistings = () => {

    const [listing, setListing] = useState([])
    const [message, setMessage] = useState(false)

    const fetchdata = async () => {
        try {
            const data = await getFavoriteListings();
            if (data && data.length > 0) {
                setListing(data);
            } else {
                setMessage(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);



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

    return (
        <div className="p-12">
            <h1 className='alluse text-4xl text-stone-200 pb-8'>Favorite Listings</h1>
            <div className="overflow-auto">
            {message ? (
                <div className="text-center alluse text-3xl text-stone-200 pb-5">
                    You have no favorite listings
                </div>
            ) : (
                listing.length === 0 ? (
                    <FileAnimationsmall />
                ) : (
                    <div className="flex flex-wrap justify-start">
                        <ContainerVertical listing={listing} />
                    </div>
                )
            )}
            </div>

            <div className='text-stone-200 border-2 border-yellow-600 p-10 rounded-lg ml-10 mr-10 mt-10'>
                <h1 className='headingtextlanding pl-8'>Want to sell your gold items on <span className='text-yellow-600'>EGold Haven ?</span></h1>
                <p className='buttontextlanding text-right mt-4 mr-8'>
                    <button
                        type="button"
                        onClick={handlelisting}
                        className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        Start Selling
                    </button></p>

            </div>

        </div>
    );
}

export default Favoritelistings;