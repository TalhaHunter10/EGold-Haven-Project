import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getLikedStatus,
  getListingsById,
  getSimilarListings,
  likeListing,
  unlikeListing,
} from "../../services/listingservice";
import { FileAnimation, FileAnimationsmall } from "../loader/loader";
import { Carousel } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import ContainerVertical from "./containervertical";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { selectUserID } from "../../redux/features/auth/authSlice";
import { getloginStatus } from "../../services/authservice";
import { toast } from "react-toastify";
import axios from "axios";
import { ChatState } from "../chat/ChatProvider";
import ModalDynamic from "../modaldynamic";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Select } from "antd";
import { Input } from "antd";
import { useLocation } from "react-router-dom";
import { Table, Button, Image } from "antd";

const { Option } = Select;

const backend = process.env.REACT_APP_BACKEND_URL;

const JewelerTable = ({ jewelers }) => {
  const navigate = useNavigate();

  const rowProps = (record) => {
    return {
      onClick: () => {},
    };
  };

  const columns = [
    {
      title: "Store Image",
      dataIndex: "coverimage",
      key: "coverimage",
      render: (coverimage) => (
        <div onClick={(e) => e.stopPropagation()} className="w-20 h-20">
          <Image
            className="w-20 h-20"
            src={`${backend}/${coverimage[0].filePath}`}
          />
        </div>
      ),
    },
    {
      title: "Store Name",
      dataIndex: "storename",
      key: "storename",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone No",
      dataIndex: "phoneno",
      key: "phoneno",
      responsive: ["md"],
      render: (phoneno) => {
        return phoneno.slice(0, 4) + "-" + phoneno.slice(4); // Apply transformation to phone number
      },
    },
    {
      title: "Commission Rate",
      dataIndex: "commissionrate",
      key: "commissionrate",
      responsive: ["md"],
    },
    {
      title: "Date Registered",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["md"],
      render: (createdAt) => {
        return new Date(createdAt).toLocaleDateString();
      },
    },
    {
      title: "Visit Store",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/jewelerpage/${_id}`, "_blank");
          }}
          className="w-12 h-12 m-auto hover:scale-125 duration-300"
        >
          <img src="/images/view.png" />
        </div>
      ),
      responsive: ["md"],
    },
  ];

  return (
    <Table
      dataSource={jewelers}
      columns={columns}
      rowKey="_id"
      className="bg-neutral-800 rounded-xl"
      rowClassName="cursor-pointer bg-neutral-900 allusebody tracking-wider font-bold text-center text-base text-stone-200 hover:text-neutral-800"
      onRow={rowProps}
    />
  );
};

const ListingDetails = () => {
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

  const navigate = useNavigate();
  const userId = useSelector(selectUserID);
  const [button, setButton] = useState(false);

  const [isLoading, setIsLoading] = useState("false");
  const [isSimilarLoading, setIsSimilarLoading] = useState("false");
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [seller, setSeller] = useState({});

  const [open, setOpen] = useState(false);
  const [opencertification, setOpenCertification] = useState(false);

  const { setChatType } = ChatState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [jewelers, setJewelers] = useState([]);

  const [isFetched, setIsFetched] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    id: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFilters((prev) => ({ ...prev, location: value }));
  };

  const fetchdata1 = async (updatedFilters) => {
    setIsFetched(false);
    try {
      const res = await axios.get(`${backend}/api/jeweler/getjewelers`, {
        params: updatedFilters,
      });
      setJewelers(res.data);
      setIsFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoginAndFetchData1 = async () => {
    try {
      const status = await getloginStatus();
      if (status.verified === true) {
        const updatedFilters = { ...filters, id: status.id };
        setFilters(updatedFilters);
        fetchdata1(updatedFilters);
      } else {
        fetchdata1(filters);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      try {
        const status = await getloginStatus();
        if (status.verified === true) {
          const updatedFilters = { ...filters, id: status.id };
          setFilters(updatedFilters);
          fetchdata1(updatedFilters);
        } else {
          fetchdata1(filters);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginAndFetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchListing = async () => {
      try {
        const data = await getListingsById(id);
        if (!data) {
          navigate("/");
        }
        setListing(data.listings[0]);
        setSeller(data.seller[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const [similarListing, setSimilarListing] = useState([]);

  const fetchdata = async (userdata, excludeId) => {
    setIsSimilarLoading(true);
    try {
      const data = await getSimilarListings(userdata, excludeId);
      setSimilarListing(data);
      setIsSimilarLoading(false);
    } catch (error) {
      console.log(error);
      setIsSimilarLoading(false);
    }
  };

  useEffect(() => {
    if (listing.category !== undefined && listing._id) {
      fetchdata(listing.category, listing._id);
    }
  }, [listing]);

  const toggleLike = async () => {
    try {
      if (isLiked) {
        const data = await unlikeListing(listing._id);
        if (!data) {
          navigate("/login");
        }
      } else {
        const data = await likeListing(listing._id);
        if (!data) {
          navigate("/login");
        }
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLikedStatus = async (listingid) => {
    try {
      const data = await getLikedStatus(listingid);
      setIsLiked(data.liked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await getloginStatus();
        if (!status.verified) {
        } else if (status.verified && listing._id) {
          fetchLikedStatus(listing._id);
          if (userId === seller._id) {
            setButton(true);
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, [listing]);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "black",
          fontSize: "28px",
          lineHeight: "1.5715",
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "black",
          fontSize: "28px",
          lineHeight: "1.5715",
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };
  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
      return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    } else {
      // Calculate hours difference if less than a day
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    }
  };

  const HandleChat = async () => {
    try {
      const status = await getloginStatus();
      if (!status.verified) {
        toast.error("Please login to chat");
        navigate("/login");
      } else if (status.verified) {
        try {
          const data = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
            { userId: seller._id, chattype: "user" }
          );
          if (data) {
            localStorage.setItem("chatId", data.data._id);
            navigate(`/chat`);
          }
        } catch (error) {
          console.error("Error creating chat or fetching chat:", error);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  return (
    <div className="p-5">
      {isLoading && <FileAnimation />}

      <div className="flex flex-wrap m-5">
        {/* <!-- left column container --> */}
        <div className="w-[100%] lg:w-2/3 p-4">
          <h1 className="alluse text-4xl text-stone-200 pb-5">
            Listing Details
          </h1>

          <Carousel className="m-8 mt-2 p-8" arrows {...settings} dots>
            {listing.images &&
              listing.images.map((image, index) => (
                <div key={index} className="bg-stone-200/90 rounded-medium">
                  <img
                    className="aspect-video w-[100%]  object-contain"
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
          </Carousel>

          <div className=" p-8 rounded-md bg-neutral-900">
            <div className="flex justify-between">
              <p className="alluse font-semibold text-4xl text-stone-200 tracking-wider">
                Rs. {formatPriceWithCommas(parseInt(listing.price))}
              </p>

              {button ? (
                <div disabled="true" className="disabled-button z-10">
                  <HeartOutlined
                    style={{ color: "#ca8a04", fontSize: "28px" }}
                  />
                </div>
              ) : (
                <button
                  onClick={toggleLike}
                  className=" hover:scale-110 duration-200 transform z-10 cursor-pointer"
                >
                  {isLiked ? (
                    <HeartFilled
                      style={{ color: "#ca8a04", fontSize: "28px" }}
                    />
                  ) : (
                    <HeartOutlined
                      style={{ color: "#ca8a04", fontSize: "28px" }}
                    />
                  )}
                </button>
              )}
            </div>

            {listing && listing.title && (
              <p className="pt-2 alluse text-3xl text-stone-200">
                {listing.title
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            )}

            <div className="flex justify-between pt-5">
              <div className="flex justify-start">
                <img
                  className="w-6 h-6"
                  src="/images/location.png"
                  alt="seller"
                />

                <p className="pl-5 alluse text-base text-stone-200 my-auto">
                  {listing.address}
                </p>
              </div>

              <p className="alluse text-base text-stone-200">
                {getTimeSinceCreation(listing.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-3 p-6 rounded-md bg-neutral-900">
            <p className="alluse font-semibold text-3xl text-stone-200 tracking-wider pt-2 pl-2">
              Details
            </p>

            <div className="text-stone-200 alluse tracking-wide text-lg">
              <div className="pt-3 pb-1 grid grid-flow-col justify-stretch lg:ml-4 lg:mr-4">
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex justify-between ml-6 mr-6 mb-3 md:my-auto md:w-1/2">
                    <div className="p-1 w-[100%] md:w-auto text-center lg:text-left text-yellow-600 font-semibold">
                      Category
                    </div>
                    <div className="p-1 w-[100%] md:w-auto text-center lg:text-left">
                      {listing.category}
                    </div>
                  </div>

                  <div className="flex justify-between ml-6 mr-6 md:w-1/2">
                    <div className="p-1 w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold">
                      Stones
                    </div>
                    <div className=" p-1 w-[100%] md:w-auto text-center md:text-left">
                      {listing.stones}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1 pb-3 grid grid-flow-col justify-stretch lg:ml-4 lg:mr-4">
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex  justify-between ml-6 mr-6 my-auto  mb-3 md:my-auto md:w-1/2">
                    <div className="p-1 w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold">
                      Karats
                    </div>
                    <div className="p-1 w-[100%] md:w-auto text-center md:text-left">
                      {listing.karats}
                    </div>
                  </div>
                  <div className="flex justify-between ml-6 mr-6  md:w-1/2">
                    <div className="p-1 my-auto w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold">
                      Weight
                    </div>
                    <div className="p-1 w-[100%] md:w-auto text-center md:text-left">
                      <p className="md:text-right">
                        {listing.weights &&
                          parseFloat(listing.weights.tola).toFixed(2)}{" "}
                        tola
                      </p>
                      <p className="md:text-right">
                        {listing.weights &&
                          parseFloat(listing.weights.gram).toFixed(2)}{" "}
                        gram
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 p-6 rounded-md bg-neutral-900">
            <p className="alluse font-semibold text-3xl text-stone-200 tracking-wider pt-2 pl-2">
              Description
            </p>

            <p
              className="alluse text-lg text-stone-200 pt-3 pl-10"
              style={{ whiteSpace: "pre-line" }}
            >
              {listing.description}
            </p>
          </div>
        </div>

        {/* <!-- Right column container --> */}
        <div className="w-[100%] lg:w-1/3 bg-neutral-900 p-8 rounded-lg">
          <div className="">
            <h1 className="alluse text-4xl text-center text-stone-200 pb-6">
              Seller
            </h1>
            <div className="flex justify-start">
              <img
                className="w-10 h-10"
                src="/images/usericon2.png"
                alt="seller"
              />
              {seller && seller.name && (
                <p className="pl-5 alluse text-2xl text-stone-200 my-auto">
                  {seller.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              )}
            </div>
            <p className="alluse tracking-widest pt-2 alluse text-sm pl-16 text-stone-200 my-auto">
              <span className="font-semibold"> Member since: </span>{" "}
              {seller &&
                seller.createdAt &&
                new Date(seller.createdAt).toLocaleDateString()}
            </p>

            <p className="text-center pt-8">
              {button ? (
                <button
                  disabled="true"
                  className="disabled-button flex justify-center w-[100%] alluse inline-block rounded bg-stone-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white "
                >
                  <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
                  <p className="my-auto pl-3">Chat with seller</p>
                </button>
              ) : (
                <Link
                  onClick={HandleChat}
                  to={``}
                  className="flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
                  <p className="my-auto pl-3">Chat with seller</p>
                </Link>
              )}
            </p>

            <div className="border-b border-yellow-700 mt-6 mb-6"></div>

            <h1 className="alluse text-4xl text-center text-stone-200 pb-3">
              Gold Certification
            </h1>
            <div
              className="flex flex-wrap text-stone-200 p-3 alluse hover:text-yellow-600 cursor-pointer mb-3"
              onClick={() => setOpen(true)}
            >
              <img
                className="w-6 h-6"
                src="/images/information.png"
                alt="info"
              />
              <p className="my-auto pl-3 text-base">About this feature</p>
            </div>

            {button ? (
              <button
                disabled="true"
                className="disabled-button flex justify-center w-[100%] alluse inline-block rounded bg-stone-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white "
              >
                <img className="w-6 h-6" src="/images/request.png" alt="chat" />
                <p className="my-auto pl-3">Request Certification</p>
              </button>
            ) : (
              <div
                onClick={() => setOpenCertification(true)}
                className="flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
              >
                <img
                  className="w-6 h-6"
                  src="/images/request.png"
                  alt="request"
                />
                <p className="my-auto pl-3">Request Certification</p>
              </div>
            )}

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <>
                <h1 className="modal-heading text-stone-700 text-2xl font-bold p-2">
                  Gold Certification Request
                </h1>
                <h3 className="modal-text p-3 text-justify font-semibold text-base text-stone-700 ">
                  This feature allows you to ask the seller to certify the
                  authenticity of the gold through your selected jewelers
                  registered on this platform.
                  <br />
                  Select a Jeweler and a request will be send to the seller for
                  his approval. The seller can then certify gold from that
                  jeweler once you pay the service charges (commission) and you
                  can pick it up directly from that jeweler.{" "}
                </h3>
                <button
                  className="ml-3 modal-button-cancel font-semibold border-2 border-primary-600 text-primary-600 text-base transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  OK
                </button>
              </>
            </Modal>

            <div className="border-b border-yellow-700 mt-6 mb-6"></div>

            <h1 className="alluse text-4xl text-center text-stone-200 pb-6">
              Location
            </h1>
            <div className="flex justify-start">
              <img
                className="w-8 h-8 ml-2"
                src="/images/location.png"
                alt="seller"
              />

              <p className="pl-5 alluse text-xl text-stone-200 my-auto">
                {listing.address}
              </p>
            </div>

            <div className="border-b border-yellow-700 mt-10 mb-6"></div>

            <div className="flex justify-start">
              <p className="pl-3 alluse text-sm text-stone-200 my-auto">
                Listing ID:
              </p>

              <p className="pl-2 alluse text-xs text-stone-200 my-auto">
                {listing._id}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-yellow-700 mt-6 mb-6"></div>

      <h1 className="headingtextlanding text-stone-200 pt-5 pl-8">
        Similar Listings
      </h1>
      <p className="buttontextlanding text-right mt-4 mr-8">
        <Link
          to={`/listings?category=${listing.category}`}
          className="text-stone-200 hover:text-yellow-600 text-xl"
        >
          View More
        </Link>
      </p>
      <div className="categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  ">
        {similarListing.length === 0 ? (
          isSimilarLoading ? (
            <FileAnimationsmall />
          ) : (
            <p className="text-stone-200 text-center pl-8 text-2xl">
              No similar listings found !
            </p>
          )
        ) : (
          <div className="">
            <ContainerVertical listing={similarListing} />
          </div>
        )}
      </div>
      <ModalDynamic isOpen={opencertification} className="">
        <div className="">
          <div className="flex justify-between">
            <div>
              <h1 className="modal-heading text-neutral-900 text-4xl alluse font-semibold p-2">
                Gold Certification Request
              </h1>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setOpenCertification(false)}
            >
              <XMarkIcon
                className="text-neutral-900 h-12 w-12 cursor-pointer my-auto"
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="rounded-lg m-8 p-6 allusebody text-neutral-900 text-xl font-semibold border-2 border-yellow-600">
            Select a Jeweler and a request will be send to the seller for his
            approval. The seller can then certify gold from that jeweler once
            you pay the service charges (commission) and you can pick it up
            directly from that jeweler.
          </div>
          <div className="pb-10 h-[90vh] overflow-auto">
            <div className=" text-neutral-900 min-[150px]:text-3xl text-center md:text-5xl alluse mb-8 mt-10 ">
              Authorized <span className="text-yellow-600">Jewelers </span>
            </div>

            <div className="text-center mt-5 md:pl-32 md:pr-32">
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
                      placeholder="Search Jewelers"
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />

                    <button
                      onClick={checkLoginAndFetchData1}
                      className="relative z-[2] flex items-center rounded-r bg-warning-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black hover:text-white shadow-md transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-lg focus:bg-warning-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-lg hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)]"
                      type="submit"
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

            <div className="categories flex flex-wrap pt-5 pb-5 ">
              {!isFetched ? (
                <FileAnimationsmall />
              ) : jewelers && jewelers.length === 0 && isFetched ? (
                <p className="w-full allusebody min-[150px]:text-2xl md:text-4xl text-center text-neutral-900 min-[150px]:mt-4  md:mt-10">
                  No Jewelers Found !!
                </p>
              ) : (
                <div className="overflow-auto text-center m-auto pt-5">
                  <div className="flex flex-wrap justify-between min-[150px]:pt-4 pl-5 pr-5 pb-5 ">
                    <div className="text-neutral-900 md:text-2xl allusebody font-bold min-[150px]:text-lg">
                      Search for "
                      {filters.search !== "" ? `${filters.search} |` : ""}{" "}
                      {filters.location !== "" ? `${filters.location} |` : ""}{" "}
                      {filters.search === "" && filters.location === ""
                        ? "All"
                        : ""}
                      "
                    </div>
                    {jewelers.length > 0 && isFetched ? (
                      <div className="allusebody text-lg font-bold text-neutral-700">
                        {jewelers.length} Results Found
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <JewelerTable jewelers={jewelers} />
                </div>
              )}
            </div>
          </div>
        </div>
      </ModalDynamic>
    </div>
  );
};

export default ListingDetails;
