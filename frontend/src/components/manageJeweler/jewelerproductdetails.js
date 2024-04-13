import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel, Input, InputNumber, Select } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { deleteProductById, editProduct, getImageByUrl, getProductsById } from '../../services/productservice';
import { FileAnimation, Loader } from '../loader/loader';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';
import ImageUploading from 'react-images-uploading';
import { getloginStatus } from '../../services/authservice';
import Modal from '../Modal';

const JewelerProductDetails = () => {

    const navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(useSelector(selectIsLoggedIn));
    const [open, setOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const { id } = useParams();
    const [Product, setProduct] = useState({});

    const [isCategory, setIsCategory] = useState('');
    const [isTitle, setIsTitle] = useState('');
    const [isDescription, setIsDescription] = useState('');
    const [isPrice, setIsPrice] = useState('');
    const [isKarats, setIsKarats] = useState('');
    const [isWeight, setIsWeight] = useState('');
    const [isWorking, setIsWorking] = React.useState(false);
    const [images, setImages] = React.useState([]);


    const fetchProductAndImages = async () => {
        setIsLoading(true);
        try {
            const data = await getProductsById(id)
            if (!data) {
                navigate('/');
                return;
            }

            const fetchedProduct = data.product;
            setProduct(fetchedProduct);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Product and images:', error);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const status = await getloginStatus();
                if (!status.verified) {
                    navigate('/login');
                } else {
                    if (status.status != "jeweler") {
                        setIsLoggedIn(true)
                        navigate('/')
                    }
                    else {
                        fetchProductAndImages();
                    }
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);


    const loadEditProduct = async () => {
        setShowEdit(true);
        setIsLoading(true);
        setIsCategory(Product.category);
        setIsTitle(Product.title);
        setIsDescription(Product.description);
        setIsPrice(Product.price);
        setIsKarats(Product.karats);
        setIsWeight(Product.weights.tola);

        if (Array.isArray(Product.images)) {
            const imageUrls = Product.images.map(image => `${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`);
            const downloadedImages = await downloadAllImages(imageUrls);
            setImages(downloadedImages);
        }

        setIsLoading(false);
    }


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

    const handleDeleteProduct = async () => {
        if (!isLoggedIn) {
            toast.error('Login first to delete Product !')
            navigate('/login')
            return
        }
        setIsWorking(true)
        try {
            await deleteProductById(id);
            navigate('/storepage')
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

    const onWeightChange = (value) => {
        setIsWeight(value);
    };


    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
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
            toast.error('Login first to create Product')
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
            formData.append('status', 'pending approval');
            formData.append('ProductID', id);

            setIsWorking(true)
            try {
                const data = await editProduct(formData);
                if (data) {
                    navigate('/storepage');
                }
                setIsWorking(false)

            } catch (error) {
                setIsWorking(false)
            }

        } else {
            toast.error('Please remove the field error !!')
        }

    };



    return (
        <div className='min-[250px]:p-8 md:p-12'>
            {isLoading && <FileAnimation />}
            {isWorking && <Loader />}

            <div className="flex flex-wrap justify-between mb-5 text-center">
                <h1 className="m-auto md:m-0 alluse text-4xl text-stone-200 pb-3">My Product Details</h1>
                <div className="m-auto md:m-0">
                    <button onClick={() => setShowEdit(false)} className="m-1 md:m-2 px-1 md:px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-xs md:text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        <p className="">View Product</p>
                    </button>
                    <button onClick={loadEditProduct} className="m-1 md:m-2 px-1 md:px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-xs md:text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" >
                        <p className="">Edit Product</p>
                    </button>
                    <button onClick={() => setOpen(true)} className="m-1 md:m-2 px-1 md:px-3 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-xs md:text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        <p className="">Delete Product</p>
                    </button>
                </div>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <>
                    <h1 className='modal-heading text-stone-700 text-2xl font-bold p-2'>Confirm Deletion</h1>
                    <h3 className='modal-text p-3 text-justify font-semibold text-base text-stone-700 '>Are you sure you want to delete this Product ? </h3>
                    <button className='ml-3 modal-button-cancel font-semibold border-2 border-danger-600 text-danger-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg' onClick={handleDeleteProduct}>Yes</button>
                    <button className='ml-3 modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg' onClick={() => setOpen(false)}>Cancel</button>
                </>
            </Modal>


            <div className=" p-4">

                {!showEdit && (<div className='mt-3 mr-0 ml-0 md:mr-20 md:ml-20'>

                    <Carousel className='m-8 mt-2 p-8' arrows {...settings} dots>
                        {Product.images && Product.images.map((image, index) => (
                            <div key={index} className=''>
                                <img className='aspect-video w-[100%]  object-contain' src={`${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>


                    <div className=' p-8 rounded-md bg-neutral-900'>

                        <div className='flex justify-between'>
                            <p className='alluse font-semibold text-4xl text-stone-200 tracking-wider'>
                                Rs. {formatPriceWithCommas(parseInt(Product.price))}
                            </p>

                        </div>

                        {Product && Product.title && (<p className='pt-2 alluse text-3xl text-right text-stone-200'>
                            {Product.title.split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                        </p>
                        )}

                        <div className='flex justify-between pt-5'>
                            <div className='flex justify-start'>
                                
                            </div>

                            <p className='alluse text-base text-stone-200'>{getTimeSinceCreation(Product.createdAt)}</p>

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
                                            {Product.category}
                                        </div>
                                    </div>

                                    <div className='flex justify-between ml-6 mr-6 md:w-1/2'>
                                        <div className='p-1 w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold'>
                                            Weight (gram)
                                        </div>
                                        <div className=' p-1 w-[100%] md:w-auto text-center md:text-left'>
                                        <p className='md:text-right'>{Product.weights && parseFloat(Product.weights.gram).toFixed(2)} gram</p>
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
                                            {Product.karats}
                                        </div>
                                    </div>
                                    <div className='flex justify-between ml-6 mr-6  md:w-1/2'>
                                        <div className='p-1 my-auto w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold'>
                                            Weight (tola)
                                        </div>
                                        <div className='p-1 w-[100%] md:w-auto text-center md:text-left'>
                                            <p className='md:text-right'>{Product.weights && parseFloat(Product.weights.tola).toFixed(2)} tola</p>
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
                            {Product.description}
                        </p>
                    </div>


                </div>)}

                {showEdit && <div>
                    <div className='md:m-2 p-5 bg-neutral-900 rounded-lg'>
                        <h1 className='alluse text-4xl text-stone-200 md:pb-8 text-center'>Edit Product</h1>

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
                                        value: 'Others',
                                        label: 'Others',
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

                            <div className='border-b-2 border-yellow-600 mt-6 mb-6'></div>


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



                            <p className='Note text-lg text-blue-300 pt-8 md:p-8 text-justify'>Note: The Product will again go for admin approval before getting posted which may take some time. Approval status can be seen from Profile Menu - My Products. </p>
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

export default JewelerProductDetails;