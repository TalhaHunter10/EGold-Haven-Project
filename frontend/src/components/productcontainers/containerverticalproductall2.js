import { Link } from 'react-router-dom';
import React from 'react';


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


const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const shortenTitle = (title, maxLength) => {
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + ' ...';
    }
    return title;
};


const formatPriceWithCommas = (price) => {
    return price.toLocaleString();
};




const ContainerVerticalProductAll2 = ({ product }) => {



    return (
        <div className="pl-2 pr-2 containertext cursor-pointer mt-1 pb-5 pt-5 flex ">
            {product.map((item) => (
                <Link to={`/productdetails/${item._id}`} key={item._id} className="w-80 transform overflow-hidden rounded-lg bg-stone-600/30 text-stone-200 duration-300 hover:scale-105 m-2">
                    <img className="h-48 w-full object-cover object-center md:h-48 bg-stone-200" src={item.images && item.images.length > 0 ? `http://localhost:5000/${item.images[0].filePath}` : ''} alt="Item" />
                    <div className="p-4">
                        <p className="mr-2 text-base font-extrabold text-right"><span className="text-yellow-500 tracking-widest">Rs. </span>{formatPriceWithCommas(parseInt(item.price))}</p>
                        <h2 className="container-title mb-4 text-2xl mt-1">{capitalizeFirstLetter(shortenTitle(item.title, 20))}</h2>
                        <p className=" text-medium"><span className='text-yellow-600 font-semibold'>Category</span> : <span className="font-semibold ml-3">{item.category}</span></p>
                        <p className="mb-2 text-medium"><span className='text-yellow-600 font-semibold mr-3'>Weight </span> : <span className="font-semibold ml-3">{item.weights.tola} tola</span></p>
                        <div className='text-right'>
                            <div className='text-lg'>
                                <p>{item.jewelerName}</p>
                            </div>

                            <div className=" text-xs">
                                <p>{getTimeSinceCreation(item.createdAt)}</p>
                            </div>
                        </div>


                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ContainerVerticalProductAll2;