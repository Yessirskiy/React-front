import axios from "axios";

const loginURL = 'api/token/'
const logoutURL = 'api/logout/'
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

export const login = async (payload) => {
    try {
        const response = await axiosInst.post(loginURL, payload);
        return response.data;
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