import axios from "axios"
import localStorageUtils from "../utils/localStorageUtil"

const BASE_URL = "http://localhost:8080/api/v1"

export const axiosInstance = axios.create({ baseURL: BASE_URL })

axiosInstance.interceptors.request.use(
    (config: any) => {
        if (config.authorization !== false) {
            const token = localStorageUtils.authToken.get()
            if (token) {
                config.headers.Authorization = "Bearer " + token
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("response intercepting...")
        console.log(response)
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    (error) => {
        console.log(error)
        const originalRequest = error.config
        // In 'axios': '^1.1.3' there is an issue with headers, and this is the workaround.
        originalRequest.headers = JSON.parse(
            JSON.stringify(originalRequest.headers || {})
        )
    }
)
