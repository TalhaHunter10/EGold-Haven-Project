import { useEffect, useState } from "react";
import { getloginStatus } from "../../services/authservice";
import { Link, useNavigate } from "react-router-dom";
import { editJewelerDetails, getCoverImagebyUrl, getJewelerDetails } from "../../services/jewelerservice";
import { TEInput } from "tw-elements-react";
import { FileAnimationsmall } from "../loader/loader";
import React from "react";
import ImageUploading from "react-images-uploading";
import { Image } from "antd";


const EditJewelerProfile = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMain , setIsLoadingMain] = useState(false)
    
    const [images, setImages] = React.useState([]);

    const [FormDataj, setFormData] = useState({
        phoneno: '',
        shopno: '',
        address: '',
    })




    const fetchdata = async () => {
        setIsLoading(true);
        try {
            const data = await getJewelerDetails();
            setFormData({
                phoneno: data.data.phoneno,
                shopno: data.data.shopno,
                address: data.data.address,
            })

            if (Array.isArray(data.data.coverimage)) {
                const imageUrls = data.data.coverimage.map(image => `${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`);
                const downloadedImages = await downloadAllImages(imageUrls);
                setImages(downloadedImages);
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

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
                    else {
                        fetchdata();
                    }
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormDataj, [name]: value
        })
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
                const response = await getCoverImagebyUrl(imageUrl);
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

    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        
        setImages(imageList);
    };

    const handleProfileChange = async (e) => {
        e.preventDefault();
        const validationErrors = {}

        if (!FormDataj.phoneno.trim()) {
            validationErrors.oldpassword = 'Phone No. is required !';
        } else if (!/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(FormDataj.phoneno)) {
            validationErrors.phoneno = 'Enter a Valid Phone No. !';
        }

        if (!FormDataj.shopno.trim()) {
            validationErrors.shopno = 'Shop / Store No is required !';
        }

        if (!FormDataj.address.trim()) {
            validationErrors.address = 'Address is required !';
        }

        if (images.length === 0) {
            validationErrors.images = 'Cover Image is required !';
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append('phoneno', FormDataj.phoneno);
            formData.append('shopno', FormDataj.shopno);
            formData.append('address', FormDataj.address);
            
            formData.append(`coverimage`, images[0].file);
            setIsLoadingMain(true)
            try {
                await editJewelerDetails(formData);
               navigate('/storepage')
                setIsLoadingMain(false)

            } catch (error) {
                setIsLoadingMain(false)
            }
        }
    }

    return (
        <div className=" p-10 ">
        {isLoading ? (<FileAnimationsmall />) :(
        <div className="mt-8 p-6 rounded-lg bg-neutral-900 alluse text-xl text-stone-200 text-center align-center justify-center">
            <p className="text-4xl text-center pb-4">Edit Jeweler Profile Information</p>
            <div className="mt-5 md:w-96 text-center m-auto">

            <TEInput
                    type="tel"
                    label="Phone no"
                    size="lg"
                    className="mb-6 text-white"
                    name='phoneno'
                    value={FormDataj.phoneno}
                    onChange={handleChange}
                ></TEInput>
                {errors.phoneno && <h1 className='text-danger mt-[-15px] mb-6'>{errors.phoneno}</h1>}

                <TEInput
                    type="text"
                    label="Shop No"
                    size="lg"
                    className="mb-6 text-white"
                    name='shopno'
                    value={FormDataj.shopno}
                    onChange={handleChange}
                ></TEInput>
                {errors.shopno && <h1 className='text-danger mt-[-15px] mb-6'>{errors.shopno}</h1>}


                <TEInput
                    type="text"
                    label="Address"
                    size="lg"
                    className="mb-6 text-white"
                    name='email'
                    value={FormDataj.address}
                    onChange={handleChange}
                ></TEInput>
                {errors.address && <h1 className='text-danger mt-[-15px] mb-6'>{errors.address}</h1>}
               
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

                                    <fieldset className="upload__image-wrapper upload-container flex flex-wrap justify-center border-2 border-stone-200 mb-4 rounded-lg">
                                        <legend className='text-stone-300 pl-2 pr-2'>Cover Image (Max: 1)</legend>

                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item image-container text-center w-1/3 border-2 border-stone-200 bg-stone-200/30 text-black rounded-lg mt-5 mb-5 p-2 cursor-pointer">
                                                <Image className='m-auto mt-1 mb-2 rounded-lg' src={image['data_url']} alt="" />
                                                <div className="image-item__btn-wrapper flex flex-wrap justify-center">
                                                    <img className='single-image-icon w-5 mr-2 transform duration-300 hover:scale-110' src='/images/update.png' onClick={() => onImageUpdate(index)} alt='update' />
                                                    <img className='single-image-icon w-5 ml-2 transform duration-300 hover:scale-110' src='/images/remove.png' onClick={() => onImageRemove(index)} alt='remove' />
                                                </div>
                                            </div>
                                        ))}

                                        {images.length < 8 && (<div className='my-auto upload-button text-center border-2 border-stone-200 bg-stone-200/30 text-black rounded-lg mt-5 mb-5 ml-5 p-2 cursor-pointer duration-300 hover:border-yellow-600 hover:text-yellow-600'
                                            style={isDragging ? { color: 'white' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <img className='mt-auto uploader-icon w-10 mx-auto mb-3 transform duration-300 hover:scale-110' src='/images/add.png' alt="add" />
                                            <p>Click / Drop</p>
                                        </div>
                                        )}
                                        
                                        

                                    </fieldset>
                                )}

                            </ImageUploading>
                            {errors.images && <h1 className='text-danger mt-[-15px] mb-6'>{errors.images}</h1>}
                            <p className='Note text-lg text-blue-300 pt-4 md:p-2 text-justify'>Note: Do not add the city in the address as it is already saved and can not be changed. </p>


                <button className="m-2 px-10 alluse inline-block rounded bg-warning-600 pb-2.5 pt-3 font-semibold text-sm uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600" onClick={handleProfileChange}>
                    <p className="">Save</p>
                </button>
            </div>

        </div>
        )};
        <div className="text-stone-200 border-2 border-yellow-600 p-10 rounded-lg ml-10 mr-10 mt-10">
                <h1 className="headingtextlanding pl-8">Want to showcase your gold products on <span className="text-yellow-600">EGold Haven?</span></h1>
                <p className="buttontextlanding text-right mt-4 mr-8">
                    <Link
                       to="/addproduct"
                        className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
                        Add Product
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default EditJewelerProfile;