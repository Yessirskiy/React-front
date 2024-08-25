const feedURL = 'api/meetings/feed/'

export const getMeetingsFeed = async (api, page, page_size) => {
    try {
        const response = await api.get(feedURL, { 
            params: {
                page: page,
                page_size: page_size,
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error while gettings meetings feed:", error);
        throw error;
    }
}