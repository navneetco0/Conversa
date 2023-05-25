import axios, { AxiosResponse } from "axios";
import { api } from "../../constant/helper";

export const tokenAuth = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("chit-chat");
    const {data} = await axios.get(
      `${api}/api/user/auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
