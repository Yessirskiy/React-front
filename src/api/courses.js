const feedURL = 'api/courses/feed/'

export const getCoursesFeed = async (api, page, page_size, period_start, period_end, english_level, min_age, location) => {
    try {
        let params = {};
        if (period_start)
            params.period_start = period_start;
        if (period_end)
            params.period_end = period_end;
        if (english_level)
            params.english_level = english_level.join(",");
        if (min_age)
            params.min_age = min_age;
        if (location)
            params.location = location;
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