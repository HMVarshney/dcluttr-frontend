import axios from "axios";
import { getCookie } from "./utils";

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    if (getCookie("accessToken") && config.headers) {
      config.headers = {
        Authorization: `Bearer ${getCookie("accessToken")}`
      };
    }
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
    return Promise.reject(error);
  }
);

export const axiosMetaServiceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_METASERVICE_URL
});
axiosMetaServiceInstance.interceptors.request.use(
  (config) => {
    if (getCookie("accessToken") && config.headers) {
      config.headers = {
        Authorization: `Bearer ${getCookie("accessToken")}`
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInterceptorInstance;
