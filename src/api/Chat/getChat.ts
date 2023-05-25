import axios from "axios";
import { api } from "../../constant/helper";

const getChat = async () => {
  try {
    const token = localStorage.getItem("chit-chat");
    const { data } = await axios.get(`${api}/api/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default getChat;
