import { BASE_URL } from "../../configs/constans";
import { toast } from "react-toastify";
import axios from "axios";


const publicAxios = axios.create({
    baseURL: BASE_URL
});


publicAxios.interceptors.request.use(config => config, error => Promise.reject(error));

publicAxios.interceptors.response.use(res => res,
    error => {
        if (error.response.status === 401) 
         toast.error('کاربری با این نام کاربری وجود ندارد.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        return Promise.reject(error);
    });

export default publicAxios;