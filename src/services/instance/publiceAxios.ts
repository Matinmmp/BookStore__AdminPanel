import axios from "axios";
import { BASE_URL } from "../../configs/constans";



const publicAxios = axios.create({
    baseURL: BASE_URL
});


publicAxios.interceptors.request.use(config => config, error => Promise.reject(error));

publicAxios.interceptors.response.use(res => res,
    error => {
        if (error.response.status === 401) alert("401");
        return Promise.reject(error);
    });

export default publicAxios;