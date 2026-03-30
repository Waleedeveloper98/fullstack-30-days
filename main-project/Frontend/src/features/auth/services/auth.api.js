import axios from "axios"
import { getAccessToken } from "./tokenService"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = getAccessToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const register = async ({ username, email, password }) => {
    const response = await api.post("/api/auth/register", { username, email, password })
    return response.data;
}

export const login = async ({ email, password }) => {
    const response = await api.post("/api/auth/login", { email, password })
    return response.data;
}

export const refresh = async () => {
    const response = await api.get("/api/auth/refresh")
    return response.data
}

export const getMe = async () => {
    const response = await api.get("/api/auth/get-me")
    return response.data
}