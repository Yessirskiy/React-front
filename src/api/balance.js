const balanceURL = 'api/balance/balance/'
const transactionsURL = 'api/balance/transactions/'

export const getBalance = async (api) => {
    try {
        const response = await api.get(balanceURL);
        return response.data;
    } catch (error) {
        console.log("Error while getting users balance:", error);
        throw error;
    }
};

export const getTransactions = async (api, page) => {
    try {
        const response = await api.get(transactionsURL, { 
            params: {
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error while gettings user's transaction:", error);
        throw error;
    }
}