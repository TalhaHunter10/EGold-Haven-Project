import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  SET_LOGIN,
  SET_USERID,
  selectIsLoggedIn,
  selectStatus,
} from "./redux/features/auth/authSlice";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Forum from "./components/forum/forum";
import Landing from "./components/landing/landing";
import Signup from "./components/signup/signup";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import ResetPassword from "./components/resetpassword/resetpassword";
import CreateListing from "./components/createlisting/createlisting";
import AdminDashboard from "./components/admindashboard/admindashboard";
import { getloginStatus } from "./services/authservice";
import JewelerRequest from "./components/jewelerrequest/jewelerrequest";
import JewelerRequests from "./components/admindashboard/jewelerrequests";
import ListingDetails from "./components/listingcontainers/listingdetails";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./components/PageNotFound";
import TermsConditions from "./components/login/termsconditions";
import PrivacyPolicy from "./components/privacypolicy";
import Favoritelistings from "./components/profile/favoritelistings";
import Mylistings from "./components/profile/mylistings";
import UserProfile from "./components/profile/userprofile";
import MyListingDetails from "./components/profile/mylistings/mylistingdetails";
import ListingRequests from "./components/admindashboard/listingrequests";
import StorePage from "./components/manageJeweler/storepage";
import EditJewelerProfile from "./components/manageJeweler/editjewelerprofile";
import AddProduct from "./components/manageJeweler/addproduct";
import JewelerProductDetails from "./components/manageJeweler/jewelerproductdetails";
import ProductRequests from "./components/admindashboard/productrequests";
import ProductDetails from "./components/productcontainers/productdetails";
import PublicStorePage from "./components/manageJeweler/publicstorepage";
import Chatpage from "./components/chat/Chatpage";
import CommissionRequests from "./components/admindashboard/commissionrequests";
import Listings from "./components/pages/listings";
import Products from "./components/pages/products";
import Jewelers from "./components/pages/jewelers";
import PostDetails from "./components/forum/postdetails";
import UserNotifications from "./components/notifications/usernotifications";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState("");
  const userstatus = useSelector(selectStatus);

  useEffect(() => {
    setIsAdmin(userstatus === "admin");
  }, [userstatus]);

  useEffect(() => {
    async function loginStatus() {
      const status = await getloginStatus();
      dispatch(SET_LOGIN(status.verified));
      dispatch(SET_USERID(status.id));
    }
    loginStatus();
  }, [dispatch]);

  const renderLayout = () => {
    if (isAdmin) {
      return (
        <div className="bg-neutral-900">
          <Routes>
            <Route path="/home" element={<AdminDashboard />} />
            <Route path="/jewelerrequests" element={<JewelerRequests />} />
            <Route path="/listingrequests" element={<ListingRequests />} />
            <Route path="/productrequests" element={<ProductRequests />} />
            <Route
              path="/commissionrequests"
              element={<CommissionRequests />}
            />
          </Routes>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="upperbody">
            <div className="containermainbody">
              <Header />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route
                  path="/user-notifications"
                  element={<UserNotifications />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route
                  path="/favoritelistings"
                  element={<Favoritelistings />}
                />
                <Route path="/mylistings" element={<Mylistings />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/resetpassword/:resetToken"
                  element={<ResetPassword />}
                />
                <Route path="/createlisting" element={<CreateListing />} />
                <Route
                  path="/listingdetails/:id"
                  element={<ListingDetails />}
                />
                <Route
                  path="/mylistingdetails/:id"
                  element={<MyListingDetails />}
                />
                <Route path="/listings" element={<Listings />} />

                <Route path="/jewelers" element={<Jewelers />} />
                <Route path="/jewelerrequest" element={<JewelerRequest />} />
                <Route path="/storepage" element={<StorePage />} />
                <Route
                  path="/editjewelerprofile"
                  element={<EditJewelerProfile />}
                />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route
                  path="/myproductdetails/:id"
                  element={<JewelerProductDetails />}
                />
                <Route
                  path="/productdetails/:id"
                  element={<ProductDetails />}
                />
                <Route path="/jewelerpage/:id" element={<PublicStorePage />} />
                <Route path="/products" element={<Products />} />

                <Route path="/chat" element={<Chatpage />} />

                <Route path="/forum" element={<Forum />} />
                <Route path="/post/:id" element={<PostDetails />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
          <div className="lowerbody">
            <div className="footer-container">
              <Footer />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <ScrollToTop />
      <ToastContainer
        limit={3}
        bodyClassName={"customtoastbody"}
        position="top-left"
      />
      {renderLayout()}
    </div>
  );
}

export default App;
