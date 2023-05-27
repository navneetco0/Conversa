import axios from "axios";
import { api } from "../../constant/helper";

const accessChat = async (userId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("chit-chat");
    const { data } = await axios.post(`${api}/api/chat`, {userId}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.chat;
  } catch (error: any) {
    return error.response.data;
  }
};

export default accessChat;
