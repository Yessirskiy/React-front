import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../hooks/useAuth';

const baseURL = "http://localhost:8000/";

const useAxios = () => {
    const { logout } = useAuth();

    const axiosInstance = axios.create({
        baseURL
    });

    axiosInstance.defaults.withCredentials = true;
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfToken;
    }

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 403) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;

