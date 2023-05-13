import axios from "axios";
import { STRAPI } from "../constants";

const axiosInstance = axios.create({ baseURL: STRAPI.url });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
