const courseURL = 'api/courses/'
const feedURL = 'api/courses/feed/'
const applyURL = 'api/courses/apply/'
const applicationURL = 'api/courses/application/'

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

export const courseApply = async (api, comment, applicant_id, course_id) => {
    try {
        const response = await api.post(applyURL, {
            comment: comment,
            applicant: applicant_id,
            course: course_id,
        });
        return response.data;
    } catch (error) {
        console.log("Error while applying for the course:", error);
        throw error;
    }
}

export const getCourseApplication = async (api, application_id) => {
    try {
        const response = await api.get(`${applicationURL}${application_id}/`);
        return response.data;
    } catch (error) {
        console.log("Error while getting course application:", error);
        throw error;
    }
}