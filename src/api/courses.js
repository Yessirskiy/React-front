const courseURL = 'api/courses/'
const feedURL = 'api/courses/feed/'

export const getCourse = async (api, id) => {
    try {
        const response = await api.get(`${courseURL}${id}/`);
        return response.data;
    } catch (error) {
        console.log("Error while retrieving course:", error);
        throw error;
    }
}

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
        console.log("Error while gettings courses feed:", error);
        throw error;
    }
}