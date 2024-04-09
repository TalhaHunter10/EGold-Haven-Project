import React, { useEffect, useState } from 'react';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { useNavigate } from 'react-router-dom';
import { Select, Input, InputNumber } from 'antd';
import ImageUploading from 'react-images-uploading'
import { createListing } from '../../services/listingservice';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { Loader } from '../loader/loader';
import Modal from '../Modal';
import { getloginStatus } from '../../services/authservice';
import { addProduct } from '../../services/productservice';
const { TextArea } = Input;

const AddProduct = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [isCategory, setIsCategory] = useState('');
    const [isTitle, setIsTitle] = useState('');
    const [isDescription, setIsDescription] = useState('');
    const [isPrice, setIsPrice] = useState('');
    const [isKarats, setIsKarats] = useState('');
    const [isWeight, setIsWeight] = useState('');

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


    const [images, setImages] = React.useState([]);

    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const [open, setOpen] = React.useState(false);
 

    const handleRemoveAllImages = () => {
        setImages([]);
        setOpen(false);
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

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

            setIsLoading(true)
            try {
                const data = await addProduct(formData);
                if (data) {
                    navigate('/storepage');
                    setIsLoading(false)
                }

            } catch (error) {
                setIsLoading(false)
            }

        } else {
            toast.error('Please remove the field error !!')
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
                        navigate('/')
                    }
                    
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);
    
        return (
            <div className='p-5'>
            {isLoading && <Loader />}
            <p className='createListingHeading text-center pt-5 text-stone-200'>
                Add Product
            </p>

            <form className='p-10 m-5  rounded-lg bg-neutral-900'>

                <p className='formheading text-4xl pt-4 pb-4 text-stone-200 border-b-2 border-yellow-600 '>Fill The Product Details</p>

                <p className='field-heading pt-6 pb-2 text-stone-200'>Category</p>
                <Select className="" style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleCategoryChange}
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
                <Input style={{ width: '100%', height: 40, fontSize: '18px', marginBottom: 20 }} onChange={handleTitleChange} />
                {errors.title && <h1 className='text-danger mt-[-15px] mb-6'>{errors.title}</h1>}

                <div className='border-b-2 border-yellow-600 mt-6 mb-6'></div>


                <p className='field-heading pb-2 text-stone-200'>Price</p>
                <InputNumber min={1} style={{ width: '100%', height: 40, fontSize: '18px', marginBottom: 1 }} formatter={value => `${value}`} parser={value => value.replace(/\$\s?|(,*)/g, '')} onChange={onPriceChange} />;
                {errors.price && <h1 className='text-danger mt-[-15px] mb-6'>{errors.price}</h1>}

                <p className='field-heading pb-2 text-stone-200'>Karats</p>
                <Select className='' style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleKaratsChange}
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
                <InputNumber style={{ width: '100%', height: 40, fontSize: '18px', marginBottom: 20 }} onChange={onWeightChange} />
                {errors.weight && <h1 className='text-danger mt-[-15px] mb-6'>{errors.weight}</h1>}


                <div className='border-b-2 border-yellow-600 mt-6 mb-6'></div>



                <p className='field-heading pb-2 text-stone-200'>Description</p>
                <TextArea placeholder='Write description here...' allowClear style={{ width: '100%', height: 120, fontSize: '18px', marginBottom: 20 }} onChange={handleDescriptionChange} />
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

                <Modal isOpen={open} onClose={() => setOpen(false)}>
                <>
                    <h1 className='modal-heading text-stone-700 text-xl font-bold p-2'>Confirm Removal</h1>
                    <h3 className='modal-text p-2 text-lg font-semibold text-stone-700 '>Are you sure you want to remove all images?</h3>
                    <button className='modal-button-ok font-semibold border-2 border-danger-600 text-danger-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-4 p-1 m-5 rounded-lg' onClick={handleRemoveAllImages}>Confirm</button>
                    <button className='modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-4 p-1 rounded-lg' onClick={() => setOpen(false)}>Cancel</button>
                </>
            </Modal>



                <p className='Note text-lg text-blue-300 pt-8 md:p-8 text-justify'>Note: The Product will go for admin approval before getting posted which may take some time. Approval status can be seen from Store Page - Store Products </p>
                <p className='text-center pt-8'>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                        Add Product
                    </button>
                </p>
            </form>
        </div>
        )

}

export default AddProduct