import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Get User Notifications
export const getUserNotifications = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/notification/getusernotifications`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Read Notification
export const readNotification = async (notificationId) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/notification/readnotification`,
      { params: { notificationId } }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Get Jeweler Notifications
export const getJewelerNotifications = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/notification/getjewelernotifications`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
