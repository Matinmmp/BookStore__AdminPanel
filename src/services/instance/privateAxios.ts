
import { BASE_URL } from '../../configs/constans';
import { refreshToken } from '../api/refresh';
import Cookies from 'js-cookie';
import axios from 'axios';

const privateAxios = axios.create({
    baseURL: BASE_URL
});

privateAxios.interceptors.request.use(config => {
    const accessToken = Cookies.get('accessToken');
    
    if (accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}, error => {
    return Promise.reject(error)
})

privateAxios.interceptors.response.use(res => res, async error => {
    const originalConfig = error.config;
    if (error.response) {
        // should be 401
        if (error.response?.status === 500 && !originalConfig._retry) {  
            originalConfig._retry = true;
            try {
                const currentRefreshToken = Cookies.get("refreshToken")
                const res = await refreshToken(currentRefreshToken)
                const accessToken = res.token.accessToken
                if (accessToken) {
                    Cookies.set("accessToken", accessToken)
                    return privateAxios(originalConfig)
                }
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
});



export default privateAxios;