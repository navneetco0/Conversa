import axios from "axios";
import { api } from "../../constant/helper";

const getAllMessages = async (id: string, socket: any) => {
  try {
    socket.emit("join chat", id);
    const token = localStorage.getItem("chit-chat");
    const { data } = await axios.get(`${api}/api/message/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default getAllMessages;
