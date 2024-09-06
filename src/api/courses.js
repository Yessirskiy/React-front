const feedURL = 'api/courses/feed/'

export const getCoursesFeed = async (api, page, page_size, params) => {
    try {
        const response = await api.get(feedURL, { 
            params: {
                page: page,
                page_size: page_size,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error while gettings meetings feed:", error);
        throw error;
    }
}