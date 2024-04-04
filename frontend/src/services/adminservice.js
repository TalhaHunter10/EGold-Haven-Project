import axios from "axios"
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Register Jeweler
export const getStats = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getstats`)
            
        if(response.status === 200){
            toast.success("Data Fetched and Updated Successfully !!!")
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Jeweler Requests
export const getJewelerRequests = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getjewelerrequests`)
            
        if(response.status === 200){
            toast.success("Data Fetched and Updated Successfully !!!")
        }
        return {data : response.data , result: true};
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//accept Jeweler
export const acceptJeweler = async (userId) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/acceptjeweler/${userId}`)
        if(response.statusText === 'OK'){
            toast.success("Jeweler Status Accepted Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}

//reject Jeweler
export const rejectJeweler = async (jewelerId, userId) => {
    try{
        const response = await axios.delete(`${BACKEND_URL}/api/admin/rejectjeweler/${jewelerId}/${userId}`)
        if(response.statusText === 'OK'){
            toast.success("Jeweler Status Request Rejected Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}


//Get Listing Requests
export const getListingRequests = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getlistingrequests`)
            
        if(response.status === 200){
            toast.success("Data Fetched and Updated Successfully !!!")
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//accept Listing
export const acceptListing = async (listingId) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/acceptlisting/${listingId}`)
        if(response.statusText === 'OK'){
            toast.success("Listing Status Accepted Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}

//reject Listing
export const rejectListing = async (listingId) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/rejectlisting/${listingId}`)
        if(response.statusText === 'OK'){
            toast.success("Listing Status Request Rejected Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}

//Get User Details for Listing Request
export const getUserDetailsForListingRequest = async (userId) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getuserdetailsforlistingrequest/${userId}`)
        return response;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};