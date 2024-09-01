import axios from 'axios';
import Cookies from 'js-cookie'; 
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = "http://localhost:8000/";

const useAxios = () => {
    const { user } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL
    });
    axiosInstance.defaults.withCredentials = true;

    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfToken;
    }

    return axiosInstance;
};

export default useAxios;
