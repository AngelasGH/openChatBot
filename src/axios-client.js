import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}api`
})

// interceptors are special functions which will be executed before the request is being sent
// or after the response is recieved
// we're axios to use the ff. interceptors before making request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;

    // if the response is not ok, return the error message
})

export default axiosClient