import axios from "axios";
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Add Product
export const addProduct = async (formData) => {
    try{
        const response = await axios.post(`${BACKEND_URL}/api/product/createproduct`,formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
             }})
            
        if(response.statusText === 'Created'){
            toast.success("Product Added Successfully... Pending Approval !!!")
            return true
        }
        return
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Products by Id
export const getProductsById = async (id) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/product/getproductbyid/${id}`,)
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

//Delete Product by Id
export const deleteProductById = async (id) => {
    try{
        const response = await axios.delete(`${BACKEND_URL}/api/product/deleteproduct/${id}`,)
            toast.success("Product Deleted Successfully !!!")
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Image by URl
export const getImageByUrl = async (imageUrl) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/product/getimagebyurl`, {
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

//Edit Product
export const editProduct = async (formData) => {
    try{
        const response = await axios.patch(`${BACKEND_URL}/api/product/editproduct`,formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
             }})
            
        if(response.statusText === 'OK'){
            toast.success("Product Edited Successfully... Pending Approval !!!")
            return true
        }
        return false
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

//Get Live Products
export const getLiveProducts = async () => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/product/getliveproducts`,)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};


//Get Similar Products
export const getSimilarProducts = async (userdata, excludeId) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/product/getsimilarproducts`, {
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


//Get Jeweler Products Information
export const getJewelerProductsInformation = async (id) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/product/getjewelerproducts/${id}`,)
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};