const feedURL = 'api/meetings/feed/'
const overviewURL = 'api/meetings/overview'

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

export const getMeetingsOverview = async (api, start_date, end_date) => {
    try {
        const response = await api.get(overviewURL, {
            params: {
                meeting_start_date: start_date,
                meeting_end_date: end_date,
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error while gettings meeting overview:", error);
        throw error;
    }
}