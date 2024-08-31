const meetingURL = 'api/meetings/'
const feedURL = 'api/meetings/feed/'
const calendarURL = 'api/meetings/calendar/'
const overviewURL = 'api/meetings/overview/'
const postReviewURL = 'api/meetings/review/'

export const getMeeting = async (api, id) => {
    try {
        const response = await api.get(`${meetingURL}${id}`);
        return response.data;
    } catch (error) {
        console.log("Error while retrieving meeting:", error);
        throw error;
    }
}

export const getMeetingEvents = async (api, id) => {
    const meetingEventsURL = `api/meetings/${id}/events/`
    try {
        const response = await api.get(meetingEventsURL);
        return response.data;
    } catch (error) {
        console.log("Error while retrieving meeting:", error);
        throw error;
    }
}

export const getMeetingsFeed = async (api, page, page_size, period_start, period_end, english_level) => {
    try {
        let params = {};
        if (period_start)
            params.period_start = period_start;
        if (period_end)
            params.period_end = period_end;
        if (english_level)
            params.english_level = english_level;
        console.log(params);
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