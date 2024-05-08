import axios from "axios"
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Register Jeweler
export const getStats = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getstats`)
            
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


//Get Product Requests
export const getProductRequests = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getproductrequests`)
            
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//accept Product
export const acceptProduct = async (productId) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/acceptproduct/${productId}`)
        if(response.statusText === 'OK'){
            toast.success("Product Status Accepted Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}

//reject Product
export const rejectProduct = async (productId) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/rejectproduct/${productId}`)
        if(response.statusText === 'OK'){
            toast.success("Product Status Request Rejected Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}


//Get Jewe;er Details for Product Request
export const getJewelerDetailsForProductRequest = async (jewelerId) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getjewelerdetailsforproductrequest/${jewelerId}`)
        return response;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Get Commission Change Requests
export const getCommissionChangeRequests = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/admin/getcommissionchangerequests`)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//accept Commission Change Request
export const acceptCommissionChangeRequest = async (requestId , reason) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/acceptcommissionchangerequest`, {requestId , reason})
        if(response.statusText === 'OK'){
            toast.success("Commission Change Request Accepted Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}

//reject Commission Change Request
export const rejectCommissionChangeRequest = async (requestId , reason) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/admin/rejectcommissionchangerequest`, {requestId , reason})
        if(response.statusText === 'OK'){
            toast.success("Commission Change Request Rejected Successfully !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
}