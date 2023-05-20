import axios from "axios";
import { api } from "constant/helper";

const verifyMail = async (email: string):Promise<any> => {
  try {
    const { data } = await axios.post(
      `${api}/api/user/verify`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export default verifyMail;
