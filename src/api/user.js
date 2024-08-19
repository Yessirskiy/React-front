import useAxios from "../utils/UseAxios";

const profileURL = 'api/users/profile/';
const authPreferencesURL = 'api/users/preferences/auth/';

export const getProfile = async (api) => {
    try {
        const response = await api.get(profileURL);
        return response.data;
    } catch (error) {
        console.log("Error while getting users profile:", error);
        throw error;
    }
};

export const updateProfile = async (api, payload) => {
    try {
        const response = await api.put(profileURL, payload, {
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

export const getAuthPreferences = async (api) => {
    try {
        const response = await api.get(authPreferencesURL); 
        return response.data;
    } catch (error) {
        console.log("Error while getting users auth preferences:", error);
        throw error;
    }
}

export const updateAuthPreferences = async (api, payload) => {
    try {
        const response = await api.put(authPreferencesURL, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        return response.data;
    } catch (error) {
        console.log("Error while updating users auth preferences:", error);
        throw error;
    }
}