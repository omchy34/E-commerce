import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5673', // Replace with your API base URL
  withCredentials: true, // Allow cookies to be sent with requests
});

export default axiosInstance;
