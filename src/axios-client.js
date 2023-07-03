// this is an axios instance with baseURL, and setsup request and response interceptors 
// to handle authentication, error handling, token removal if response is unauthorized.


import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}api`,
})

// interceptors are special functions which will be executed before the request is being sent
// or after the response is recieved
// we're axios to use the ff. interceptors before making request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
})

//executed after response is receieved from the server
axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error;
    if (response.status === 401) { //if an error is unauthorized. the user is not authenticated
        localStorage.removeItem('ACCESS_TOKEN') //removes a token from localstorage with a key of "ACCESS_TOKEN" to potentially trigger a re-authentication flow.
    }

    throw error;
    // if not 401 or if an error occurs during the error handling process the code throws the error again. 
    //This ensures any errors condition or unexpected errors are propagated for futher handling.

    // if the response is not ok, return the error message
})

export default axiosClient