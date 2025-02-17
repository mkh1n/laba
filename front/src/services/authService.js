import { AXIOS } from '../instances/axiosInstance'

const API_URL = 'http://localhost:8080/api/auth';

const signin = async (userData) => {
  try {
    console.log('Attempting to login:', userData);
    const response = await AXIOS.post(`${API_URL}/login`, userData);

    console.log('Login response:', response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("userid", response.data.id);

    window.location.href = '/';

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const register = async (userData) => {
  try {
    console.log('Attempting to register:', userData);
    const response = await AXIOS.post(`${API_URL}/register`, userData);

    console.log('Register response:', response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("userid", response.data.id);

    window.location.href = '/';

    return response.data;
  } catch (error) {
    console.error(error)
    console.error('Register error:', error.response ? error.response.data : error.message);
    throw error
  }
};

const authService = {
  signin,
  register
};

export default authService;
