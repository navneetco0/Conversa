import axios from "axios";
import { api } from "constant/helper";

const updateGroupChat = async (form: any) => {
  try {
    const token = localStorage.getItem("chit-chat");
    const { GroupPic, prev_pic, id } = form;
    const public_id = prev_pic.substring(
      prev_pic.lastIndexOf("/") + 1,
      prev_pic.lastIndexOf(".")
    );
    let res;
    if (GroupPic !== prev_pic) {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwwg7zh78/image/upload",
        GroupPic
      );
    } else {
      res = { data: { url: prev_pic } };
    }
    const Form = {
      chatName: form.chatName,
      GroupPicture: res?.data?.url,
      users: JSON.stringify(form.users),
      public_id,
    };
    const { data } = await axios.patch(`${api}/api/chat/group/${id}`, Form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default updateGroupChat;
