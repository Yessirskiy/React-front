const profileURL = 'api/users/profile/';
const allPreferencesURL = 'api/users/preferences/'
const authPreferencesURL = 'api/users/preferences/auth/';
const avatarChangeURL = 'api/users/profile/picture/'

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

export const updateProfileAvatar = async (api, file) => {
    try {
        const response = await api.put(avatarChangeURL, { avatar: file }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }); 
        return response.data;
    } catch (error) {
        console.log("Error while updating users avatar:", error);
        throw error;
    }
}

export const removeProfileAvatar = async (api) => {
    try {
        const response = await api.delete(avatarChangeURL, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }); 
        return response.data;
    } catch (error) {
        console.log("Error while removing users avatar:", error);
        throw error;
    }
}

export const getAllPreferences = async (api) => {
    try {
        const response = await api.get(allPreferencesURL); 
        return response.data;
    } catch (error) {
        console.log("Error while getting users all preferences:", error);
        throw error;
    }
}

export const updateAllPreferences = async (api, payload) => {
    try {
        const response = await api.put(allPreferencesURL, payload, {
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