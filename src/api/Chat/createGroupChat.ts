import axios from "axios";
import { api } from "constant/helper";

const createGroupChat = async (form: any) => {
  try {;
    const token = localStorage.getItem("chit-chat");
    const { GroupPic } = form;
    let res;
    if (GroupPic) {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwwg7zh78/image/upload",
        GroupPic
      );
    }
    const Form = {chatName: form.chatName, GroupPicture: res?.data?.url, users: JSON.stringify(form.users)}
    const { data } = await axios.post(`${api}/api/chat/group`, Form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default createGroupChat;
