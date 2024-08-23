const newsURL = 'api/news/'

export const getArticles = async (api, page, page_size) => {
    try {
        const response = await api.get(newsURL, { 
            params: {
                page: page,
                page_size: page_size,
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error while gettings user's transaction:", error);
        throw error;
    }
}