import { useEffect, useState } from "react";
import { getloginStatus } from "../../services/authservice";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getMyRequests,
  getRecievedRequests,
} from "../../services/certificationservice";
import SellerRequest from "./sellerrequest";
import BuyerRequest from "./buyerrequest";
import { FileAnimationsmall } from "../loader/loader";

const UserCertifications = () => {
  const navigate = useNavigate();

  const [heading, setHeading] = useState("Recieved Requests");
  const [showSentRequests, setShowSentRequests] = useState(false);

  const [isloading, setIsLoading] = useState(false);

  const [myRequests, setMyRequests] = useState([]);
  const [recievedRequests, setRecievedRequests] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const getRequests = async () => {
      const status = await getloginStatus();
      if (!status) {
        setIsLoading(false);
        toast.error("Please login to view this page");
        navigate("/login");
        return;
      }

      try {
        const SRequests = await getMyRequests();
        const RRequests = await getRecievedRequests();
        setMyRequests(SRequests);
        setRecievedRequests(RRequests);
      } catch (error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    };
    getRequests();
  }, []);

  return (
    <div className="pb-20">
      <div className="md:flex md:flex-wrap md:justify-between min-[150px]:text-center mt-10">
        <div className="text-stone-200 min-[150px]:text-4xl md:text-5xl min-[150px]:text-center md:text-left md:pl-8 alluse mb-8 ">
          {heading}
        </div>

        <div className="">
          {!showSentRequests ? (
            <button
              className="p-3 bg-primary-600 text-neutral-900 font-semibold rounded-lg  hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
              onClick={() => {
                setHeading("My Requests");
                setShowSentRequests(true);
              }}
            >
              My Requests
            </button>
          ) : (
            <button
              className="p-3 bg-yellow-600 text-neutral-900 rounded-lg  hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
              onClick={() => {
                setHeading("Recieved Requests");
                setShowSentRequests(false);
              }}
            >
              Recieved Requests
            </button>
          )}
        </div>
      </div>

      <div>
        {isloading ? (
          <div>
            <FileAnimationsmall />
          </div>
        ) : myRequests && recievedRequests ? (
          <div>
            {!showSentRequests ? (
              recievedRequests.length === 0 ? (
                <h1 className="text-center pt-10 allusebody text-stone-200 text-3xl">
                  No received requests found
                </h1>
              ) : (
                <BuyerRequest Requests={recievedRequests} />
              )
            ) : myRequests.length === 0 ? (
              <h1 className="text-center pt-10 allusebody text-stone-200 text-3xl">
                You have not created any request yet
              </h1>
            ) : (
              <SellerRequest Requests={myRequests} />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserCertifications;
