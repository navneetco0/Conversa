import axios from "axios";
import { api } from "constant/helper";


const searchUser = async (search: string): Promise<any> => {
    try {
        const token = localStorage.getItem("chit-chat");
        const { data } = await axios.get(`${api}/api/user/profile?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(data);
        return data;
    } catch (error : any) {
        return error?.response?.data
    }
}

export default searchUser;