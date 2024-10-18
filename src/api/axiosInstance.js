// src/api/axiosInstance.js
import axios from "axios";

// Determine if the app is running in development mode (local) or production (Netlify)
const isDevelopment = process.env.NODE_ENV === "development";

// Set the baseURL dynamically
const axiosInstance = axios.create({
  baseURL: isDevelopment
    ? "http://54.144.76.160:5000/api" // Local API URL for development
    : "/api", // Relative path for Netlify's proxy in production
});

// Interceptors for requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, you can add interceptors for responses to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
