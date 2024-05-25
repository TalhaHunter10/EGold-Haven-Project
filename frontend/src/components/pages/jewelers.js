import { Select } from "antd";
import { Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileAnimationsmall } from "../loader/loader";
import { Table, Button, Image } from "antd";
import { getloginStatus } from "../../services/authservice";

const { Option } = Select;

const backend = process.env.REACT_APP_BACKEND_URL;

const JewelerTable = ({ jewelers }) => {
  const navigate = useNavigate();

  const rowProps = (record) => {
    return {
      onClick: () => navigate(`/jewelerpage/${record._id}`),
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
      title: "No of Products",
      dataIndex: "numberOfProducts",
      key: "numberOfProducts",
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

const Jewelers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [jewelers, setJewelers] = useState([]);

  const [isFetched, setIsFetched] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    id: "",
  });

  const backend = process.env.REACT_APP_BACKEND_URL;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFilters((prev) => ({ ...prev, location: value }));
  };

  const handleSearch = () => {
    let url = `/jewelers?`;

    if (filters.search.trim() !== "") {
      url += "search=" + encodeURIComponent(filters.search.trim()) + "&";
    }

    // Append location parameter if not empty
    if (filters.location.trim() !== "") {
      url += "location=" + encodeURIComponent(filters.location.trim()) + "&";
    }

    window.location.href = url;
  };

  const fetchdata = async (updatedFilters) => {
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

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      try {
        const status = await getloginStatus();
        if (status.verified === true) {
          const updatedFilters = { ...filters, id: status.id };
          setFilters(updatedFilters); // Update the state for consistency
          fetchdata(updatedFilters); // Pass the updated filters directly to fetchdata
        } else {
          fetchdata(filters); // If not verified, fetch data without id
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginAndFetchData();
  }, []);

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
    <div className="pb-20">
      <div className=" text-stone-200 min-[150px]:text-3xl text-center md:text-5xl alluse mb-8 mt-10 ">
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
                onClick={handleSearch}
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
          <p className="w-full allusebody min-[150px]:text-2xl md:text-4xl text-center text-stone-200 min-[150px]:mt-4  md:mt-10">
            No Jewelers Found !!
          </p>
        ) : (
          <div className="overflow-auto text-center m-auto pt-5">
            <div className="flex flex-wrap justify-between min-[150px]:pt-4 pl-5 pr-5 pb-5 ">
              <div className="text-stone-200 md:text-2xl allusebody font-bold min-[150px]:text-lg">
                Search for "{filters.search !== "" ? `${filters.search} |` : ""}{" "}
                {filters.location !== "" ? `${filters.location} |` : ""}{" "}
                {filters.search === "" && filters.location === "" ? "All" : ""}"
              </div>
              {jewelers.length > 0 && isFetched ? (
                <div className="allusebody text-lg font-bold text-stone-300">
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
  );
};

export default Jewelers;
