import { toast } from "react-toastify";
import { getloginStatus } from "../../services/authservice";
import { ChatState } from "../chat/ChatProvider";
import { useNavigate } from "react-router-dom";
import { readNotification } from "../../services/notificationservice";

const NotificationContainer = ({ notifications }) => {
  const navigate = useNavigate();
  const { setChatType } = ChatState();

  const getTimeSinceCreation = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = now.getTime() - createdDate.getTime();

    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff > 0) {
      return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    } else if (hoursDiff > 0) {
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else if (minutesDiff > 0) {
      return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
    } else {
      return `${secondsDiff} second${secondsDiff > 1 ? "s" : ""} ago`;
    }
  };

  const handleNotificationClick = (notification) => async () => {
    try {
      const status = await getloginStatus();
      if (!status.verified) {
        toast.error("Session Timed Out ! Please Login Again.");
        navigate("/login");
      } else if (status.verified) {
        try {
          await readNotification(notification._id);
        } catch (error) {
          console.error(error);
        }

        if (notification.notificationtype === "null") {
        } else if (notification.notificationtype === "mylisting") {
          window.location.href = `/mylistings`;
        } else if (notification.notificationtype === "chat") {
          if (notification.receivertype === "user") {
            localStorage.setItem("chatType", "user");
            setChatType("user");
          } else if (notification.receivertype === "jeweler") {
            localStorage.setItem("chatType", "jeweler");
            setChatType("jeweler");
          }
          window.location.href = `/chat`;
        } else if (notification.notificationtype === "forum") {
          window.location.href = `/forum`;
        } else if (notification.notificationtype === "jewelerstore") {
          window.location.href = `/storepage`;
        } else {
          console.log("Notification type not recognized");
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  return (
    <div className=" space-y-4  ">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`w-full text-stone-200 min-[150px]:p-4 sm:p-6 rounded-lg bg-stone-950 border-2 ${
            notification.status === "unread"
              ? "border-danger-600"
              : "border-yellow-600"
          } hover:scale-105 cursor-pointer duration-500 ease-in-out transition-all`}
          onClick={handleNotificationClick(notification)}
        >
          <div className="w-full">
            <div className="">
              <h1 className="alluse min-[150px]:text-2xl ms:text-3xl md:text-4xl">
                {notification.notification}
              </h1>
              <div className="mt-5 font-semibold">
                {notification.notificationtype === "mylisting" ? (
                  <p className="allusebody text-xl pt-2 pb-5 text-justify text-yellow-600">
                    Click to view your listings
                  </p>
                ) : notification.notificationtype === "chat" ? (
                  <p className="allusebody text-xl pt-2 pb-5 text-justify text-yellow-600">
                    Click to view chat
                  </p>
                ) : notification.notificationtype === "forum" ? (
                  <p className="allusebody text-xl pt-2 pb-5 text-justify text-yellow-600">
                    Click to visit forum
                  </p>
                ) : notification.notificationtype === "jewelerstore" ? (
                  <p className="allusebody text-xl pt-2 pb-5 text-justify text-yellow-600">
                    Click to view your store
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <p className="allusebody flex text-xl justify-end">
                {getTimeSinceCreation(notification.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
