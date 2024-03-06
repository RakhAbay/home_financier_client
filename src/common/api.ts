import { AxiosResponse } from "axios"
import { axiosInstance } from "./config/axiosConfig"
import SignUpPayload from "./types/SignUpPayload"
import SignInResponse from "./types/SignInResponse"
import SignUpResponse from "./types/SignUpResponse"
import Category from "./types/Category"
import InOutCome, { InOutComeAnalytics } from "./types/InOutCome"
import InOutComeAddRequest from "./types/InOutComeAddRequest"
import InOutComeEditRequest from "./types/InOutComeEditRequest"
import { FinancialGoal, FinancialGoalHistoryRequest, FinancialGoalRequest } from "./types/FinancialGoal"
import { User, UserUpdateRequest } from "./types/User"

const BASE_URL = 'http://localhost:8080/api/v1'


const api = {
    auth: {
        signUp: async (payload: SignUpPayload): Promise<AxiosResponse<SignUpResponse>> => {
            return await axiosInstance.post(`${BASE_URL}/auth/sign-up`, payload)
        },

        signIn: async (email: string, password: string): Promise<AxiosResponse<SignInResponse>> => {
            return await axiosInstance.post(`${BASE_URL}/auth/sign-in`, { email, password })
        }
    },

    categories: {
        addIncome: async (name: string): Promise<AxiosResponse<Category>> => {
            return await axiosInstance.post(`${BASE_URL}/categories/add-income`, { name })
        },

        addOutcome: async (name: string): Promise<AxiosResponse<Category>> => {
            return await axiosInstance.post(`${BASE_URL}/categories/add-outcome`, { name })
        },

        incomeCategories: async (): Promise<AxiosResponse<Category[]>> => {
            return await axiosInstance.get(`${BASE_URL}/categories/income-categories`)
        },

        outcomeCategories: async (): Promise<AxiosResponse<Category[]>> => {
            return await axiosInstance.get(`${BASE_URL}/categories/outcome-categories`)
        }
    },

    income: {
        saveIncome: async ({ categoryId, sum, comment }: InOutComeAddRequest): Promise<AxiosResponse<InOutCome>> => {
            return await axiosInstance.post(`${BASE_URL}/incomes/save-income`, { categoryId, sum, comment })
        },

        editIncome: async ({ id, categoryId, sum, comment }: InOutComeEditRequest): Promise<AxiosResponse<InOutCome>> => {
            return await axiosInstance.put(`${BASE_URL}/incomes/edit-income/${id}`, { categoryId, sum, comment })
        },

        deleteIncome: async (id: number): Promise<AxiosResponse<null>> => {
            return await axiosInstance.delete(`${BASE_URL}/incomes/delete-income/${id}`)
        },

        list: async (): Promise<AxiosResponse<InOutCome[]>> => {
            return await axiosInstance.post(`${BASE_URL}/incomes/list`)
        },
    },

    outcome: {
        saveOutcome: async ({ categoryId, sum, comment }: InOutComeAddRequest): Promise<AxiosResponse<InOutCome>> => {
            return await axiosInstance.post(`${BASE_URL}/outcomes/save-outcome`, { categoryId, sum, comment })
        },

        editOutcome: async ({ id, categoryId, sum, comment }: InOutComeEditRequest): Promise<AxiosResponse<InOutCome>> => {
            return await axiosInstance.put(`${BASE_URL}/outcomes/edit-outcome`, { id, categoryId, sum, comment })
        },

        deleteOutcome: async (id: number): Promise<AxiosResponse<null>> => {
            return await axiosInstance.delete(`${BASE_URL}/outcomes/delete-outcome/${id}`)
        },

        list: async (): Promise<AxiosResponse<InOutCome[]>> => {
            return await axiosInstance.post(`${BASE_URL}/outcomes/list`)
        },
    },

    financialGoal: {
        addFinancialGoal: async (request: FinancialGoalRequest): Promise<AxiosResponse<FinancialGoal>> => {
            return await axiosInstance.post(`${BASE_URL}/financial-goals/add`, request)
        },

        deleteFinancialGoal: async (id: number): Promise<AxiosResponse<null>> => {
            return await axiosInstance.delete(`${BASE_URL}/financial-goals/delete/${id}`)
        },

        getFinancialGoalsByUser: async (): Promise<AxiosResponse<FinancialGoal[]>> => {
            return await axiosInstance.get(`${BASE_URL}/financial-goals/all`)
        },

        getFinancialGoalById: async (id: number): Promise<AxiosResponse<FinancialGoal>> => {
            return await axiosInstance.get(`${BASE_URL}/financial-goals/${id}`)
        },

        addHistory: async (request: FinancialGoalHistoryRequest): Promise<AxiosResponse<FinancialGoal>> => {
            return await axiosInstance.post(`${BASE_URL}/financial-goals/add-history`, request)
        }
    },

    analytics: {
        incomeAnalytics: async (): Promise<AxiosResponse<InOutComeAnalytics>> => {
            return await axiosInstance.post(`${BASE_URL}/analytics/incomes`)
        },

        outcomeAnalytics: async (): Promise<AxiosResponse<InOutComeAnalytics>> => {
            return await axiosInstance.post(`${BASE_URL}/analytics/outcomes`)
        },
    },

    profile: {
        getProfile: async (): Promise<AxiosResponse<User>> => {
            return await axiosInstance.get(`${BASE_URL}/users`)
        },

        updateProfile: async (request: UserUpdateRequest): Promise<AxiosResponse<User>> => {
            return await axiosInstance.put(`${BASE_URL}/users/update`, request)
        },

        deleteUser: async (): Promise<AxiosResponse<null>> => {
            return await axiosInstance.delete(`${BASE_URL}/users/delete`)
        }
    },
}

export default api
