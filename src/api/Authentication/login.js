import axios from "axios";
import { api } from "../../constant/helper"

export const login = async (form)=>{
    try {
        const {data} = await axios.post(`${api}/api/user/login`,form);
        return data;
    } catch (error) {
        return error?.response?.data
    }
}