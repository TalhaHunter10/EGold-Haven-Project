import axios from "axios"
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Register Jeweler
export const registerJeweler = async (formData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/jeweler/registerjeweler`,formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
             }})
            
        if(response.statusText === 'Created'){
            toast.success("Jeweler Status Request sent Successfully... Pending Approval !!!")
            return true;
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Jeweler Details
export const getJewelerDetails = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/jeweler/getjewelerdetails`)
            
        if(response.status === 200){
           
        }
        return {data : response.data , result: true};
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Jeweler Products
export const getJewelerProducts = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/product/getjewelerproducts`)
            
        if(response.status === 200){
        }
        return {data : response.data , result: true};
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Image by URL
export const getCoverImagebyUrl = async (imageUrl) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/jeweler/getcoverimagebyurl`, {
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

//Edit Jeweler Details
export const editJewelerDetails = async (formData) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/jeweler/updatejeweler`,formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
             }})
            
        if(response.statusText === 'OK'){
            toast.success("Jeweler Details Updated Successfully !!!")
            return true;
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Jeweler Information
export const getJewelerInformation = async (id) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/jeweler/getjewelerinfo/${id}`)

        if(response.status === 200){
            return {data : response.data , result: true};
        }
        else{
            return false;
        }
       
    }
    catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};