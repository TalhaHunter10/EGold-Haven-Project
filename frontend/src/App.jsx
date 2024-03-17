
import './App.css';
import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SET_LOGIN, SET_USERID, selectStatus } from './redux/features/auth/authSlice';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Forum from './components/forum/forum';
import About from './components/about/about';
import Landing from './components/landing/landing';
import Signup from './components/signup/signup';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './components/resetpassword/resetpassword';
import CreateListing from './components/createlisting/createlisting';
import AdminDashboard from './components/admindashboard/admindashboard';
import { getloginStatus } from './services/authservice';
import JewelerRequest from './components/jewelerrequest/jewelerrequest';
import JewelerRequests from './components/admindashboard/jewelerrequests';
import ListingDetails from './components/listingcontainers/listingdetails';
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './components/PageNotFound';
import TermsConditions from './components/login/termsconditions';
import PrivacyPolicy from './components/privacypolicy';
import Favoritelistings from './components/profile/favoritelistings';
import Mylistings from './components/profile/mylistings';
import UserProfile from './components/profile/userprofile';


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState('')
  const userstatus = useSelector(selectStatus);

  useEffect(() => {
    setIsAdmin(userstatus === 'admin');
  }, [userstatus]);
  
  useEffect (() => {
    async function loginStatus() {
      const status = await getloginStatus()
      dispatch(SET_LOGIN(status.verified))
      dispatch(SET_USERID(status.id))
    }
    loginStatus()
  }, [dispatch]);


  const renderLayout = () => {
    if (isAdmin) {
      return (
        <Routes>
          <Route path="/home" element={<AdminDashboard />} />
          <Route path="/jewelerrequests" element={<JewelerRequests/>} />
        </Routes>
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
              <Route path="/login" element={<Login/>} />
              <Route path="/terms" element={<TermsConditions/>} />
              <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
              <Route path="/forum" element={<Forum/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/userprofile" element={<UserProfile/>} />
              <Route path="/favoritelistings" element={<Favoritelistings />} />
              <Route path="/mylistings" element={<Mylistings/>} />
              <Route path="/jewelerrequest" element={<JewelerRequest/>} />
              <Route path="/forgotpassword" element={<ForgotPassword/>} />
              <Route path="/resetpassword/:resetToken" element={<ResetPassword/>} />
              <Route path="/createlisting" element={<CreateListing/>} />
              <Route path="/listingdetails/:id" element={<ListingDetails/>} />
             


              <Route path="*" element={<PageNotFound/>} />
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
    <BrowserRouter>
    <ScrollToTop />
    <ToastContainer limit={3} bodyClassName={"customtoastbody"}/>
        {renderLayout()}
    </BrowserRouter>
  );
}

export default App;
