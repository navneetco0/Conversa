import axios from "axios";
import { api } from "constant/helper";

const getAllMessages = async(form: any) =>{
    try {
        const token = localStorage.getItem("chit-chat");
        const { data } = await axios.post(`${api}/api/chat`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error : any) {
        return error.response.data;
    }
}

export default getAllMessages;