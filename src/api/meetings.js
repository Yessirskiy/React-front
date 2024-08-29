const feedURL = 'api/meetings/feed/'
const calendarURL = 'api/meetings/calendar/'
const overviewURL = 'api/meetings/overview/'
const postReviewURL = 'api/meetings/review/'

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

export const getMeetingsCalendar = async (api, start_date, end_date) => {
    try {
        const response = await api.get(calendarURL, {
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

export const getMeetingsOverview = async (api) => {
    try {
        const response = await api.get(overviewURL);
        return response.data;
    } catch (error) {
        console.log("Error while getting meetings overview", error);
        throw error;
    }
}

export const postMeetingReview = async (api, payload) => {
    try {
        const response = await api.post(postReviewURL, payload);
        return response.data;
    } catch (error) {
        console.log("Error while posting meeting's review:", error);
        throw error;
    }
};