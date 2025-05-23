import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://myvroom.space/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    const status = error.response?.status
    if (status === 401) {
        localStorage.removeItem('token')
    }
})
export default axiosInstance;
