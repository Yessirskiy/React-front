import axios from "axios";

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
axiosInst.defaults.xsrfCookieName = "csrftoken";
axiosInst.defaults.xsrfHeaderName = "X-CSRFToken";
axiosInst.defaults.withCredentials = true;

export const login = async (payload) => {
    try {
        const response = await axiosInst.post(loginURL, payload);
        return response;
    } catch (error) {
        console.log("Error while loggin user in:", error);
        throw error;
    }
}

export const logout = async (payload) => {
    try {
        const response = await axiosInst.post(logoutURL, payload);
        return response.data;
    } catch (error) {
        console.log("Error while loggin user out:", error);
        throw error;
    }
}