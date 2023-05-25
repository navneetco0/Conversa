import axios from "axios";
import { api } from "../../constant/helper";

const sendForgotOTP = async (email: string):Promise<any> => {
  try {
    const { data } = await axios.post(
      `${api}/api/user/send-forgot-otp`,
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

export default sendForgotOTP;
