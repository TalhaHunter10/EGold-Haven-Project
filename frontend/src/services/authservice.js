import axios from "axios"
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Register User
export const registerUser = async (userData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/register`,userData)
        if(response.statusText === 'Created'){
            toast.success("User Registered Successfully")
        }
        return response.data
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Login User
export const loginUser = async (userData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/login`,userData)
        if(response.statusText === 'OK'){
            toast.success("Login Successful ...")
        }
        return response.data
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//login user through googlesso
export const googlesso = async (userData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/googlesso`,userData)
        if(response.statusText === 'OK'){
            toast.success("Login Successful ...")
        }
        return response.data
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Logout User
export const logoutUser = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/users/logout`)
        if(response.statusText === 'OK'){
            toast.success("Logout Successful ...")
        }
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Login Status
export const getloginStatus = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Forgot Passowrd
export const forgotPassword = async (userData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`,userData)
        if(response.statusText === 'OK'){
            toast.success(response.data.message)
        }
        return response.data
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Reset Passowrd
export const resetPassword = async (userData, resetToken) => {
    try{
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`,userData)
        if(response.statusText === 'OK'){
            toast.success(response.data.message)
        }
        return response.data
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};