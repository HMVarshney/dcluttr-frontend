import axios from 'axios';
import { toast } from 'sonner';


const axiosInterceptorInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInterceptorInstance.interceptors.request.use(
    (config) => {
        // if (Actions.getCookie("auth_token")) {
        //     if (config.headers) config.headers = {
        //         'Authorization': `Bearer ${Actions.getCookie("auth_token")}`,
        //     };
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInterceptorInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        toast.error("Something went wrong.", {
            duration: 3000,
            description: error.response.data.message,
            style: {
                borderRadius: "10px",
                color: "#333",
            },
        });
        return Promise.reject(error);
    }
);

export default axiosInterceptorInstance;