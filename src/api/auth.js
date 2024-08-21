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