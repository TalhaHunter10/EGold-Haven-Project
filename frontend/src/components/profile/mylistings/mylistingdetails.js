import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel, Input, InputNumber, Select } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { deleteListingById, editListing, getImageByUrl, getListingsById, setListingSold } from '../../../services/listingservice';
import { FileAnimation, Loader } from '../../loader/loader';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../Modal';
import TextArea from 'antd/es/input/TextArea';
import ImageUploading from 'react-images-uploading';

const MyListingDetails = () => {

    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const { id } = useParams();
    const [listing, setListing] = useState({});

    const [isCategory, setIsCategory] = useState('');
    const [isTitle, setIsTitle] = useState('');
    const [isDescription, setIsDescription] = useState('');
    const [isPrice, setIsPrice] = useState('');
    const [isKarats, setIsKarats] = useState('');
    const [isWeight, setIsWeight] = useState('');
    const [isStones, setIsStones] = useState('');
    const [isLocation, setIsLocation] = useState('');
    const [isWorking, setIsWorking] = React.useState(false);
    const [images, setImages] = React.useState([]);





    useEffect(() => {
        setIsLoading(true);
        const fetchListingAndImages = async () => {
            try {
                const data = await getListingsById(id)
                if (!data || !data.listings || data.listings.length === 0) {
                    navigate('/');
                    return;
                }

                const fetchedListing = data.listings[0];
                setListing(fetchedListing);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching listing and images:', error);
                setIsLoading(false);
            }
        };

        fetchListingAndImages();
    }, [id]);


    const loadEditListing = async () => {
        setShowEdit(true);
        setIsLoading(true);
        setIsCategory(listing.category);
        setIsTitle(listing.title);
        setIsDescription(listing.description);
        setIsPrice(listing.price);
        setIsKarats(listing.karats);
        setIsWeight(listing.weights.tola);
        setIsStones(listing.stones);
        setIsLocation(listing.address);

        if (Array.isArray(listing.images)) {
            const imageUrls = listing.images.map(image => `${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`);
            const downloadedImages = await downloadAllImages(imageUrls);
            setImages(downloadedImages);
        }

        setIsLoading(false);
    }


    const downloadAllImages = async (imageUrls) => {
        const downloadedImages = [];
        try {
            const imageDownloadPromises = imageUrls.map(async imageUrl => {
                const response = await getImageByUrl(imageUrl);
                if (!response) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                }

                
                const blob = response;
                const fileName = 'image.jpg';
                const file = new File([blob], fileName, { type: blob.type });
                const dataUrl = await blobToDataURL(blob);
                return { data_url: dataUrl, file: file };
            });

            const images = await Promise.all(imageDownloadPromises);
            downloadedImages.push(...images);
        } catch (error) {
            console.error('Error downloading images:', error);
        }
        return downloadedImages;
    };

    const blobToDataURL = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };





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

    const handleDeleteListing = async () => {
        if (!isLoggedIn) {
            toast.error('Login first to delete listing !')
            navigate('/login')
            return
        }
        setIsWorking(true)
        try {
            await deleteListingById(id);
            navigate('/mylistings')

            setIsWorking(false)
        } catch (error) {
            console.error(error);
            setIsWorking(false)
        }
    }



    const [errors, setErrors] = useState({})

    const handleCategoryChange = (value) => {
        setIsCategory(value);
    };

    const handleTitleChange = (e) => {
        setIsTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setIsDescription(e.target.value);

    };

    const onPriceChange = (value) => {
        setIsPrice(value)
    }

    const handleKaratsChange = (value) => {
        setIsKarats(value);
    };

    const handleStonesChange = (value) => {
        setIsStones(value);
    };

    const onWeightChange = (value) => {
        setIsWeight(value);
    };

    const handleLocationChange = (value) => {
        setIsLocation(value);
    };







    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList);
        setImages(imageList);
    };

    const [closeOpen, setCloseOpen] = React.useState(false);


    const handleRemoveAllImages = () => {
        setImages([]);
        setCloseOpen(false);
    };


   


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!isLoggedIn) {
            navigate('/login')
            toast.error('Login first to create listing')
            return;
        }
        const validationErrors = {}

        if (!isCategory.trim()) {
            validationErrors.category = 'Category is required !';
        }

        if (!isTitle.trim()) {
            validationErrors.title = 'Title is required !';
        }
        if (!isDescription.trim()) {
            validationErrors.description = 'Description is required !';
        }
        if (isPrice === '') {
            validationErrors.price = 'Price is required !';
        }
        if (!isKarats.trim()) {
            validationErrors.karats = 'Please select a value for karats !';
        }
        if (isWeight === '') {
            validationErrors.weight = 'Weight is required !';
        }
        if (!isStones.trim()) {
            validationErrors.stones = 'Stones detail is required !';
        }
        if (!isLocation.trim()) {
            validationErrors.location = 'Location is required !';
        }
        if (images.length === 0) {
            validationErrors.images = 'Atleast one Image is required !';
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();

            images.forEach((image, index) => {
                formData.append(`images`, image.file);
            });

            formData.append('category', isCategory);
            formData.append('title', isTitle);
            formData.append('description', isDescription);
            formData.append('price', isPrice);
            formData.append('weight', isWeight);
            formData.append('karats', isKarats);
            formData.append('address', isLocation);
            formData.append('stones', isStones);
            formData.append('status', 'pending approval');
            formData.append('ListingID', id);

            setIsWorking(true)
            try {
                const data = await editListing(formData);
                if (data) {
                    navigate('/mylistings');
                }
                setIsWorking(false)

            } catch (error) {
                setIsWorking(false)
            }

        } else {
            toast.error('Please remove the field error !!')
        }

    };

    const handleSold = async () => {
        if (!isLoggedIn) {
            navigate('/login')
            toast.error('Login first to mark listing as sold')
            return;
        }
        setIsWorking(true)
        try {
            
            const data = await setListingSold(id);
            if (data) {
                navigate('/mylistings');
            }
            setIsWorking(false)
        } catch (error) {
            console.error(error);
            setIsWorking(false)
        }
    }


    return (
        <div className='p-12'>
            {isLoading && <FileAnimation />}
            {isWorking && <Loader />}

            <div className="flex flex-wrap justify-between mb-5 text-center">
                <h1 className="m-auto md:m-0 alluse text-4xl text-stone-200 pb-3">My Listing Details</h1>
                <div className="m-auto md:m-0">
                    <button onClick={() => setShowEdit(false)} className="m-1 md:m-2 px-1 md:px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-xs md:text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        <p className="">View Listing</p>
                    </button>
                    <button onClick={loadEditListing} className="m-1 md:m-2 px-1 md:px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-xs md:text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" >
                        <p className="">Edit Listing</p>
                    </button>
                    <button onClick={() => setOpen(true)} className="m-1 md:m-2 px-1 md:px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-xs md:text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        <p className="">Delete Listing</p>
                    </button>
                </div>
            </div>
            <div className='md:text-right pb-5'>
            <button  onClick={() => setConfirmOpen(true)} className="w-[100%] md:w-auto m-1 px-7 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm md:text-base uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        <p className="">MARK AS SOLD</p>
                    </button>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <>
                    <h1 className='modal-heading text-stone-700 text-2xl font-bold p-2'>Confirm Deletion</h1>
                    <h3 className='modal-text p-3 text-justify font-semibold text-base text-stone-700 '>Are you sure you want to delete this listing ? </h3>
                    <button className='ml-3 modal-button-cancel font-semibold border-2 border-danger-600 text-danger-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg' onClick={handleDeleteListing}>Yes</button>
                    <button className='ml-3 modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg' onClick={() => setOpen(false)}>Cancel</button>
                </>
            </Modal>

            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <>
                    <h1 className='modal-heading text-stone-700 text-2xl font-bold p-2'>Mark as Sold</h1>
                    <h3 className='modal-text p-3 text-justify font-semibold text-base text-stone-700 '>Are you sure you want to mark this listing as Sold ? </h3>
                    <button className='ml-3 modal-button-cancel font-semibold border-2 border-danger-600 text-danger-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg' onClick={handleSold}>Yes</button>
                    <button className='ml-3 modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg' onClick={() => setConfirmOpen(false)}>Cancel</button>
                </>
            </Modal>


            <div className=" p-4">

                {!showEdit && (<div className='mt-3 mr-0 ml-0 md:mr-20 md:ml-20'>

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
                                            <p className='md:text-right'>{listing.weights && parseFloat(listing.weights.tola).toFixed(2)} tola</p>
                                            <p className='md:text-right'>{listing.weights && parseFloat(listing.weights.gram).toFixed(2)} gram</p>
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


                </div>)}

                {showEdit && <div>
                    <div className='m-2 p-5 bg-neutral-900 rounded-lg'>
                        <h1 className='alluse text-4xl text-stone-200 pb-8 text-center'>Edit Listing</h1>

                        <div className=' justify-center md:mr-10 md:ml-10'>
                            <p className='field-heading pt-6 pb-2 text-stone-200'>Category</p>
                            <Select value={isCategory} className="" style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleCategoryChange}
                                options={[
                                    {
                                        value: 'Rings',
                                        label: 'Rings',
                                    },
                                    {
                                        value: 'Earrings',
                                        label: 'Earrings',
                                    },
                                    {
                                        value: 'Necklaces',
                                        label: 'Necklaces',
                                    },
                                    {
                                        value: 'Chains',
                                        label: 'Chains',
                                    },
                                    {
                                        value: 'Bracelets',
                                        label: 'Bracelets',
                                    },
                                    {
                                        value: 'Bangles',
                                        label: 'Bangles',
                                    },
                                    {
                                        value: 'Anklets',
                                        label: 'Anklets',
                                    },
                                    {
                                        value: 'Pendants',
                                        label: 'Pendants',
                                    },
                                    {
                                        value: 'Bridal Sets',
                                        label: 'Bridal Sets',
                                    },
                                    {
                                        value: 'Coins & Bars',
                                        label: 'Coins & Bars',
                                    }
                                ]} />
                            {errors.category && <h1 className='text-danger mt-[-15px] mb-6'>{errors.category}</h1>}

                            <p className='field-heading pb-2 text-stone-200'>Title</p>
                            <Input value={isTitle} style={{ width: '100%', height: 40, fontSize: '18px', marginBottom: 20 }} onChange={handleTitleChange} />
                            {errors.title && <h1 className='text-danger mt-[-15px] mb-6'>{errors.title}</h1>}

                            <div className='border-b-2 border-yellow-600 mt-6 mb-6'></div>


                            <p className='field-heading pb-2 text-stone-200'>Price</p>
                            <InputNumber value={isPrice} min={1} style={{ width: '100%', height: 40, fontSize: '18px', marginBottom: 1 }} formatter={value => `${value}`} parser={value => value.replace(/\$\s?|(,*)/g, '')} onChange={onPriceChange} />;
                            {errors.price && <h1 className='text-danger mt-[-15px] mb-6'>{errors.price}</h1>}

                            <p className='field-heading pb-2 text-stone-200'>Karats</p>
                            <Select value={isKarats} className='' style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleKaratsChange}
                                options={[
                                    {
                                        value: '10k',
                                        label: '10k',
                                    },
                                    {
                                        value: '12k',
                                        label: '12k',
                                    },
                                    {
                                        value: '14k',
                                        label: '14k',
                                    },
                                    {
                                        value: '18k',
                                        label: '18k',
                                    },
                                    {
                                        value: '22k',
                                        label: '22k',
                                    },
                                    {
                                        value: '24k',
                                        label: '24k',
                                    }
                                ]} />
                            {errors.karats && <h1 className='text-danger mt-[-15px] mb-6'>{errors.karats}</h1>}

                            <p className='field-heading pb-2 text-stone-200'>Weight (tola)</p>
                            <InputNumber value={isWeight} style={{ width: '100%', height: 40, fontSize: '18px', marginBottom: 20 }} onChange={onWeightChange} />
                            {errors.weight && <h1 className='text-danger mt-[-15px] mb-6'>{errors.weight}</h1>}


                            <p className='field-heading pb-2 text-stone-200'>Stones</p>
                            <Select value={isStones} className='' style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleStonesChange}
                                options={[
                                    {
                                        value: 'None',
                                        label: 'None',
                                    },
                                    {
                                        value: 'Inclusive - Artificial',
                                        label: 'Inclusive - Artificial',
                                    },
                                    {
                                        value: 'Inclusive - Diamonds',
                                        label: 'Inclusive - Diamonds',
                                    },
                                    {
                                        value: 'Exclusive - Artificial',
                                        label: 'Exclusive - Artificial',
                                    },
                                    {
                                        value: 'Exclusive - Diamonds',
                                        label: 'Exclusive - Diamonds',
                                    },
                                ]} />
                            {errors.stones && <h1 className='text-danger mt-[-15px] mb-6'>{errors.stones}</h1>}

                            <div className='border-b-2 border-yellow-600 mt-6 mb-6'></div>

                            <p className='field-heading pb-2 text-stone-200'>Location</p>
                            <Select value={isLocation} placeholder="Select the city" style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleLocationChange}
                                options={[

                                    { value: 'Islamabad, Pakistan', label: 'Islamabad' },
                                    { value: 'Ahmed Nager Chatha, Pakistan', label: 'Ahmed Nager Chatha' },
                                    { value: 'Ahmadpur East, Pakistan', label: 'Ahmadpur East' },
                                    { value: 'Ali Khan Abad, Pakistan', label: 'Ali Khan Abad' },
                                    { value: 'Alipur, Pakistan', label: 'Alipur' },
                                    { value: 'Arifwala, Pakistan', label: 'Arifwala' },
                                    { value: 'Attock, Pakistan', label: 'Attock' },
                                    { value: 'Bhera, Pakistan', label: 'Bhera' },
                                    { value: 'Bhalwal, Pakistan', label: 'Bhalwal' },
                                    { value: 'Bahawalnagar, Pakistan', label: 'Bahawalnagar' },
                                    { value: 'Bahawalpur, Pakistan', label: 'Bahawalpur' },
                                    { value: 'Bhakkar, Pakistan', label: 'Bhakkar' },
                                    { value: 'Burewala, Pakistan', label: 'Burewala' },
                                    { value: 'Chillianwala, Pakistan', label: 'Chillianwala' },
                                    { value: 'Chakwal, Pakistan', label: 'Chakwal' },
                                    { value: 'Chichawatni, Pakistan', label: 'Chichawatni' },
                                    { value: 'Chiniot, Pakistan', label: 'Chiniot' },
                                    { value: 'Chishtian, Pakistan', label: 'Chishtian' },
                                    { value: 'Daska, Pakistan', label: 'Daska' },
                                    { value: 'Darya Khan, Pakistan', label: 'Darya Khan' },
                                    { value: 'Dera Ghazi Khan, Pakistan', label: 'Dera Ghazi Khan' },
                                    { value: 'Dhaular, Pakistan', label: 'Dhaular' },
                                    { value: 'Dina, Pakistan', label: 'Dina' },
                                    { value: 'Dinga, Pakistan', label: 'Dinga' },
                                    { value: 'Dipalpur, Pakistan', label: 'Dipalpur' },
                                    { value: 'Faisalabad, Pakistan', label: 'Faisalabad' },
                                    { value: 'Ferozewala, Pakistan', label: 'Ferozewala' },
                                    { value: 'Fateh Jhang, Pakistan', label: 'Fateh Jhang' },
                                    { value: 'Ghakhar Mandi, Pakistan', label: 'Ghakhar Mandi' },
                                    { value: 'Gojra, Pakistan', label: 'Gojra' },
                                    { value: 'Gujranwala, Pakistan', label: 'Gujranwala' },
                                    { value: 'Gujrat, Pakistan', label: 'Gujrat' },
                                    { value: 'Gujar Khan, Pakistan', label: 'Gujar Khan' },
                                    { value: 'Hafizabad, Pakistan', label: 'Hafizabad' },
                                    { value: 'Haroonabad, Pakistan', label: 'Haroonabad' },
                                    { value: 'Hasilpur, Pakistan', label: 'Hasilpur' },
                                    { value: 'Haveli Lakha, Pakistan', label: 'Haveli Lakha' },
                                    { value: 'Jatoi, Pakistan', label: 'Jatoi' },
                                    { value: 'Jalalpur, Pakistan', label: 'Jalalpur' },
                                    { value: 'Jattan, Pakistan', label: 'Jattan' },
                                    { value: 'Jampur, Pakistan', label: 'Jampur' },
                                    { value: 'Jaranwala, Pakistan', label: 'Jaranwala' },
                                    { value: 'Jhang, Pakistan', label: 'Jhang' },
                                    { value: 'Jhelum, Pakistan', label: 'Jhelum' },
                                    { value: 'Kalabagh, Pakistan', label: 'Kalabagh' },
                                    { value: 'Karor Lal Esan, Pakistan', label: 'Karor Lal Esan' },
                                    { value: 'Kasur, Pakistan', label: 'Kasur' },
                                    { value: 'Kamalia, Pakistan', label: 'Kamalia' },
                                    { value: 'Kamoke, Pakistan', label: 'Kamoke' },
                                    { value: 'Khanewal, Pakistan', label: 'Khanewal' },
                                    { value: 'Khanpur, Pakistan', label: 'Khanpur' },
                                    { value: 'Kharian, Pakistan', label: 'Kharian' },
                                    { value: 'Khushab, Pakistan', label: 'Khushab' },
                                    { value: 'Kot Addu, Pakistan', label: 'Kot Addu' },
                                    { value: 'Jauharabad, Pakistan', label: 'Jauharabad' },
                                    { value: 'Lahore, Pakistan', label: 'Lahore' },
                                    { value: 'Lalamusa, Pakistan', label: 'Lalamusa' },
                                    { value: 'Layyah, Pakistan', label: 'Layyah' },
                                    { value: 'Liaquat Pur, Pakistan', label: 'Liaquat Pur' },
                                    { value: 'Lodhran, Pakistan', label: 'Lodhran' },
                                    { value: 'Malakwal, Pakistan', label: 'Malakwal' },
                                    { value: 'Mamoori, Pakistan', label: 'Mamoori' },
                                    { value: 'Mailsi, Pakistan', label: 'Mailsi' },
                                    { value: 'Mandi Bahauddin, Pakistan', label: 'Mandi Bahauddin' },
                                    { value: 'Mian Channu, Pakistan', label: 'Mian Channu' },
                                    { value: 'Mianwali, Pakistan', label: 'Mianwali' },
                                    { value: 'Multan, Pakistan', label: 'Multan' },
                                    { value: 'Murree, Pakistan', label: 'Murree' },
                                    { value: 'Muridke, Pakistan', label: 'Muridke' },
                                    { value: 'Mianwali Bangla, Pakistan', label: 'Mianwali Bangla' },
                                    { value: 'Muzaffargarh, Pakistan', label: 'Muzaffargarh' },
                                    { value: 'Narowal, Pakistan', label: 'Narowal' },
                                    { value: 'Nankana Sahib, Pakistan', label: 'Nankana Sahib' },
                                    { value: 'Okara, Pakistan', label: 'Okara' },
                                    { value: 'Renala Khurd, Pakistan', label: 'Renala Khurd' },
                                    { value: 'Pakpattan, Pakistan', label: 'Pakpattan' },
                                    { value: 'Pattoki, Pakistan', label: 'Pattoki' },
                                    { value: 'Pir Mahal, Pakistan', label: 'Pir Mahal' },
                                    { value: 'Qaimpur, Pakistan', label: 'Qaimpur' },
                                    { value: 'Qila Didar Singh, Pakistan', label: 'Qila Didar Singh' },
                                    { value: 'Rabwah, Pakistan', label: 'Rabwah' },
                                    { value: 'Raiwind, Pakistan', label: 'Raiwind' },
                                    { value: 'Rajanpur, Pakistan', label: 'Rajanpur' },
                                    { value: 'Rahim Yar Khan, Pakistan', label: 'Rahim Yar Khan' },
                                    { value: 'Rawalpindi, Pakistan', label: 'Rawalpindi' },
                                    { value: 'Sadiqabad, Pakistan', label: 'Sadiqabad' },
                                    { value: 'Safdarabad, Pakistan', label: 'Safdarabad' },
                                    { value: 'Sahiwal, Pakistan', label: 'Sahiwal' },
                                    { value: 'Sangla Hill, Pakistan', label: 'Sangla Hill' },
                                    { value: 'Sarai Alamgir, Pakistan', label: 'Sarai Alamgir' },
                                    { value: 'Sargodha, Pakistan', label: 'Sargodha' },
                                    { value: 'Shakargarh, Pakistan', label: 'Shakargarh' },
                                    { value: 'Sheikhupura, Pakistan', label: 'Sheikhupura' },
                                    { value: 'Sialkot, Pakistan', label: 'Sialkot' },
                                    { value: 'Sohawa, Pakistan', label: 'Sohawa' },
                                    { value: 'Soianwala, Pakistan', label: 'Soianwala' },
                                    { value: 'Siranwali, Pakistan', label: 'Siranwali' },
                                    { value: 'Talagang, Pakistan', label: 'Talagang' },
                                    { value: 'Taxila, Pakistan', label: 'Taxila' },
                                    { value: 'Toba Tek Singh, Pakistan', label: 'Toba Tek Singh' },
                                    { value: 'Vehari, Pakistan', label: 'Vehari' },
                                    { value: 'Wah Cantonment, Pakistan', label: 'Wah Cantonment' },
                                    { value: 'Wazirabad, Pakistan', label: 'Wazirabad' },
                                    { value: 'Badin, Pakistan', label: 'Badin' },
                                    { value: 'Bhirkan, Pakistan', label: 'Bhirkan' },
                                    { value: 'Rajo Khanani, Pakistan', label: 'Rajo Khanani' },
                                    { value: 'Chak, Pakistan', label: 'Chak' },
                                    { value: 'Dadu, Pakistan', label: 'Dadu' },
                                    { value: 'Digri, Pakistan', label: 'Digri' },
                                    { value: 'Diplo, Pakistan', label: 'Diplo' },
                                    { value: 'Dokri, Pakistan', label: 'Dokri' },
                                    { value: 'Ghotki, Pakistan', label: 'Ghotki' },
                                    { value: 'Haala, Pakistan', label: 'Haala' },
                                    { value: 'Hyderabad, Pakistan', label: 'Hyderabad' },
                                    { value: 'Islamkot, Pakistan', label: 'Islamkot' },
                                    { value: 'Jacobabad, Pakistan', label: 'Jacobabad' },
                                    { value: 'Jamshoro, Pakistan', label: 'Jamshoro' },
                                    { value: 'Jungshahi, Pakistan', label: 'Jungshahi' },
                                    { value: 'Kandhkot, Pakistan', label: 'Kandhkot' },
                                    { value: 'Kandiaro, Pakistan', label: 'Kandiaro' },
                                    { value: 'Karachi, Pakistan', label: 'Karachi' },
                                    { value: 'Kashmore, Pakistan', label: 'Kashmore' },
                                    { value: 'Keti Bandar, Pakistan', label: 'Keti Bandar' },
                                    { value: 'Khairpur, Pakistan', label: 'Khairpur' },
                                    { value: 'Kotri, Pakistan', label: 'Kotri' },
                                    { value: 'Larkana, Pakistan', label: 'Larkana' },
                                    { value: 'Matiari, Pakistan', label: 'Matiari' },
                                    { value: 'Mehar, Pakistan', label: 'Mehar' },
                                    { value: 'Mirpur Khas, Pakistan', label: 'Mirpur Khas' },
                                    { value: 'Mithani, Pakistan', label: 'Mithani' },
                                    { value: 'Mithi, Pakistan', label: 'Mithi' },
                                    { value: 'Mehrabpur, Pakistan', label: 'Mehrabpur' },
                                    { value: 'Moro, Pakistan', label: 'Moro' },
                                    { value: 'Nagarparkar, Pakistan', label: 'Nagarparkar' },
                                    { value: 'Naudero, Pakistan', label: 'Naudero' },
                                    { value: 'Naushahro Feroze, Pakistan', label: 'Naushahro Feroze' },
                                    { value: 'Naushara, Pakistan', label: 'Naushara' },
                                    { value: 'Nawabshah, Pakistan', label: 'Nawabshah' },
                                    { value: 'Nazimabad, Pakistan', label: 'Nazimabad' },
                                    { value: 'Qambar, Pakistan', label: 'Qambar' },
                                    { value: 'Qasimabad, Pakistan', label: 'Qasimabad' },
                                    { value: 'Ranipur, Pakistan', label: 'Ranipur' },
                                    { value: 'Ratodero, Pakistan', label: 'Ratodero' },
                                    { value: 'Rohri, Pakistan', label: 'Rohri' },
                                    { value: 'Sakrand, Pakistan', label: 'Sakrand' },
                                    { value: 'Sanghar, Pakistan', label: 'Sanghar' },
                                    { value: 'Shahbandar, Pakistan', label: 'Shahbandar' },
                                    { value: 'Shahdadkot, Pakistan', label: 'Shahdadkot' },
                                    { value: 'Shahdadpur, Pakistan', label: 'Shahdadpur' },
                                    { value: 'Shahpur Chakar, Pakistan', label: 'Shahpur Chakar' },
                                    { value: 'Shikarpaur, Pakistan', label: 'Shikarpaur' },
                                    { value: 'Sukkur, Pakistan', label: 'Sukkur' },
                                    { value: 'Tangwani, Pakistan', label: 'Tangwani' },
                                    { value: 'Tando Adam Khan, Pakistan', label: 'Tando Adam Khan' },
                                    { value: 'Tando Allahyar, Pakistan', label: 'Tando Allahyar' },
                                    { value: 'Tando Muhammad Khan, Pakistan', label: 'Tando Muhammad Khan' },
                                    { value: 'Thatta, Pakistan', label: 'Thatta' },
                                    { value: 'Umerkot, Pakistan', label: 'Umerkot' },
                                    { value: 'Warah, Pakistan', label: 'Warah' },
                                    { value: 'Abbottabad, Pakistan', label: 'Abbottabad' },
                                    { value: 'Adezai, Pakistan', label: 'Adezai' },
                                    { value: 'Alpuri, Pakistan', label: 'Alpuri' },
                                    { value: 'Akora Khattak, Pakistan', label: 'Akora Khattak' },
                                    { value: 'Ayubia, Pakistan', label: 'Ayubia' },
                                    { value: 'Banda Daud Shah, Pakistan', label: 'Banda Daud Shah' },
                                    { value: 'Bannu, Pakistan', label: 'Bannu' },
                                    { value: 'Batkhela, Pakistan', label: 'Batkhela' },
                                    { value: 'Battagram, Pakistan', label: 'Battagram' },
                                    { value: 'Birote, Pakistan', label: 'Birote' },
                                    { value: 'Chakdara, Pakistan', label: 'Chakdara' },
                                    { value: 'Charsadda, Pakistan', label: 'Charsadda' },
                                    { value: 'Chitral, Pakistan', label: 'Chitral' },
                                    { value: 'Daggar, Pakistan', label: 'Daggar' },
                                    { value: 'Dargai, Pakistan', label: 'Dargai' },
                                    { value: 'Darya Khan, Pakistan', label: 'Darya Khan' },
                                    { value: 'Dera Ismail Khan, Pakistan', label: 'Dera Ismail Khan' },
                                    { value: 'Doaba, Pakistan', label: 'Doaba' },
                                    { value: 'Dir, Pakistan', label: 'Dir' },
                                    { value: 'Drosh, Pakistan', label: 'Drosh' },
                                    { value: 'Hangu, Pakistan', label: 'Hangu' },
                                    { value: 'Haripur, Pakistan', label: 'Haripur' },
                                    { value: 'Karak, Pakistan', label: 'Karak' },
                                    { value: 'Kohat, Pakistan', label: 'Kohat' },
                                    { value: 'Kulachi, Pakistan', label: 'Kulachi' },
                                    { value: 'Lakki Marwat, Pakistan', label: 'Lakki Marwat' },
                                    { value: 'Latamber, Pakistan', label: 'Latamber' },
                                    { value: 'Madyan, Pakistan', label: 'Madyan' },
                                    { value: 'Mansehra, Pakistan', label: 'Mansehra' },
                                    { value: 'Mardan, Pakistan', label: 'Mardan' },
                                    { value: 'Mastuj, Pakistan', label: 'Mastuj' },
                                    { value: 'Mingora, Pakistan', label: 'Mingora' },
                                    { value: 'Nowshera, Pakistan', label: 'Nowshera' },
                                    { value: 'Paharpur, Pakistan', label: 'Paharpur' },
                                    { value: 'Pabbi, Pakistan', label: 'Pabbi' },
                                    { value: 'Peshawar, Pakistan', label: 'Peshawar' },
                                    { value: 'Saidu Sharif, Pakistan', label: 'Saidu Sharif' },
                                    { value: 'Shorkot, Pakistan', label: 'Shorkot' },
                                    { value: 'Shewa Adda, Pakistan', label: 'Shewa Adda' },
                                    { value: 'Swabi, Pakistan', label: 'Swabi' },
                                    { value: 'Swat, Pakistan', label: 'Swat' },
                                    { value: 'Tangi, Pakistan', label: 'Tangi' },
                                    { value: 'Tank, Pakistan', label: 'Tank' },
                                    { value: 'Thall, Pakistan', label: 'Thall' },
                                    { value: 'Timergara, Pakistan', label: 'Timergara' },
                                    { value: 'Tordher, Pakistan', label: 'Tordher' },
                                    { value: 'Awaran, Pakistan', label: 'Awaran' },
                                    { value: 'Barkhan, Pakistan', label: 'Barkhan' },
                                    { value: 'Chagai, Pakistan', label: 'Chagai' },
                                    { value: 'Dera Bugti, Pakistan', label: 'Dera Bugti' },
                                    { value: 'Gwadar, Pakistan', label: 'Gwadar' },
                                    { value: 'Harnai, Pakistan', label: 'Harnai' },
                                    { value: 'Jafarabad, Pakistan', label: 'Jafarabad' },
                                    { value: 'Jhal Magsi, Pakistan', label: 'Jhal Magsi' },
                                    { value: 'Kacchi, Pakistan', label: 'Kacchi' },
                                    { value: 'Kalat, Pakistan', label: 'Kalat' },
                                    { value: 'Kech, Pakistan', label: 'Kech' },
                                    { value: 'Kharan, Pakistan', label: 'Kharan' },
                                    { value: 'Khuzdar, Pakistan', label: 'Khuzdar' },
                                    { value: 'Killa Abdullah, Pakistan', label: 'Killa Abdullah' },
                                    { value: 'Killa Saifullah, Pakistan', label: 'Killa Saifullah' },
                                    { value: 'Kohlu, Pakistan', label: 'Kohlu' },
                                    { value: 'Lasbela, Pakistan', label: 'Lasbela' },
                                    { value: 'Lehri, Pakistan', label: 'Lehri' },
                                    { value: 'Loralai, Pakistan', label: 'Loralai' },
                                    { value: 'Mastung, Pakistan', label: 'Mastung' },
                                    { value: 'Musakhel, Pakistan', label: 'Musakhel' },
                                    { value: 'Naseerabad, Pakistan', label: 'Naseerabad' },
                                    { value: 'Nushki, Pakistan', label: 'Nushki' },
                                    { value: 'Panjgur, Pakistan', label: 'Panjgur' },
                                    { value: 'Pishin Valley, Pakistan', label: 'Pishin Valley' },
                                    { value: 'Quetta, Pakistan', label: 'Quetta' },
                                    { value: 'Sherani, Pakistan', label: 'Sherani' },
                                    { value: 'Sibi, Pakistan', label: 'Sibi' },
                                    { value: 'Sohbatpur, Pakistan', label: 'Sohbatpur' },
                                    { value: 'Washuk, Pakistan', label: 'Washuk' },
                                    { value: 'Zhob, Pakistan', label: 'Zhob' },
                                    { value: 'Ziarat, Pakistan', label: 'Ziarat' },
                                    { value: 'Aliabad, Pakistan', label: 'Aliabad' },
                                    { value: 'Astore, Pakistan', label: 'Astore' },
                                    { value: 'Chilas, Pakistan', label: 'Chilas' },
                                    { value: 'Ghanche, Pakistan', label: 'Ghanche' },
                                    { value: 'Gilgit, Pakistan', label: 'Gilgit' },
                                    { value: 'Gulmit, Pakistan', label: 'Gulmit' },
                                    { value: 'Hunza, Pakistan', label: 'Hunza' },
                                    { value: 'Nagar, Pakistan', label: 'Nagar' },
                                    { value: 'Skardu, Pakistan', label: 'Skardu' }
                                ]}
                            />
                            {errors.location && <h1 className='text-danger mt-[-15px] mb-6'>{errors.location}</h1>}


                            <p className='field-heading pb-2 text-stone-200'>Description</p>
                            <TextArea value={isDescription} placeholder='Write description here...' allowClear style={{ width: '100%', height: 120, fontSize: '18px', marginBottom: 20 }} onChange={handleDescriptionChange} />
                            {errors.description && <h1 className='text-danger mt-[-15px] mb-6'>{errors.description}</h1>}


                            <p className='field-heading pt-2 pb-2 text-stone-200'>Images</p>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (

                                    <fieldset className="upload__image-wrapper upload-container flex flex-wrap justify-left border-2 border-stone-200 mb-8 rounded-lg">
                                        <legend className='text-stone-300 ml-6 pl-2 pr-2'>Gold Images (Max - 8)</legend>

                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item image-container text-center w-32 border-2 border-stone-200 bg-stone-200/30 text-black rounded-lg mt-5 mb-5 ml-5 p-2 cursor-pointer">
                                                <img className='m-auto mt-1 mb-2 h-14 rounded-lg' src={image['data_url']} alt="" />
                                                <div className="image-item__btn-wrapper flex flex-wrap justify-center">
                                                    <img className='single-image-icon w-5 mr-2 transform duration-300 hover:scale-110' src='/images/update.png' onClick={() => onImageUpdate(index)} alt='update' />
                                                    <img className='single-image-icon w-5 ml-2 transform duration-300 hover:scale-110' src='/images/remove.png' onClick={() => onImageRemove(index)} alt='remove' />
                                                </div>
                                            </div>
                                        ))}

                                        {images.length < 8 && (<div className='upload-button text-center w-28 border-2 border-stone-200 bg-stone-200/30 text-black rounded-lg mt-5 mb-5 ml-5 p-2 cursor-pointer duration-300 hover:border-yellow-600 hover:text-yellow-600'
                                            style={isDragging ? { color: 'white' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <img className='uploader-icon w-10 m-auto mb-3 transform duration-300 hover:scale-110' src='/images/add.png' alt="add" />
                                            Click / Drop
                                        </div>
                                        )}
                                        &nbsp;
                                        <div onClick={() => setOpen(true)} className='upload-button text-center w-28 border-2 border-stone-200 bg-stone-200/30 text-black rounded-lg m-5 p-2 cursor-pointer duration-300 hover:border-danger-600 hover:text-danger-600'>
                                            <img className='uploader-icon w-10 m-auto mb-3 transform duration-300 hover:scale-110' src='/images/remove.png' alt="remove" />
                                            Drop Images
                                        </div>

                                    </fieldset>
                                )}

                            </ImageUploading>
                            {errors.images && <h1 className='text-danger mt-[-15px] mb-6'>{errors.images}</h1>}

                            <Modal isOpen={closeOpen} onClose={() => setCloseOpen(false)}>
                                <>
                                    <h1 className='modal-heading text-stone-700 text-xl font-bold p-2'>Confirm Removal</h1>
                                    <h3 className='modal-text p-2 text-lg font-semibold text-stone-700 '>Are you sure you want to remove all images?</h3>
                                    <button className='modal-button-ok font-semibold border-2 border-danger-600 text-danger-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-4 p-1 m-5 rounded-lg' onClick={handleRemoveAllImages}>Confirm</button>
                                    <button className='modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-4 p-1 rounded-lg' onClick={() => setCloseOpen(false)}>Cancel</button>
                                </>
                            </Modal>



                            <p className='Note text-lg text-blue-300 pt-8 md:p-8 text-justify'>Note: The listing will again go for admin approval before getting posted which may take some time. Approval status can be seen from Profile Menu - My listings. </p>
                            <p className='text-center pt-8'>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                                >
                                    Confirm Changes
                                </button>
                            </p>

                        </div>


                    </div>

                </div>}




            </div>



        </div>
    );
}

export default MyListingDetails;