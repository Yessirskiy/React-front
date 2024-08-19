import useAxios from "../utils/UseAxios";

const countriesURL = '/api/location/countries/';
const citiesURL = '/api/location/cities/'

export const getCountries = async (api) => {
    try {
        const response = await api.get(countriesURL);
        return response.data;
    } catch (error) {
        console.log("Error while getting countries list:", error);
        throw error;
    }
}

export const getCityById = async (api, id) => {
    try {
        const response = await api.get(citiesURL + `${id}/`);
        return response.data;
    } catch (error) {
        console.log(`Error while getting city by id (${id}) list:`, error);
        throw error;
    }
}