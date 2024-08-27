const newsURL = 'api/news/'

export const getArticles = async (api, page, page_size, filter) => {
    try {
        const response = await api.get(newsURL, { 
            params: {
                page: page,
                page_size: page_size,
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error while gettings news articles:", error);
        throw error;
    }
}

export const getArticle = async (api, articleId) => {
    try {
        const response = await api.get(`${newsURL}${articleId}/`);
        return response.data;
    } catch (error) {
        console.log("Error while gettings news article:", error);
        throw error;
    }
}