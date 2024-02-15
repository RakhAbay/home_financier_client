import { AxiosResponse } from "axios"
import { axiosInstance } from "./config/axiosConfig"
import SignUpPayload from "./types/SignUpPayload"
import SignInResponse from "./types/SignInResponse"
import SignUpResponse from "./types/SignUpResponse"

const BASE_URL = 'http://localhost:8080/api/v1'


const api = {
    auth: {
        signUp: async (payload: SignUpPayload): Promise<AxiosResponse<SignUpResponse>> => {
            return await axiosInstance.post(`${BASE_URL}/auth/sign-up`, payload)
        },

        signIn: async (email: string, password: string): Promise<AxiosResponse<SignInResponse>> => {
            return await axiosInstance.post(`${BASE_URL}/auth/sign-in`, {email, password})
        }
    }
}

export default api
