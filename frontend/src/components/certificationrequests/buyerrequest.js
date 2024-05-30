import { toast } from "react-toastify";
import { getloginStatus } from "../../services/authservice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ModalDynamic from "../modaldynamic";
import {
  acceptRequest,
  rejectRequest,
} from "../../services/certificationservice";

const BuyerRequest = ({ Requests }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const HandleBuyerChat = async (buyerId) => {
    try {
      const status = await getloginStatus();
      if (!status.verified) {
        toast.error("Please login to chat");
        navigate("/login");
      } else if (status.verified) {
        try {
          const data = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
            { userId: buyerId, chattype: "user" }
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

  const HandleJewelerChat = async (jewelerId) => {
    try {
      const status = await getloginStatus();
      if (!status.verified) {
        toast.error("Please login to chat");
        navigate("/login");
      } else if (status.verified) {
        try {
          const data = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
            { userId: jewelerId, chattype: "jeweler" }
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

  const handleViewReport = () => {
    setIsOpen(true);
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

  const handleAccept = async (RequestId) => {
    try {
      const status = await getloginStatus();
      if (!status) {
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      } else {
        try {
          const accept = await acceptRequest(RequestId);
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleReject = async (RequestId) => {
    try {
      const status = await getloginStatus();
      if (!status) {
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      } else {
        try {
          const reject = await rejectRequest(RequestId);
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  return (
    <div className="p-3 m-4 rounded-lg border-2  border-yellow-600">
      {Requests.map((Request) => (
        <div key={Request.id}>
          <ModalDynamic isOpen={isOpen}>
            <div>
              <div className="flex justify-between border-b-4 border-yellow-600 pb-3">
                <div>
                  <h1 className="modal-heading text-neutral-900 text-5xl alluse font-semibold p-2">
                    Gold Certification Request Report
                  </h1>
                </div>
                <div
                  className="cursor-pointer pt-3"
                  onClick={() => setIsOpen(false)}
                >
                  <XMarkIcon
                    className="text-neutral-900 h-12 w-12 cursor-pointer my-auto hover:scale-125 duration-300"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl alluse text-neutral-900 font-semibold p-2">
                  {Request.certificationReport}
                </h1>
                <p className="text-right text-xl font-semibold allusebody">
                  {getTimeSinceCreation(Request.reportSubmissionTime)}
                </p>
              </div>
            </div>
          </ModalDynamic>
          <div className="flex flex-wrap justify-center border-b-2 border-gray-700">
            <div className="md:w-1/3 text-center text-stone-200 md:border-r-2 border-gray-700">
              <h1 className="alluse text-4xl text-yellow-600 pb-3">Buyer</h1>
              <h1 className="alluse text-3xl">
                {Request.buyerId.name
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h1>
              <div className="flex justify-center mt-12">
                <div
                  onClick={() => {
                    HandleBuyerChat(Request.buyerId._id);
                  }}
                  className="cursor-pointer flex justify-center w-[70%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
                  <p className="my-auto pl-3">Chat with buyer</p>
                </div>
              </div>

              {Request.sellerStatus === "pending" ? (
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    className="p-3 modal-button-cancel font-semibold border-2 border-danger-600 text-danger-600 text-lg alluse transform duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg"
                    onClick={() => {
                      handleReject(Request._id);
                    }}
                  >
                    Reject
                  </button>

                  <button
                    className="p-3 modal-button-confirm font-semibold border-2 border-primary-600 text-primary-600 text-lg transform  alluse duration:300 hover:border-yellow-600 hover:text-yellow-600 px-5 py-1 rounded-lg"
                    onClick={() => {
                      handleAccept(Request._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              ) : Request.sellerStatus === "accepted" ? (
                <div className="text-xl text-center m-6 border-2 border-green-600 rounded-lg p-2">
                  {" "}
                  Status : {Request.sellerStatus}
                </div>
              ) : Request.sellerStatus === "rejected" ? (
                <div className="text-xl text-center m-6 border-2 border-red-600 rounded-lg p-2">
                  {" "}
                  Status : {Request.sellerStatus}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="md:w-1/3 text-center text-stone-200 md:border-r-2 border-gray-700">
              <h1 className="alluse text-4xl text-yellow-600 pb-3">Listing</h1>
              <h1 className="alluse text-3xl">
                {Request.listingId.title
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h1>
              <p
                onClick={() =>
                  navigate(`/listingdetails/${Request.listingId._id}`)
                }
                className="allusebody text-lg text-primary-600 hover:scale-110 duration-300 hover:text-yellow-600 cursor-pointer"
              >
                view listing
              </p>

              <p
                onClick={() => {
                  {
                    Request.certificationStatus === "pending"
                      ? toast.error(
                          "Certification report is not yet submitted by jeweler. Please wait for the report."
                        )
                      : handleViewReport();
                  }
                }}
                className="allusebody text-3xl text-stone-300 hover:scale-105 duration-300 hover:text-yellow-600 cursor-pointer mt-24"
              >
                View Certification Report
              </p>
            </div>

            <div className="md:w-1/3 text-center text-stone-200">
              <h1 className="alluse text-4xl text-yellow-600 pb-3">Jeweler</h1>
              <h1 className="alluse text-3xl">
                {Request.jewelerId.storename
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h1>
              <p
                onClick={() =>
                  navigate(`/jewelerpage/${Request.jewelerId._id}`)
                }
                className="allusebody text-lg text-primary-600 hover:scale-110 duration-300 hover:text-yellow-600 cursor-pointer"
              >
                visit store
              </p>
              <div className="flex justify-center mt-5">
                <div
                  onClick={() => {
                    HandleJewelerChat(Request.jewelerId.user);
                  }}
                  className="cursor-pointer flex justify-center w-[70%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                >
                  <img className="w-6 h-6" src="/images/chat.png" alt="chat" />
                  <p className="my-auto pl-3">Chat with jeweler</p>
                </div>
              </div>

              {Request.jewelerStatus === "pending" ? (
                <div className="text-xl text-center m-6 border-2 border-primary-600 rounded-lg p-2">
                  {" "}
                  Status : {Request.jewelerStatus}
                </div>
              ) : Request.jewelerStatus === "accepted" ? (
                <div className="text-xl text-center m-6 border-2 border-yellow-600 rounded-lg p-2">
                  {" "}
                  Status : {Request.jewelerStatus}
                </div>
              ) : Request.jewelerStatus === "rejected" ? (
                <div className="text-xl text-center m-6 border-2 border-red-600 rounded-lg p-2">
                  {" "}
                  Status : {Request.jewelerStatus}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {Request.requestStatus === "pending" &&
          Request.sellerStatus === "accepted" &&
          Request.jewelerStatus === "pending" ? (
            <div className="text-xl text-center m-6 text-danger-600 font-semibold rounded-lg p-2">
              You have accepted the request. Please wait for the jeweler to
              accept the request.
            </div>
          ) : (
            <></>
          )}

          {Request.requestStatus === "inprogress" &&
          Request.buyerPaymentStatus === "pending" ? (
            <div className="text-xl text-center m-6 text-danger-600 font-semibold rounded-lg p-2">
              Waiting for buyer to pay the commission for the pending services
              to the jeweler as advance.
            </div>
          ) : (
            <></>
          )}

          {Request.requestStatus === "inprogress" &&
          Request.buyerPaymentStatus === "paid" &&
          Request.jewelryReceivedStatus === "pending" ? (
            <div className="text-xl text-center m-6 text-danger-600 font-semibold rounded-lg p-2">
              The Jeweler has recieved the commission. Please send the jewelry
              to the jeweler for certification.
            </div>
          ) : (
            <></>
          )}

          {Request.requestStatus === "inprogress" &&
          Request.buyerPaymentStatus === "paid" &&
          Request.jewelryReceivedStatus === "recieved" &&
          Request.certificationStatus === "pending" ? (
            <div className="text-xl text-center m-6 text-danger-600 font-semibold rounded-lg p-2">
              Waiting for Jeweler to certify the jewelry. Please wait for the
              certification report.
            </div>
          ) : (
            <></>
          )}

          <div className="justify-center text-stone-200 alluse w-full">
            {Request.requestStatus === "pending" ? (
              <div className="text-xl text-center m-6 border-2 border-primary-600 rounded-lg p-2">
                {" "}
                Request Status : {Request.requestStatus}
              </div>
            ) : Request.requestStatus === "inprogress" ? (
              <div className="text-xl text-center m-6 border-2 border-yellow-600 rounded-lg p-2">
                {" "}
                Request Status : {Request.requestStatus}
              </div>
            ) : Request.requestStatus === "cancelled" ? (
              <div className="text-xl text-center m-6 border-2 border-red-600 rounded-lg p-2">
                {" "}
                Request Status : {Request.requestStatus}
              </div>
            ) : Request.requestStatus === "completed" ? (
              <div className="text-xl text-center m-6 border-2 border-green-600 rounded-lg p-2">
                {" "}
                Request Status : {Request.requestStatus}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyerRequest;
