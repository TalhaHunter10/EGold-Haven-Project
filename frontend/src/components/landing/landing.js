import React, { useEffect, useState } from "react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import ContainerVertical from "../listingcontainers/containervertical";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectStatus,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Button, Form, Input, Modal, Select } from "antd";
import { getLiveListings } from "../../services/listingservice";
import { FileAnimationsmall } from "../loader/loader";
import ContainerVertical2 from "../listingcontainers/containervertical2";
import { getloginStatus } from "../../services/authservice";
import { getLiveProducts } from "../../services/productservice";
import ContainerVerticalProduct from "../productcontainers/containerverticalproduct";
import ContainerVerticalProduct2 from "../productcontainers/containerverticalproduct2";
import { ChatState } from "../chat/ChatProvider";
const { Option } = Select;

const Landing = () => {
  const { user } = ChatState();

  const [isLoggedIn, setIsLoggedIn] = useState(useSelector(selectIsLoggedIn));

  const [listing, setListing] = useState([]);

  const fetchlistings = async () => {
    try {
      const data = await getLiveListings();
      setListing(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [products, setProducts] = useState([]);

  const fetchproducts = async () => {
    try {
      const data = await getLiveProducts();
      setProducts(data.liveProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await getloginStatus();
        if (!status.verified) {
          setIsLoggedIn(false);
          fetchlistings();
          fetchproducts();
        } else {
          fetchlistings();
          fetchproducts();
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const userstatus = useSelector(selectStatus);

  const handlelisting = (e) => {
    if (isLoggedIn) {
      navigate("/createlisting");
    } else {
      toast.error("Login first to create listing !");
      navigate("/login");
    }
  };

  const handleRequest = () => {
    if (isLoggedIn) {
      if (userstatus === "requested") {
        showModal();
      } else if (userstatus === "user") {
        navigate("/jewelerrequest");
      }
    } else {
      toast.error("Please login first to request for Jeweler status ! ");
      navigate("/login");
    }
  };

  const [filters, setFilters] = useState({
    search: "",
    location: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();

    if (filters.search === "") {
      toast.error("Please enter a search term !");
      return;
    } else if (filters.location === "") {
      navigate(`/listings?search=${filters.search}`);
    } else {
      navigate(
        `/listings?search=${filters.search}&location=${filters.location}`
      );
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFilters({ ...filters, location: value });
  };

  const options = [
    { value: "Islamabad, Pakistan", label: "Islamabad" },
    { value: "Ahmed Nager Chatha, Pakistan", label: "Ahmed Nager Chatha" },
    { value: "Ahmadpur East, Pakistan", label: "Ahmadpur East" },
    { value: "Ali Khan Abad, Pakistan", label: "Ali Khan Abad" },
    { value: "Alipur, Pakistan", label: "Alipur" },
    { value: "Arifwala, Pakistan", label: "Arifwala" },
    { value: "Attock, Pakistan", label: "Attock" },
    { value: "Bhera, Pakistan", label: "Bhera" },
    { value: "Bhalwal, Pakistan", label: "Bhalwal" },
    { value: "Bahawalnagar, Pakistan", label: "Bahawalnagar" },
    { value: "Bahawalpur, Pakistan", label: "Bahawalpur" },
    { value: "Bhakkar, Pakistan", label: "Bhakkar" },
    { value: "Burewala, Pakistan", label: "Burewala" },
    { value: "Chillianwala, Pakistan", label: "Chillianwala" },
    { value: "Chakwal, Pakistan", label: "Chakwal" },
    { value: "Chichawatni, Pakistan", label: "Chichawatni" },
    { value: "Chiniot, Pakistan", label: "Chiniot" },
    { value: "Chishtian, Pakistan", label: "Chishtian" },
    { value: "Daska, Pakistan", label: "Daska" },
    { value: "Darya Khan, Pakistan", label: "Darya Khan" },
    { value: "Dera Ghazi Khan, Pakistan", label: "Dera Ghazi Khan" },
    { value: "Dhaular, Pakistan", label: "Dhaular" },
    { value: "Dina, Pakistan", label: "Dina" },
    { value: "Dinga, Pakistan", label: "Dinga" },
    { value: "Dipalpur, Pakistan", label: "Dipalpur" },
    { value: "Faisalabad, Pakistan", label: "Faisalabad" },
    { value: "Ferozewala, Pakistan", label: "Ferozewala" },
    { value: "Fateh Jhang, Pakistan", label: "Fateh Jhang" },
    { value: "Ghakhar Mandi, Pakistan", label: "Ghakhar Mandi" },
    { value: "Gojra, Pakistan", label: "Gojra" },
    { value: "Gujranwala, Pakistan", label: "Gujranwala" },
    { value: "Gujrat, Pakistan", label: "Gujrat" },
    { value: "Gujar Khan, Pakistan", label: "Gujar Khan" },
    { value: "Hafizabad, Pakistan", label: "Hafizabad" },
    { value: "Haroonabad, Pakistan", label: "Haroonabad" },
    { value: "Hasilpur, Pakistan", label: "Hasilpur" },
    { value: "Haveli Lakha, Pakistan", label: "Haveli Lakha" },
    { value: "Jatoi, Pakistan", label: "Jatoi" },
    { value: "Jalalpur, Pakistan", label: "Jalalpur" },
    { value: "Jattan, Pakistan", label: "Jattan" },
    { value: "Jampur, Pakistan", label: "Jampur" },
    { value: "Jaranwala, Pakistan", label: "Jaranwala" },
    { value: "Jhang, Pakistan", label: "Jhang" },
    { value: "Jhelum, Pakistan", label: "Jhelum" },
    { value: "Kalabagh, Pakistan", label: "Kalabagh" },
    { value: "Karor Lal Esan, Pakistan", label: "Karor Lal Esan" },
    { value: "Kasur, Pakistan", label: "Kasur" },
    { value: "Kamalia, Pakistan", label: "Kamalia" },
    { value: "Kamoke, Pakistan", label: "Kamoke" },
    { value: "Khanewal, Pakistan", label: "Khanewal" },
    { value: "Khanpur, Pakistan", label: "Khanpur" },
    { value: "Kharian, Pakistan", label: "Kharian" },
    { value: "Khushab, Pakistan", label: "Khushab" },
    { value: "Kot Addu, Pakistan", label: "Kot Addu" },
    { value: "Jauharabad, Pakistan", label: "Jauharabad" },
    { value: "Lahore, Pakistan", label: "Lahore" },
    { value: "Lalamusa, Pakistan", label: "Lalamusa" },
    { value: "Layyah, Pakistan", label: "Layyah" },
    { value: "Liaquat Pur, Pakistan", label: "Liaquat Pur" },
    { value: "Lodhran, Pakistan", label: "Lodhran" },
    { value: "Malakwal, Pakistan", label: "Malakwal" },
    { value: "Mamoori, Pakistan", label: "Mamoori" },
    { value: "Mailsi, Pakistan", label: "Mailsi" },
    { value: "Mandi Bahauddin, Pakistan", label: "Mandi Bahauddin" },
    { value: "Mian Channu, Pakistan", label: "Mian Channu" },
    { value: "Mianwali, Pakistan", label: "Mianwali" },
    { value: "Multan, Pakistan", label: "Multan" },
    { value: "Murree, Pakistan", label: "Murree" },
    { value: "Muridke, Pakistan", label: "Muridke" },
    { value: "Mianwali Bangla, Pakistan", label: "Mianwali Bangla" },
    { value: "Muzaffargarh, Pakistan", label: "Muzaffargarh" },
    { value: "Narowal, Pakistan", label: "Narowal" },
    { value: "Nankana Sahib, Pakistan", label: "Nankana Sahib" },
    { value: "Okara, Pakistan", label: "Okara" },
    { value: "Renala Khurd, Pakistan", label: "Renala Khurd" },
    { value: "Pakpattan, Pakistan", label: "Pakpattan" },
    { value: "Pattoki, Pakistan", label: "Pattoki" },
    { value: "Pir Mahal, Pakistan", label: "Pir Mahal" },
    { value: "Qaimpur, Pakistan", label: "Qaimpur" },
    { value: "Qila Didar Singh, Pakistan", label: "Qila Didar Singh" },
    { value: "Rabwah, Pakistan", label: "Rabwah" },
    { value: "Raiwind, Pakistan", label: "Raiwind" },
    { value: "Rajanpur, Pakistan", label: "Rajanpur" },
    { value: "Rahim Yar Khan, Pakistan", label: "Rahim Yar Khan" },
    { value: "Rawalpindi, Pakistan", label: "Rawalpindi" },
    { value: "Sadiqabad, Pakistan", label: "Sadiqabad" },
    { value: "Safdarabad, Pakistan", label: "Safdarabad" },
    { value: "Sahiwal, Pakistan", label: "Sahiwal" },
    { value: "Sangla Hill, Pakistan", label: "Sangla Hill" },
    { value: "Sarai Alamgir, Pakistan", label: "Sarai Alamgir" },
    { value: "Sargodha, Pakistan", label: "Sargodha" },
    { value: "Shakargarh, Pakistan", label: "Shakargarh" },
    { value: "Sheikhupura, Pakistan", label: "Sheikhupura" },
    { value: "Sialkot, Pakistan", label: "Sialkot" },
    { value: "Sohawa, Pakistan", label: "Sohawa" },
    { value: "Soianwala, Pakistan", label: "Soianwala" },
    { value: "Siranwali, Pakistan", label: "Siranwali" },
    { value: "Talagang, Pakistan", label: "Talagang" },
    { value: "Taxila, Pakistan", label: "Taxila" },
    { value: "Toba Tek Singh, Pakistan", label: "Toba Tek Singh" },
    { value: "Vehari, Pakistan", label: "Vehari" },
    { value: "Wah Cantonment, Pakistan", label: "Wah Cantonment" },
    { value: "Wazirabad, Pakistan", label: "Wazirabad" },
    { value: "Badin, Pakistan", label: "Badin" },
    { value: "Bhirkan, Pakistan", label: "Bhirkan" },
    { value: "Rajo Khanani, Pakistan", label: "Rajo Khanani" },
    { value: "Chak, Pakistan", label: "Chak" },
    { value: "Dadu, Pakistan", label: "Dadu" },
    { value: "Digri, Pakistan", label: "Digri" },
    { value: "Diplo, Pakistan", label: "Diplo" },
    { value: "Dokri, Pakistan", label: "Dokri" },
    { value: "Ghotki, Pakistan", label: "Ghotki" },
    { value: "Haala, Pakistan", label: "Haala" },
    { value: "Hyderabad, Pakistan", label: "Hyderabad" },
    { value: "Islamkot, Pakistan", label: "Islamkot" },
    { value: "Jacobabad, Pakistan", label: "Jacobabad" },
    { value: "Jamshoro, Pakistan", label: "Jamshoro" },
    { value: "Jungshahi, Pakistan", label: "Jungshahi" },
    { value: "Kandhkot, Pakistan", label: "Kandhkot" },
    { value: "Kandiaro, Pakistan", label: "Kandiaro" },
    { value: "Karachi, Pakistan", label: "Karachi" },
    { value: "Kashmore, Pakistan", label: "Kashmore" },
    { value: "Keti Bandar, Pakistan", label: "Keti Bandar" },
    { value: "Khairpur, Pakistan", label: "Khairpur" },
    { value: "Kotri, Pakistan", label: "Kotri" },
    { value: "Larkana, Pakistan", label: "Larkana" },
    { value: "Matiari, Pakistan", label: "Matiari" },
    { value: "Mehar, Pakistan", label: "Mehar" },
    { value: "Mirpur Khas, Pakistan", label: "Mirpur Khas" },
    { value: "Mithani, Pakistan", label: "Mithani" },
    { value: "Mithi, Pakistan", label: "Mithi" },
    { value: "Mehrabpur, Pakistan", label: "Mehrabpur" },
    { value: "Moro, Pakistan", label: "Moro" },
    { value: "Nagarparkar, Pakistan", label: "Nagarparkar" },
    { value: "Naudero, Pakistan", label: "Naudero" },
    { value: "Naushahro Feroze, Pakistan", label: "Naushahro Feroze" },
    { value: "Naushara, Pakistan", label: "Naushara" },
    { value: "Nawabshah, Pakistan", label: "Nawabshah" },
    { value: "Nazimabad, Pakistan", label: "Nazimabad" },
    { value: "Qambar, Pakistan", label: "Qambar" },
    { value: "Qasimabad, Pakistan", label: "Qasimabad" },
    { value: "Ranipur, Pakistan", label: "Ranipur" },
    { value: "Ratodero, Pakistan", label: "Ratodero" },
    { value: "Rohri, Pakistan", label: "Rohri" },
    { value: "Sakrand, Pakistan", label: "Sakrand" },
    { value: "Sanghar, Pakistan", label: "Sanghar" },
    { value: "Shahbandar, Pakistan", label: "Shahbandar" },
    { value: "Shahdadkot, Pakistan", label: "Shahdadkot" },
    { value: "Shahdadpur, Pakistan", label: "Shahdadpur" },
    { value: "Shahpur Chakar, Pakistan", label: "Shahpur Chakar" },
    { value: "Shikarpaur, Pakistan", label: "Shikarpaur" },
    { value: "Sukkur, Pakistan", label: "Sukkur" },
    { value: "Tangwani, Pakistan", label: "Tangwani" },
    { value: "Tando Adam Khan, Pakistan", label: "Tando Adam Khan" },
    { value: "Tando Allahyar, Pakistan", label: "Tando Allahyar" },
    { value: "Tando Muhammad Khan, Pakistan", label: "Tando Muhammad Khan" },
    { value: "Thatta, Pakistan", label: "Thatta" },
    { value: "Umerkot, Pakistan", label: "Umerkot" },
    { value: "Warah, Pakistan", label: "Warah" },
    { value: "Abbottabad, Pakistan", label: "Abbottabad" },
    { value: "Adezai, Pakistan", label: "Adezai" },
    { value: "Alpuri, Pakistan", label: "Alpuri" },
    { value: "Akora Khattak, Pakistan", label: "Akora Khattak" },
    { value: "Ayubia, Pakistan", label: "Ayubia" },
    { value: "Banda Daud Shah, Pakistan", label: "Banda Daud Shah" },
    { value: "Bannu, Pakistan", label: "Bannu" },
    { value: "Batkhela, Pakistan", label: "Batkhela" },
    { value: "Battagram, Pakistan", label: "Battagram" },
    { value: "Birote, Pakistan", label: "Birote" },
    { value: "Chakdara, Pakistan", label: "Chakdara" },
    { value: "Charsadda, Pakistan", label: "Charsadda" },
    { value: "Chitral, Pakistan", label: "Chitral" },
    { value: "Daggar, Pakistan", label: "Daggar" },
    { value: "Dargai, Pakistan", label: "Dargai" },
    { value: "Darya Khan, Pakistan", label: "Darya Khan" },
    { value: "Dera Ismail Khan, Pakistan", label: "Dera Ismail Khan" },
    { value: "Doaba, Pakistan", label: "Doaba" },
    { value: "Dir, Pakistan", label: "Dir" },
    { value: "Drosh, Pakistan", label: "Drosh" },
    { value: "Hangu, Pakistan", label: "Hangu" },
    { value: "Haripur, Pakistan", label: "Haripur" },
    { value: "Karak, Pakistan", label: "Karak" },
    { value: "Kohat, Pakistan", label: "Kohat" },
    { value: "Kulachi, Pakistan", label: "Kulachi" },
    { value: "Lakki Marwat, Pakistan", label: "Lakki Marwat" },
    { value: "Latamber, Pakistan", label: "Latamber" },
    { value: "Madyan, Pakistan", label: "Madyan" },
    { value: "Mansehra, Pakistan", label: "Mansehra" },
    { value: "Mardan, Pakistan", label: "Mardan" },
    { value: "Mastuj, Pakistan", label: "Mastuj" },
    { value: "Mingora, Pakistan", label: "Mingora" },
    { value: "Nowshera, Pakistan", label: "Nowshera" },
    { value: "Paharpur, Pakistan", label: "Paharpur" },
    { value: "Pabbi, Pakistan", label: "Pabbi" },
    { value: "Peshawar, Pakistan", label: "Peshawar" },
    { value: "Saidu Sharif, Pakistan", label: "Saidu Sharif" },
    { value: "Shorkot, Pakistan", label: "Shorkot" },
    { value: "Shewa Adda, Pakistan", label: "Shewa Adda" },
    { value: "Swabi, Pakistan", label: "Swabi" },
    { value: "Swat, Pakistan", label: "Swat" },
    { value: "Tangi, Pakistan", label: "Tangi" },
    { value: "Tank, Pakistan", label: "Tank" },
    { value: "Thall, Pakistan", label: "Thall" },
    { value: "Timergara, Pakistan", label: "Timergara" },
    { value: "Tordher, Pakistan", label: "Tordher" },
    { value: "Awaran, Pakistan", label: "Awaran" },
    { value: "Barkhan, Pakistan", label: "Barkhan" },
    { value: "Chagai, Pakistan", label: "Chagai" },
    { value: "Dera Bugti, Pakistan", label: "Dera Bugti" },
    { value: "Gwadar, Pakistan", label: "Gwadar" },
    { value: "Harnai, Pakistan", label: "Harnai" },
    { value: "Jafarabad, Pakistan", label: "Jafarabad" },
    { value: "Jhal Magsi, Pakistan", label: "Jhal Magsi" },
    { value: "Kacchi, Pakistan", label: "Kacchi" },
    { value: "Kalat, Pakistan", label: "Kalat" },
    { value: "Kech, Pakistan", label: "Kech" },
    { value: "Kharan, Pakistan", label: "Kharan" },
    { value: "Khuzdar, Pakistan", label: "Khuzdar" },
    { value: "Killa Abdullah, Pakistan", label: "Killa Abdullah" },
    { value: "Killa Saifullah, Pakistan", label: "Killa Saifullah" },
    { value: "Kohlu, Pakistan", label: "Kohlu" },
    { value: "Lasbela, Pakistan", label: "Lasbela" },
    { value: "Lehri, Pakistan", label: "Lehri" },
    { value: "Loralai, Pakistan", label: "Loralai" },
    { value: "Mastung, Pakistan", label: "Mastung" },
    { value: "Musakhel, Pakistan", label: "Musakhel" },
    { value: "Naseerabad, Pakistan", label: "Naseerabad" },
    { value: "Nushki, Pakistan", label: "Nushki" },
    { value: "Panjgur, Pakistan", label: "Panjgur" },
    { value: "Pishin Valley, Pakistan", label: "Pishin Valley" },
    { value: "Quetta, Pakistan", label: "Quetta" },
    { value: "Sherani, Pakistan", label: "Sherani" },
    { value: "Sibi, Pakistan", label: "Sibi" },
    { value: "Sohbatpur, Pakistan", label: "Sohbatpur" },
    { value: "Washuk, Pakistan", label: "Washuk" },
    { value: "Zhob, Pakistan", label: "Zhob" },
    { value: "Ziarat, Pakistan", label: "Ziarat" },
    { value: "Aliabad, Pakistan", label: "Aliabad" },
    { value: "Astore, Pakistan", label: "Astore" },
    { value: "Chilas, Pakistan", label: "Chilas" },
    { value: "Ghanche, Pakistan", label: "Ghanche" },
    { value: "Gilgit, Pakistan", label: "Gilgit" },
    { value: "Gulmit, Pakistan", label: "Gulmit" },
    { value: "Hunza, Pakistan", label: "Hunza" },
    { value: "Nagar, Pakistan", label: "Nagar" },
    { value: "Skardu, Pakistan", label: "Skardu" },
  ];

  return (
    <div className="landing-container">
      <Modal
        title="Dear User"
        open={isModalOpen}
        onCancel={handleOk}
        footer={[
          <Button
            key="submit"
            onClick={handleOk}
            className="bg-yellow-600 border-yellow-600"
          >
            Ok
          </Button>,
        ]}
      >
        <p className="text-base alluse font-semibold">
          Your request for Jeweler Status is Pending Approval which may take
          some time.. Kindly check after 24 hours.. Thank you for being patient
          !
        </p>
      </Modal>

      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between mt-5">
        <div className="  mb-12 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 p-8 ">
          <h1 className="alluse text-4xl text-stone-200 text-center mb-6">
            Have something to <span className="text-yellow-600">SELL</span>?
          </h1>
          <p className="allusebody text-lg text-stone-200 text-justify mb-6">
            Got something special to sell?{" "}
            <span className="text-yellow-600">EGold Haven</span> makes it easy!
            Sell your gold items at EGold Haven. List your treasures, set
            prices, and connect with eager buyers effortlessly. Join now and
            turn your gold into cash with simplicity and convenience.
          </p>
          <div className="text-center mt-8 buttontextlanding">
            <button
              onClick={handlelisting}
              className=" inline-block rounded bg-warning-600 text-semibold px-16 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
            >
              Start Selling
            </button>
          </div>
        </div>

        <div className="mb-12 md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12 p-8 ">
          {userstatus === "user" || userstatus === "requested" ? (
            <div>
              <h1 className="alluse text-4xl text-stone-200 text-center mb-6">
                Professional Jewelers,{" "}
                <span className="text-yellow-600">Join Us</span>
              </h1>
              <p className="allusebody text-lg text-stone-200 text-justify mb-6">
                Attention jewelers! Join{" "}
                <span className="text-yellow-600">EGold Haven</span> to showcase
                your gold creations. Earn commissions for certifying items, and
                manage your own store page to feature your unique designs. Let
                your craft shine, and start shaping gold elegance today!
              </p>
              <div className="text-center mt-8 buttontextlanding">
                <button
                  type="button"
                  onClick={handleRequest}
                  className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-bold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  Join Platform
                </button>
              </div>
            </div>
          ) : userstatus === "jeweler" ? (
            <div>
              <h1 className="alluse text-4xl text-stone-200 text-center mb-6">
                Manage Your <span className="text-yellow-600">Store Page</span>
              </h1>
              <p className="allusebody text-lg text-stone-200 text-justify mb-6">
                As a registered jeweler, you'll have the chance to curate your
                own store page on{" "}
                <span className="text-yellow-600">EGold Haven</span> allowing
                you to showcase your unique designs and reach a wider audience.
                Handle certification requests and earn commissions. Click below
                to visit page!
              </p>
              <div className="text-center mt-8 buttontextlanding">
                <Link
                  to="/storepage"
                  type="button"
                  className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-bold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  Store Page
                </Link>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="text-center mt-5 md:pl-32 md:pr-32">
        <h1 className="headingtextlanding text-stone-200 mb-10">
          Explore all kinds of Jewelry on{" "}
          <span className="text-yellow-600">EGold Haven</span>
        </h1>
        <div className="Searchbarsarea flex h-full flex-wrap items-center justify-center lg:justify-between ">
          <div className="sb1 w-32 md:w-96 md:shrink-0 basis-1/3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <Select
                showSearch
                value={filters.location || undefined}
                onChange={handleSelectChange}
                optionFilterProp="children"
                name="location"
                filterOption={true}
                style={{
                  width: "100%",
                  height: "3rem",
                  background: "transparent",
                }}
                placeholder="Select City"
              >
                {options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="sb2 w-32 md:w-96 md:shrink-0 basis-2/3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <Input
                className="relative m-0 -mr-0.5 h-12 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search necklaces, bridal sets and more ..."
                aria-label="Search"
                aria-describedby="button-addon1"
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />

              <button
                onClick={handleSearch}
                className="relative z-[2] flex items-center rounded-r bg-warning-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black hover:text-white shadow-md transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-lg focus:bg-warning-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-lg hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)]"
                type="button"
                id="button-addon1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="categoriesarea mt-16 text-stone-200  overflow-auto">
        <h1 className="headingtextlanding pl-8">Categories</h1>
        <div className="categories flex flex-wrap  justify-left pt-5 pb-5 pl-8 pr-8 justify-center">
          <Link to="/listings?category=Rings" className="categorycard">
            <img className="cardicon" src="/images/rings.png" alt="Rings" />
            <p className="cardname">Rings</p>
          </Link>

          <Link to="/listings?category=Earrings" className="categorycard">
            <img
              className="cardicon"
              src="/images/earrings.png"
              alt="Earrings"
            />
            <p className="cardname">Earrings</p>
          </Link>

          <Link to="/listings?category=Necklaces" className="categorycard">
            <img
              className="cardicon"
              src="/images/necklaces.png"
              alt="Necklaces"
            />
            <p className="cardname">Necklaces</p>
          </Link>

          <Link to="/listings?category=Chains" className="categorycard">
            <img className="cardicon" src="/images/chains.png" alt="Chains" />
            <p className="cardname">Chains</p>
          </Link>

          <Link to="/listings?category=Bracelets" className="categorycard">
            <img
              className="cardicon"
              src="/images/bracelets.png"
              alt="Bracelets"
            />
            <p className="cardname">Bracelets</p>
          </Link>

          <Link to="/listings?category=Bangles" className="categorycard">
            <img className="cardicon" src="/images/bangles.png" alt="Bangles" />
            <p className="cardname">Bangles</p>
          </Link>

          <Link to="/listings?category=Anklets" className="categorycard">
            <img className="cardicon" src="/images/anklets.png" alt="Anklets" />
            <p className="cardname">Anklets</p>
          </Link>

          <Link to="/listings?category=Pendants" className="categorycard">
            <img
              className="cardicon"
              src="/images/pendants.png"
              alt="Pendants"
            />
            <p className="cardname">Pendants</p>
          </Link>

          <Link to="/listings?category=Bridal Sets" className="categorycard">
            <img
              className="cardicon"
              src="/images/bridalsets.png"
              alt="Bridal Sets"
            />
            <p className="cardname">Bridal Sets</p>
          </Link>

          <Link to="/listings?category=Others" className="categorycard">
            <img
              className="cardicon"
              src="/images/coins&bars.png"
              alt="Coins and Bars"
            />
            <p className="cardname">Others</p>
          </Link>
        </div>
      </div>

      <div className="border-b-2 border-yellow-600 pt-10"></div>

      <div className="categoriesarea mt-10 text-stone-200 overflow-auto mb-5">
        <h1 className="headingtextlanding pl-4">Browse Listings</h1>
        <p className="buttontextlanding text-right mt-4 mr-8">
          <Link
            to="/listings"
            className="text-stone-200 hover:text-yellow-600 text-xl"
          >
            View More
          </Link>
        </p>
        <div className="categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  ">
          {listing.length === 0 ? (
            <FileAnimationsmall />
          ) : (
            <div className="">
              <ContainerVertical listing={listing} />

              <ContainerVertical2 listing={listing} />
            </div>
          )}
        </div>
      </div>

      <div className="border-b-2 border-yellow-600"></div>

      <div className="categoriesarea mt-10 text-stone-200 overflow-auto mb-20">
        <h1 className="headingtextlanding pl-4">Browse Jeweler Products</h1>
        <p className="buttontextlanding text-right mt-4 mr-8">
          <Link
            to="/products"
            className="text-stone-200 hover:text-yellow-600 text-xl"
          >
            View More
          </Link>
        </p>
        <div className="categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  ">
          {products.length === 0 ? (
            <FileAnimationsmall />
          ) : (
            <div className="">
              <ContainerVerticalProduct product={products} />

              <ContainerVerticalProduct2 product={products} />
            </div>
          )}
        </div>
      </div>

      <div className="text-stone-200 border-2 border-yellow-600 p-10 rounded-lg ml-10 mr-10">
        <h1 className="headingtextlanding pl-8">
          Want to sell your gold items on{" "}
          <span className="text-yellow-600">EGold Haven ?</span>
        </h1>
        <p className="buttontextlanding text-right mt-4 mr-8">
          <button
            type="button"
            onClick={handlelisting}
            className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
          >
            Start Selling
          </button>
        </p>
      </div>

      <div className="pb-20"></div>
    </div>
  );
};

export default Landing;
