import { useEffect, useState } from "react";
import { getloginStatus } from "../../services/authservice";
import { getJewelerInformation } from "../../services/jewelerservice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FileAnimationsmall, Loader } from "../loader/loader";
import { Image, Select } from "antd";

import React from "react";

import { getJewelerProductsInformation } from "../../services/productservice";
import ContainerVerticalProductAll from "../productcontainers/containerverticalproductall.js";
import ContainerVerticalProductAll2 from "../productcontainers/containerverticalproductall2.js";
import { toast } from "react-toastify";
import axios from "axios";

const PublicStorePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jeweler, setJeweler] = useState([]);
  const [product, setProduct] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const [isCategory, setIsCategory] = useState("");

  const { id } = useParams();

  const handleCategoryChange = (value) => {
    setIsCategory(value);
  };

  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const data = await getJewelerInformation(id);
      if (data.result) {
        setJeweler(data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setIsFetched(false);
    try {
      const data = await getJewelerProductsInformation(id);
      if (data.products) {
        setProduct(data.products);
        setIsLoading(false);
        setIsFetched(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsFetched(true);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      fetchdata();
      fetchProducts();
    };

    checkLoginStatus();
  }, []);

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
            { userId: jeweler.user, chattype: "jeweler" }
          );
          if (data) {
            console.log(data);
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
    <div className="pt-10 pb-10">
      {isLoading && <Loader />}
      <div className="alluse text-stone-200 lg:flex lg:flex-wrap justify-center">
        <div className="lg:w-2/6 p-6 bg-neutral-900 rounded-lg order-2 md:order-1 mb-8 ">
          <div className="">
            {jeweler.coverimage && (
              <Image
                src={`http://localhost:5000/${jeweler.coverimage[0].filePath}`}
                alt="Cover"
                className="rounded-lg aspect-video  object-contain"
              />
            )}
          </div>

          <div
            onClick={HandleChat}
            className="mt-5 flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
          >
            <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
            <p className="my-auto pl-3">Chat with jeweler</p>
          </div>

          <div className="border-b-2 border-yellow-600 pt-5"></div>

          <h1 className="alluse pt-8 text-3xl  text-center text-stone-200 pb-6">
            Commission Rate
          </h1>
          <div className="flex justify-start allusebody">
            <img
              className="w-8 h-8 ml-2"
              src="/images/value.png"
              alt="seller"
            />

            <p className="pl-5 alluse text-2xl text-stone-200 my-auto">
              {jeweler.commissionrate} %
            </p>
          </div>

          <div className="border-b-2 border-yellow-600 pt-10"></div>

          <h1 className="alluse pt-8 text-3xl text-center text-stone-200 pb-6">
            Phone No.
          </h1>
          <div className="flex justify-start text-left allusebody">
            <img
              className="w-6 h-6 ml-2"
              src="/images/phone.png"
              alt="seller"
            />

            <p className="pl-5 alluse lg:text-xl text-stone-200 tracking-widest">
              {jeweler.phoneno &&
                jeweler.phoneno.slice(0, 4) + "-" + jeweler.phoneno.slice(4)}
            </p>
          </div>

          <div className="border-b-2 border-yellow-600 pt-10"></div>
          <h1 className="alluse pt-8 text-3xl text-center text-stone-200 pb-6">
            Store Address
          </h1>
          <div className="flex justify-start text-left allusebody">
            <img
              className="w-8 h-8 ml-2"
              src="/images/location.png"
              alt="seller"
            />
            <div className="my-auto">
              <p className="pl-5 lg:text-xl text-stone-200">
                Store No. {jeweler.shopno}
              </p>
              <p className="pl-5 lg:text-xl text-stone-200">
                {jeweler.address}
              </p>
              <p className="pl-5 lg:text-xl text-stone-200 ">{jeweler.city}</p>
            </div>
          </div>

          <div className="border-b-2 border-yellow-600 pt-8"></div>

          <div className="flex justify-start pt-5">
            <p className="pl-3 alluse text-sm text-stone-200 my-auto">
              Jeweler ID:
            </p>

            <p className="pl-2 alluse text-xs text-stone-200 my-auto">
              {jeweler._id}
            </p>
          </div>
        </div>

        <div className="lg:w-4/6 pl-5 pr-5 pt-3 pb-5 order-1 md:order-2">
          <p className="text-[40px] alluse min-[200px]:text-center sm:text-left my-auto">
            {jeweler.storename}
          </p>

          <div className="border-b-2 border-yellow-600"></div>

          <h1 className="headingtextlanding text-center sm:pl-8 mt-10">
            Store Products
          </h1>
          <div className="categoriesarea text-stone-200 overflow-auto mb-5">
            <div className="categories flex flex-wrap justify-center pt-5 pb-5  ">
              {product.length === 0 && !isFetched ? (
                <FileAnimationsmall />
              ) : product.length === 0 && isFetched ? (
                <p className="text-stone-200 text-2xl text-center allusebody pt-8">
                  No Products Found
                </p>
              ) : product.length > 0 && isFetched ? (
                <div className="">
                  <ContainerVerticalProductAll product={product} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-yellow-600 pt-10"></div>

      <h1 className="text-stone-200 text-4xl text-center alluse pt-8">
        Products (All Categories)
      </h1>

      <p className="field-heading pt-6 pb-2 text-stone-200">Category</p>
      <Select
        className=""
        style={{ width: "100%", height: 40, marginBottom: 20 }}
        onChange={handleCategoryChange}
        options={[
          {
            value: "Rings",
            label: "Rings",
          },
          {
            value: "Earrings",
            label: "Earrings",
          },
          {
            value: "Necklaces",
            label: "Necklaces",
          },
          {
            value: "Chains",
            label: "Chains",
          },
          {
            value: "Bracelets",
            label: "Bracelets",
          },
          {
            value: "Bangles",
            label: "Bangles",
          },
          {
            value: "Anklets",
            label: "Anklets",
          },
          {
            value: "Pendants",
            label: "Pendants",
          },
          {
            value: "Bridal Sets",
            label: "Bridal Sets",
          },
          {
            value: "Others",
            label: "Others",
          },
        ]}
      />
      <div className="p-5">
        {product.length === 0 && !isFetched ? (
          <FileAnimationsmall />
        ) : product.length === 0 && isFetched ? (
          <p className="text-stone-200 text-2xl text-center allusebody pt-8">
            No Products Found
          </p>
        ) : product.length > 0 && isFetched ? (
          <div>
            {product.filter((item) => item.category === isCategory).length ===
            0 ? (
              <div className="allusebody text-center pt-5 text-3xl text-danger-600">
                No Products Found in this Category
              </div>
            ) : (
              <div>
                <div className="allusebody text-center pt-2 text-4xl text-stone-200">
                  {isCategory}
                </div>
                <ContainerVerticalProductAll2
                  product={product.filter(
                    (item) => item.category === isCategory
                  )}
                />
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PublicStorePage;
