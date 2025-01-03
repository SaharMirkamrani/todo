import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://frontendtest.ideallco.com/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
