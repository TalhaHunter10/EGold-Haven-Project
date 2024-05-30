import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//create certification request
export const createCertificationRequest = async (
  listingid,
  buyerid,
  sellerid,
  jewelerid
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/createcertificationrequest`,
      {
        listingid,
        buyerid,
        sellerid,
        jewelerid,
      }
    );
    if (response.status === 200) {
      toast.success("Certification request created successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//get my certification requests
export const getMyRequests = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/certification/getmyrequests`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//get recieved certification requests
export const getRecievedRequests = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/certification/getrecievedrequests`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//accept certification request
export const acceptRequest = async (requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/acceptrequest`,
      {
        requestId,
      }
    );
    if (response.status === 200) {
      toast.success("Request accepted successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//reject certification request
export const rejectRequest = async (requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/rejectrequest`,
      {
        requestId,
      }
    );
    if (response.status === 200) {
      toast.success("Request rejected successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//get certification request count for jeweler
export const getRequestCount = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/certification/getrequestcount`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//get jeweler certification requests
export const getJewelerRequests = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/certification/getjewelerrequests`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//accept certification request by jeweler
export const acceptJewelerRequest = async (requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/acceptrequestasjeweler`,
      {
        requestId,
      }
    );
    if (response.status === 200) {
      toast.success("Request accepted successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//reject certification request by jeweler
export const rejectJewelerRequest = async (requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/rejectrequestasjeweler`,
      {
        requestId,
      }
    );
    if (response.status === 200) {
      toast.success("Request rejected successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//receive buyer commission for certification
export const receiveBuyerCommission = async (requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/receivebuyercommission`,
      {
        requestId,
      }
    );
    if (response.status === 200) {
      toast.success("Commission received successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//received seller jewelry for certification
export const receiveSellerJewelry = async (requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/receivesellerjewelry`,
      {
        requestId,
      }
    );
    if (response.status === 200) {
      toast.success("Jewelry received successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//add report
export const addReport = async (report, requestId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/certification/addreport`,
      {
        requestId,
        report,
      }
    );
    if (response.status === 200) {
      toast.success("Report added successfully");
    }
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
