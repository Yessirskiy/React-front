import axios from "axios";
import Cookies from "js-cookie";

const loginURL = 'api/auth/login/'
const logoutURL = 'api/auth/logout/'
const changePasswordULR = 'api/users/change_password/'

export const changeUserPassword = async (api, payload) => {
    try {
        const response = await api.put(changePasswordULR, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        return response.data;
    } catch (error) {
        console.log("Error while updating users profile:", error);
        throw error;
    }
}

const axiosInst = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        "Content-Type": "application/json",
    }
});
axiosInst.defaults.withCredentials = true;

export const loginUser = async (payload) => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        axiosInst.defaults.headers.common['X-CSRFToken'] = csrfToken;
    }
    try {
        const response = await axiosInst.post(loginURL, payload);
        return response;
    } catch (error) {
        console.log("Error while loggin user in:", error);
        throw error;
    }
}

export const logoutUser = async () => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        axiosInst.defaults.headers.common['X-CSRFToken'] = csrfToken;
    }
    try {
        const response = await axiosInst.post(logoutURL);
        return response.data;
    } catch (error) {
        console.log("Error while loggin user out:", error);
        throw error;
    }
}