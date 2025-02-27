// Importing axios library and a constant for the access token
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Defining the default API URL
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";
// const apiUrl = "import.meta.env.VITE_API_URL";

// Creating an instance of axios with custom configuration
const api = axios.create({
  // Setting the base URL for the API requests
  // It uses an environment variable `VITE_API_URL` if it exists, otherwise falls back to the default `apiUrl`
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Adding a request interceptor to include the Authorization token in the request headers
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (usually set after user login)
    const token = localStorage.getItem(ACCESS_TOKEN);

    // If a token exists, set the Authorization header with the Bearer token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config for the request to proceed
    return config;
  },

  // If there's an error while setting up the request, return a rejected promise with the error
  (error) => {
    return Promise.reject(error);
  }
);

// Export the axios instance for use in other parts of the application
export default api;
