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