import { AXIOS } from '../instances/axiosInstance';

const API_URL = 'http://localhost:8080/api/points/';

const getResults = async () => {
    try {
        const response = await AXIOS.get(API_URL);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching results:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const checkPoint = async (coordinate) => {
    try {
        const response = await AXIOS.post(`${API_URL}check`, coordinate);
        return response.data;
    } catch (error) {
        console.error('Error checking coordinates:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const clearResults = async () => {
    try {
        const response = await AXIOS.post(`${API_URL}clear`);
        return response.data;
    } catch (error) {
        console.error('Error clearing results:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const pointService = {
    getResults,
    checkPoint,
    clearResults,
};

export default pointService;
