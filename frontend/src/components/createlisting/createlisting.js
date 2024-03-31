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
const { TextArea } = Input;


const CreateListing = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const status = await getloginStatus();
                if (!status.verified) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, []);


    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [isCategory, setIsCategory] = useState('');
    const [isTitle, setIsTitle] = useState('');
    const [isDescription, setIsDescription] = useState('');
    const [isPrice, setIsPrice] = useState('');
    const [isKarats, setIsKarats] = useState('');
    const [isWeight, setIsWeight] = useState('');
    const [isStones, setIsStones] = useState('');
    const [isLocation, setIsLocation] = useState('');

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

            setIsLoading(true)
            try {
                const data = await createListing(formData);
                if (data) {
                    navigate('/mylistings');
                    setIsLoading(false)
                }

            } catch (error) {
                setIsLoading(false)
            }

        } else {
            toast.error('Please remove the field error !!')
        }

    };


    return (
        <div className='p-5'>
            {isLoading && <Loader />}
            <p className='createListingHeading text-center pt-5 text-stone-200'>
                CREATE LISTING
            </p>

            <form className='p-10 m-5 border-2 border-yellow-600 rounded-lg'>

                <p className='formheading text-4xl pt-4 pb-4 text-stone-200 border-b-2 border-yellow-600 '>Fill The Listing Details</p>

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
                            value: 'Coins & Bars',
                            label: 'Coins & Bars',
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


                <p className='field-heading pb-2 text-stone-200'>Stones</p>
                <Select className='' style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleStonesChange}
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
                <Select placeholder="Select the city" style={{ width: '100%', height: 40, marginBottom: 20 }} onChange={handleLocationChange}
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



                <p className='Note text-lg text-blue-300 pt-8 md:p-8 text-justify'>Note: The listing will go for admin approval before getting posted which may take some time. Approval status can be seen from Profile Menu - View listings. </p>
                <p className='text-center pt-8'>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                        Sell
                    </button>
                </p>
            </form>
        </div>
    );
};

export default CreateListing;