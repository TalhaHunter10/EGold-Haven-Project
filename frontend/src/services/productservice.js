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