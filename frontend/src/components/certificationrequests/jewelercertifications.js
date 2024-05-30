import { toast } from "react-toastify";
import { getloginStatus } from "../../services/authservice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJewelerRequests } from "../../services/certificationservice";
import { FileAnimationsmall } from "../loader/loader";
import JewelerRequest from "./jewelerrequest";

const Jewelercertifications = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [jewelerRequests, setJewelerRequests] = useState([]);

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
        const JRequests = await getJewelerRequests();
        setJewelerRequests(JRequests);
      } catch (error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    };
    getRequests();
  }, []);

  return (
    <div className="pb-20 mt-10">
      <div className="text-stone-200 min-[150px]:text-4xl md:text-5xl min-[150px]:text-center md:text-left md:pl-8 alluse mb-8 ">
        Jeweler Certification Requests
      </div>
      <div>
        {isloading ? (
          <div>
            <FileAnimationsmall />
          </div>
        ) : jewelerRequests ? (
          <div>
            {jewelerRequests.length === 0 ? (
              <h1 className="text-center pt-10 allusebody text-stone-200 text-3xl">
                No requests found
              </h1>
            ) : (
              <JewelerRequest Requests={jewelerRequests} />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Jewelercertifications;
