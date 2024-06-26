import axios from "axios";
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
            return true
        }
        return
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


//Get Similar Listings
export const getSimilarListings = async (userdata, excludeId) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getsimilarlistings`, {
            params: {
                category: userdata,
                excludeId: excludeId
            }
        })
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Get User Listings
export const getUserListings = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getuserlistings`)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Get Favorite Listings
export const getFavoriteListings = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getfavoritelistings`)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Like Listing
export const likeListing = async (listingId) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/listings/likelisting`, {listingId})
        if(response.statusCode === 401){
            toast.error("Please Login to Like the Listing")
            return false;
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//unLike Listing
export const unlikeListing = async (listingId) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/listings/unlikelisting`, {listingId})
        if(response.statusCode === 401){
            return false;
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Get Like Status
export const getLikedStatus = async (listingid) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getlikedstatus`, {
            params: {
                listingId: listingid
            }
        })
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
        if(response.statusCode === 500){
            return false;
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Listings by Id
export const deleteListingById = async (id) => {
    try{
        const response = await axios.delete(`${BACKEND_URL}/api/listings/deletelistingbyid/${id}`,)
        
            toast.success("Listing Deleted Successfully !!!")
            return true;
        
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Get Image by URL
export const getImageByUrl = async (imageUrl) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/listings/getimagebyurl`, {
            params: {
                imageUrl: imageUrl
            },
            responseType: 'blob'
        })
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Edit Listing
export const editListing = async (formData) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/listings/editlisting`,formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
             }})
            
        toast.success("Listing Edited Successfully... Pending Approval !!!")
        return true
    }catch(error){  
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};



//Set listing sold by Id
export const setListingSold = async (id) => {
    try{
            await axios.patch(`${BACKEND_URL}/api/listings/setlistingsold/${id}`,)
        
            toast.success("Listing Marked as Sold Successfully !!!")
            return true;
        
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};