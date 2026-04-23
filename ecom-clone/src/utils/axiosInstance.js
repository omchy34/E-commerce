import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-commerceserver-uu0f.onrender.com', // Replace with your API base URL
  withCredentials: true, // Allow cookies to be sent with requests
});

export default axiosInstance;
