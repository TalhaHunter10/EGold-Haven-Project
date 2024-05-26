import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FileAnimation, FileAnimationsmall } from "../loader/loader";
import { Carousel, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { getloginStatus } from "../../services/authservice";
import {
  getProductsById,
  getSimilarProducts,
} from "../../services/productservice";
import ContainerVerticalProduct from "./containerverticalproduct";
import axios from "axios";
import { toast } from "react-toastify";
import { ChatState } from "../chat/ChatProvider";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [button, setButton] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSimilarLoading, setIsSimilarLoading] = useState("false");

  const { id } = useParams();
  const [product, setproduct] = useState({});
  const [jeweler, setjeweler] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const fetchListing = async () => {
      try {
        const data = await getProductsById(id);
        if (!data) {
          navigate("/");
        }
        setproduct(data.product);
        setjeweler(data.jeweler);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await getloginStatus();
        if (!status.verified) {
        } else if (status.verified) {
          if (status.id === jeweler.user) {
            setButton(true);
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, [jeweler]);

  const [similarproduct, setSimilarproduct] = useState([]);

  const fetchdata = async (userdata, excludeId) => {
    setIsSimilarLoading(true);
    try {
      const data = await getSimilarProducts(userdata, excludeId);
      setSimilarproduct(data);
      setIsSimilarLoading(false);
    } catch (error) {
      console.log(error);
      setIsSimilarLoading(false);
    }
  };

  useEffect(() => {
    if (product.category !== undefined && product._id) {
      fetchdata(product.category, product._id);
    }
  }, [product]);

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

  const HandleChatPD = async () => {
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
    <div className="p-5">
      {isLoading && <FileAnimation />}

      <div className="flex flex-wrap m-5">
        {/* <!-- left column container --> */}
        <div className="w-[100%] lg:w-2/3 p-4">
          <h1 className="alluse text-4xl text-stone-200 pb-5 min-[200px]:text-center sm:text-left">
            Product Details
          </h1>

          <Carousel className="m-8 mt-2 p-8" arrows {...settings} dots>
            {product.images &&
              product.images.map((image, index) => (
                <div
                  key={index}
                  className=" bg-stone-200/90 text-center rounded-medium"
                >
                  <img
                    className="aspect-video w-[100%] m-auto object-contain"
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image.filePath}`}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
          </Carousel>

          <div className=" p-8 rounded-md bg-neutral-900">
            <p className="alluse font-semibold text-right text-4xl text-stone-200 tracking-wider">
              Rs. {formatPriceWithCommas(parseInt(product.price))}
            </p>

            {product && product.title && (
              <p className="pt-2 alluse text-3xl text-stone-200">
                {product.title
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            )}

            <p className="alluse text-base text-stone-200 pt-5">
              {getTimeSinceCreation(product.createdAt)}
            </p>
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
                      {product.category}
                    </div>
                  </div>

                  <div className="flex justify-between ml-6 mr-6 md:w-1/2">
                    <div className="p-1 w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold">
                      Weight (gram)
                    </div>
                    <div className=" p-1 w-[100%] md:w-auto text-center md:text-left">
                      <p className="md:text-right">
                        {product.weights &&
                          parseFloat(product.weights.gram).toFixed(2)}{" "}
                        gram
                      </p>
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
                      {product.karats}
                    </div>
                  </div>
                  <div className="flex justify-between ml-6 mr-6  md:w-1/2">
                    <div className="p-1 my-auto w-[100%] md:w-auto text-center md:text-left text-yellow-600 font-semibold">
                      Weight (tola)
                    </div>
                    <div className="p-1 w-[100%] md:w-auto text-center md:text-left">
                      <p className="md:text-right">
                        {product.weights &&
                          parseFloat(product.weights.tola).toFixed(2)}{" "}
                        tola
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
              {product.description}
            </p>
          </div>
        </div>

        {/* <!-- Right column container --> */}
        <div className="w-[100%] lg:w-1/3 bg-neutral-900 p-8 rounded-lg">
          <div className="">
            <h1 className="alluse text-4xl text-center text-stone-200 pb-6">
              Jeweler
            </h1>
            <div className="flex justify-start">
              <img className="w-10 h-10" src="/images/shop.png" alt="jeweler" />
              {jeweler && jeweler.storename && (
                <p className="pl-5 alluse text-3xl text-stone-200 my-auto">
                  {jeweler.storename
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              )}
            </div>
            <p className="alluse tracking-widest pt-2 alluse text-sm pl-16 text-stone-200 my-auto">
              <span className="font-semibold"> Registered Since: </span>{" "}
              {jeweler &&
                jeweler.createdAt &&
                new Date(jeweler.createdAt).toLocaleDateString()}
            </p>

            <p className="text-center pt-8">
              {button ? (
                <button className="disabled-button flex justify-center w-[100%] alluse inline-block rounded bg-stone-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white ">
                  <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
                  <p className="my-auto pl-3">Chat with jeweler</p>
                </button>
              ) : (
                <div
                  onClick={HandleChatPD}
                  className="cursor-pointer flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
                  <p className="my-auto pl-3">Chat with jeweler</p>
                </div>
              )}
            </p>

            <p className="text-center pt-4">
              {button ? (
                <button
                  disabled="true"
                  className="disabled-button flex justify-center w-[100%] alluse inline-block rounded bg-stone-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white "
                >
                  <p className="my-auto pl-3">View Jeweler Page</p>
                </button>
              ) : (
                <Link
                  to={`/jewelerpage/${jeweler._id}`}
                  className="flex justify-center w-[100%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  <p className="my-auto pl-3">View Jeweler Page</p>
                </Link>
              )}
            </p>

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
              <div className="pl-5 text-lg">
                <p className=" alluse text-stone-200 my-auto">
                  Store No. {jeweler.shopno}
                </p>
                <p className=" alluse text-stone-200 my-auto">
                  {jeweler.address}
                </p>
                <p className=" alluse text-stone-200 my-auto">{jeweler.city}</p>
              </div>
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

            <div className="border-b border-yellow-700 mt-10 mb-6"></div>

            <div className="flex justify-start">
              <p className="pl-3 alluse text-sm text-stone-200 my-auto">
                product ID:
              </p>

              <p className="pl-2 alluse text-xs text-stone-200 my-auto">
                {product._id}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-yellow-700 mt-6 mb-6"></div>

      <h1 className="headingtextlanding text-stone-200 pt-5 pl-8">
        Similar Products
      </h1>
      <p className="buttontextlanding text-right mt-4 mr-8">
        <Link
          to={`/products?category=${product.category}`}
          className="text-stone-200 hover:text-yellow-600 text-xl"
        >
          View More
        </Link>
      </p>
      <div className="categories flex flex-wrap lg:justify-center md:justify-start pt-5 pb-5  ">
        {similarproduct.length === 0 ? (
          isSimilarLoading ? (
            <FileAnimationsmall />
          ) : (
            <p className="text-stone-200 text-center pl-8 text-2xl">
              No similar products found !
            </p>
          )
        ) : (
          <div className="">
            <ContainerVerticalProduct product={similarproduct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
