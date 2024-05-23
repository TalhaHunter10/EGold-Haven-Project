import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getloginStatus } from "../../services/authservice";
import { useNavigate } from "react-router-dom";
import { FileAnimationsmall } from "../loader/loader";
import { getJewelerNotifications } from "../../services/notificationservice";
import NotificationContainer from "./notificationcontainer";

const JewelerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(useSelector(selectIsLoggedIn));
  const [showReadNotifications, setShowReadNotifications] = useState(false);

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const status = await getloginStatus();
      if (status.verified === false || status === false) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }

    setIsFetched(false);
    setLoading(true);
    try {
      const res = await getJewelerNotifications();
      setNotifications(res);
      const unread = [];
      const read = [];
      res.forEach((notification) => {
        if (notification.status === "unread") {
          unread.push(notification);
        } else {
          read.push(notification);
        }
      });
      setUnreadNotifications(unread);
      setReadNotifications(read);
      setLoading(false);
      setIsFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="pb-20">
      <div className="flex flex-wrap justify-between mt-10">
        <div className=" text-stone-200 min-[150px]:text-3xl min-[150px]:text-center sm:text-left md:text-5xl alluse md:pl-8 mb-5 my-auto">
          Jeweler <span className="text-yellow-600">Notifications</span>
        </div>
        <div className="my-auto">
          {showReadNotifications ? (
            <button
              className="bg-danger-600 text-neutral-900 rounded-lg h-10 px-3  hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
              onClick={() => {
                setShowReadNotifications(false);
              }}
            >
              View Unread Notifications
            </button>
          ) : (
            <button
              className="bg-yellow-600 text-neutral-900 rounded-lg h-10 px-3 hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
              onClick={() => {
                setShowReadNotifications(true);
              }}
            >
              View Read Notifications
            </button>
          )}
        </div>
      </div>

      <div className="min-[150px]:p-4 sm:p-10 bg-neutral-900 rounded-lg">
        <div className="text-center text-2xl text-stone-200 alluse py-4">
          {showReadNotifications ? (
            <div>
              {readNotifications.length > 0 ? (
                <div>{readNotifications.length} Read Notifications</div>
              ) : (
                <div className="text-center text-2xl text-stone-200">
                  No Read Notifications
                </div>
              )}
            </div>
          ) : (
            <div>
              <div>
                {unreadNotifications.length > 0 ? (
                  <div>{unreadNotifications.length} New Notifications</div>
                ) : (
                  <div className="text-center text-2xl text-stone-200">
                    No New Notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {!isFetched ? (
          <div>
            <FileAnimationsmall />
          </div>
        ) : notifications.length === 0 && isFetched ? (
          <div></div>
        ) : notifications.length > 0 && isFetched ? (
          <NotificationContainer
            notifications={
              showReadNotifications ? readNotifications : unreadNotifications
            }
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default JewelerNotifications;
