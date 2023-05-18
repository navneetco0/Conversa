import axios from "axios";
import { api } from "../../constant/helper"

export const login = async (form)=>{
    try {
        console.log(form);
        const {data} = await axios.post(`${api}/api/user/login`,form);
        console.log(data);
        return data;
    } catch (error) {
        return error
    }
}