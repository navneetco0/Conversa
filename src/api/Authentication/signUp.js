import axios from "axios";
import { api } from "../../constant/helper";

export const signUp = async (form) => {
  try {
    const { profile_pic } = form;
    let res;
    if (profile_pic) {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwwg7zh78/image/upload",
        profile_pic
      );
    }
    console.log(res?.data?.url);
    const { data } = await axios.post(
      `${api}/api/user/register`,
      { ...form, profile_pic: res?.data?.url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    if(data?.token) localStorage.setItem('chit-chat', data?.token);
    return data;
  } catch (error) {
    return error;
  }
};
