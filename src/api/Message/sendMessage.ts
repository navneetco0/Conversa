import axios from "axios";
import { api } from "constant/helper";

const sendMessage = async(form: any) =>{
    try {
        console.log(form);
        const token = localStorage.getItem("chit-chat");
        const { data } = await axios.post(`${api}/api/message`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error : any) {
        return error.response.data;
    }
}

export default sendMessage;