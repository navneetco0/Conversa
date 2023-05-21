import axios from "axios";
import { api } from "../../constant/helper";

const forgotPassword = async (form: any) => {
  try {
    const { data } = await axios.patch(
      `${api}/api/user/forgot-password`,
      form,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error:any) {
    return error?.response?.data
  }
};

export default forgotPassword;