

import React, { useEffect, useState } from 'react';
import { FileAnimationsmall } from '../loader/loader';
import ContainerAll from '../listingcontainers/containerall';
import axios from 'axios';

const Listings = () => {

    const [isFetched, setIsFetched] = React.useState(false);
    const [listings, setListings] = useState([]);

    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', minWeight: '', maxWeight: '', search: '' });

    const backend = process.env.REACT_APP_BACKEND_URL;

    const fetchdata = async () => {
        try {
            const res = await axios.get(`${backend}/api/listings/getlistings`, { params: filters });
            setListings(res.data);
            setIsFetched(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        fetchdata();
    };


    return (
        <div className='pb-20'>

            <div className='md:flex md:flex-wrap md:justify-between min-[150px]:text-center mt-10'>

                <div className=' text-stone-200 min-[150px]:text-4xl min-[150px]:text-center md:text-5xl alluse md:pl-8 mb-5 md:mr-16'>Active Listings</div>

                <div className='justify-center text-center min-[150px]:w-96  md:w-1/3 md:mt-3 mb-5 min-[150px]:mx-auto md:mx-0'>
                    <input className="m-auto min-[150px]:w-80 w-full h-10 block  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        type="text" name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search..." />
                </div>
            </div>

            <div>

                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min Price" />
                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" />
                <input type="number" name="minWeight" value={filters.minWeight} onChange={handleFilterChange} placeholder="Min Weight" />
                <input type="number" name="maxWeight" value={filters.maxWeight} onChange={handleFilterChange} placeholder="Max Weight" />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className='categoriesarea text-stone-200 mb-5'>
                <div className='categories flex flex-wrap pt-5 pb-5  '>
                    {listings && listings.length === 0 && !isFetched ? (
                        <FileAnimationsmall />
                    ) : (
                        listings && listings.length === 0 && isFetched ? (
                            <p className='allusebody text-2xl text-stone-200 '>No Listings Found !!</p>
                        ) : (
                            <div className="">
                                <ContainerAll listing={listings} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listings;