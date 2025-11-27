import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")

            if (!window.location.pathname.includes("/login")) {
                window.location.href = "/login"
            }
        }

        if (error.response?.status === 500) {
            console.error("Server error:", error.response.data)
        }

        return Promise.reject(error)
    }
)

export { api }
