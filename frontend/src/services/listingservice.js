import axios from "axios"
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Create Listing
export const createListing = async (formData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/listings/createlisting`,formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
             }})
            
        if(response.statusText === 'Created'){
            toast.success("Listing Created Successfully... Pending Approval !!!")
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Live Listings
export const getLiveListings = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getlivelistings`)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Listings by Id
export const getListingsById = async (id) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getlistingsbyid/${id}`,)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

