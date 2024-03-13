import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingsById } from '../../services/listingservice';
import { FileAnimation } from '../loader/loader';

const ListingDetails = () => {

    const [isLoading, setIsLoading] = useState('false')

    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [seller, setSeller] = useState({});

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


    return (
        <div className='p-5'>
            {isLoading && <FileAnimation />}

            <div className="flex">
      <div className="w-2/3 bg-gray-200 p-4"> 
        {listing.title}
      </div>

      <div className="w-1/3 bg-gray-300 p-4">
        
      </div>
    </div>

        </div>
    );
}

export default ListingDetails;