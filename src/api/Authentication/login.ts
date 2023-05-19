import axios, { AxiosResponse } from "axios";
import { api } from "../../constant/helper"

export const login = async (form: any): Promise<any>=>{
    try {
        const response: AxiosResponse<any> = await axios.post(`${api}/api/user/login`,form);
        return response.data;
    } catch (error: any) {
        return error?.response?.data
    }
}