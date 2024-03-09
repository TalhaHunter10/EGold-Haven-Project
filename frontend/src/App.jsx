
import './App.css';
import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SET_LOGIN, selectStatus } from './redux/features/auth/authSlice';
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


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState('')
  const userstatus = useSelector(selectStatus);

  useEffect (() => {
    async function loginStatus() {
      try {
        const status = await getloginStatus();
        dispatch(SET_LOGIN(status));
      } catch (error) {
        console.error("Error while fetching login status:", error);
      }
    }
    loginStatus();
  }, [dispatch]);

  useEffect(() => {
    setIsAdmin(userstatus === 'admin');
  }, [userstatus]);
  
  useEffect (() => {
    async function loginStatus() {
      const status = await getloginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch]);


  const renderLayout = () => {
    if (isAdmin) {
      return (
        <Routes>
          <Route path="/home" element={<AdminDashboard />} />
          
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
              <Route path="/forum" element={<Forum/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/forgotpassword" element={<ForgotPassword/>} />
              <Route path="/resetpassword/:resetToken" element={<ResetPassword/>} />
              <Route path="/createlisting" element={<CreateListing/>} />
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
    <ToastContainer limit={3} bodyClassName={"customtoastbody"}/>
        {renderLayout()}
    </BrowserRouter>
  );
}

export default App;
