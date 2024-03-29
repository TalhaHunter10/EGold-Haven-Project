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
        }
        return true
    }catch(error){
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message)
    }
};

