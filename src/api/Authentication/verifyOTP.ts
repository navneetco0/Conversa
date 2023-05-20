import axios from "axios";
import { api } from "constant/helper";



const verifyOTP = async (data: any): Promise<any> => {
  try {
    const { token, otp } = JSON.parse(data);
    const result = await axios.post(
      `${api}/api/user/verify-otp`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    return result.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export default verifyOTP;
