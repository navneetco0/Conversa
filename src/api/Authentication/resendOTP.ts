import axios from "axios";
import { api } from "constant/helper";

const resendOTP = async (token: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${api}/api/user/resend-otp`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export default resendOTP;
