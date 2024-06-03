import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getloginStatus } from "../../services/authservice";
import {
  acceptJewelerRequest,
  addReport,
  receiveBuyerCommission,
  receiveSellerJewelry,
  rejectJewelerRequest,
} from "../../services/certificationservice";
import { useState } from "react";
import ModalDynamic from "../modaldynamic";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TextArea from "antd/es/input/TextArea";

const JewelerRequest = ({ Requests }) => {
  const navigate = useNavigate();

  const HandleCommissionRecieved = async (id) => {
    try {
      const status = await getloginStatus();
      if (!status) {
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      } else {
        try {
          const cr = await receiveBuyerCommission(id);
          if (cr) {
            window.location.reload();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const HandleJewelryRecieved = async (id) => {
    try {
      const status = await getloginStatus();
      if (!status) {
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      } else {
        try {
          const cr = await receiveSellerJewelry(id);
          if (cr) {
            window.location.reload();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const status = await getloginStatus();
      if (!status) {
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      } else {
        try {
          const accept = await acceptJewelerRequest(id);

          if (accept) {
            window.location.reload();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const status = await getloginStatus();
      if (!status) {
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      } else {
        try {
          const reject = await rejectJewelerRequest(id);
          if (reject) {
            window.location.reload();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [report, setReport] = useState("");

  const onReportChange = (e) => {
    setReport(e.target.value);
  };

  const [errors, setErrors] = useState({});

  const handleViewReport = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (RequestId) => {
    const validationErrors = {};

    if (report === "") {
      validationErrors.report = "Report Contents are required !";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await addReport(report, RequestId);
        setOpenModal(false);
        if (data) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error submitting request:", error);
      }
    } else {
      toast.error("Please remove the field error !!");
    }
  };

  return (
    <div>
      <div className="p-3 m-4 rounded-lg border-2  border-yellow-600">
        {Requests.map((Request) => (
          <div key={Request.id}>
            <ModalDynamic isOpen={openModal} className="overflow-auto ">
              <div className="flex justify-end">
                <div
                  className="cursor-pointer"
                  onClick={() => setOpenModal(false)}
                >
                  <XMarkIcon
                    className="text-neutral-900 h-5 w-5 cursor-pointer my-auto"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className=" text-neutral-900">
                <p className="text-center alluse text-3xl md:px-20">
                  Add Certification Report
                </p>

                <p className="field-heading pb-2 pt-5">Report Contents</p>
                <TextArea
                  placeholder="Write report here"
                  allowClear
                  style={{
                    width: "100%",
                    height: 120,
                    fontSize: "18px",
                    marginBottom: 20,
                  }}
                  onChange={onReportChange}
                />
                {errors.report && (
                  <h1 className="text-danger mt-[-15px] mb-6 font-semibold">
                    {errors.report}
                  </h1>
                )}

                <div className="text-center">
                  <div
                    onClick={() => handleSubmit(Request._id)}
                    className="w-auto cursor-pointer mt-4 text-center px-10 alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                  >
                    <p className="my-auto pl-3">Submit Request</p>
                  </div>
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
                {Request.buyerPaymentStatus === "pending" ? (
                  <div className="flex justify-center mt-12">
                    <div
                      onClick={() => {
                        HandleCommissionRecieved(Request._id);
                      }}
                      className="cursor-pointer flex justify-center w-[70%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                      <p className="my-auto pl-3">Commission Recieved</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xl text-center m-6 border-2 border-green-600 rounded-lg p-2">
                    {" "}
                    Commission Recieved
                  </div>
                )}
              </div>

              <div className="md:w-1/3 text-center text-stone-200 md:border-r-2 border-gray-700">
                <h1 className="alluse text-4xl text-yellow-600 pb-3">
                  Listing
                </h1>
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
                      Request.jewelryReceivedStatus === "pending"
                        ? toast.error(
                            "You can not add report until seller jewelery recieved is marked !"
                          )
                        : handleViewReport();
                    }
                  }}
                  className="allusebody text-3xl text-stone-300 hover:scale-105 duration-300 hover:text-yellow-600 cursor-pointer mt-10 mb-5"
                >
                  Add Certification Report
                </p>
              </div>

              <div className="md:w-1/3 text-center text-stone-200">
                <h1 className="alluse text-4xl text-yellow-600 pb-3">Seller</h1>
                <h1 className="alluse text-3xl">
                  {Request.sellerId.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h1>
                {Request.jewelryReceivedStatus === "pending" ? (
                  <div className="flex justify-center mt-12">
                    <div
                      onClick={() => {
                        HandleJewelryRecieved(Request._id);
                      }}
                      className="cursor-pointer flex justify-center w-[70%] alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                      <p className="my-auto pl-3">Jewelry Recieved</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xl text-center m-6 border-2 border-green-600 rounded-lg p-2">
                    {" "}
                    Jewelry Recieved
                  </div>
                )}
              </div>
            </div>

            {Request.jewelerStatus === "pending" ? (
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
            ) : (
              <></>
            )}

            {Request.requestStatus === "pending" &&
            Request.sellerStatus === "accepted" ? (
              <div className="text-xl text-center m-6 text-danger-600 font-semibold rounded-lg p-2">
                Accept or Reject the request to proceed further.
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
                Waiting for seller to send the jewelry to the jeweler for
                certification process.
              </div>
            ) : (
              <></>
            )}

            {Request.requestStatus === "inprogress" &&
            Request.buyerPaymentStatus === "paid" &&
            Request.jewelryReceivedStatus === "recieved" &&
            Request.certificationStatus === "pending" ? (
              <div className="text-xl text-center m-6 text-danger-600 font-semibold rounded-lg p-2">
                Select the option above to add the certification report for the
                jewelry after inspection.
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
    </div>
  );
};

export default JewelerRequest;
