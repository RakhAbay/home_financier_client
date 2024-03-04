import { AxiosResponse } from "axios"
import { axiosInstance } from "./config/axiosConfig"
import SignUpPayload from "./types/SignUpPayload"
import SignInResponse from "./types/SignInResponse"
import SignUpResponse from "./types/SignUpResponse"
import Category from "./types/Category"
import InOutCome from "./types/InOutCome"
import InOutComeAddRequest from "./types/InOutComeAddRequest"
import InOutComeEditRequest from "./types/InOutComeEditRequest"
import { FinancialGoal, FinancialGoalHistoryRequest, FinancialGoalRequest } from "./types/FinancialGoal"

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
            return await axiosInstance.post(`${BASE_URL}/incomes/save-outcome`, { categoryId, sum, comment })
        },

        editOutcome: async ({ categoryId, sum, comment }: InOutComeAddRequest): Promise<AxiosResponse<InOutCome>> => {
            return await axiosInstance.put(`${BASE_URL}/incomes/edit-outcome`, { categoryId, sum, comment })
        },

        deleteOutcome: async (id: number): Promise<AxiosResponse<null>> => {
            return await axiosInstance.delete(`${BASE_URL}/incomes/delete-outcome/${id}`)
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
}

export default api
