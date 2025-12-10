import axios from "axios";
import { getAuthToken, deleteCookie } from "../utils/cookie";
import { redirectToLogin } from "./authService";
import { API_BASE_URL } from "../config/config";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // Important for cookies
});

// Request interceptor - Attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => {
    // Handle success response
    // imuii-server returns: { success: true, data: {...}, message: "..." }
    return response;
  },
  (error) => {
    // Handle error response
    if (error.response) {
      const status = error.response.status;
      
      // 401 Unauthorized - Clear token and redirect to login
      if (status === 401) {
        deleteCookie("imuii-token");
        redirectToLogin(window.location.pathname);
        return Promise.reject(new Error("Unauthorized - Please login again"));
      }
      
      // 403 Forbidden
      if (status === 403) {
        return Promise.reject(new Error(error.response.data?.message || "Forbidden"));
      }
      
      // 500 Server Error
      if (status === 500) {
        return Promise.reject(new Error(error.response.data?.message || "Server error"));
      }
      
      // Other errors
      const errorMessage = error.response.data?.message || error.message || "An error occurred";
      return Promise.reject(new Error(errorMessage));
    }
    
    // Network error
    if (error.request) {
      return Promise.reject(new Error("Network error - Please check your connection"));
    }
    
    // Other errors
    return Promise.reject(error);
  }
);

/**
 * Generic GET request
 * @param {string} url - API endpoint
 * @param {Object} config - Axios config (optional)
 * @returns {Promise} Response data
 */
export async function apiGet(url, config = {}) {
  try {
    const response = await apiClient.get(url, config);
    // Extract data from imuii-server response format
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Generic POST request
 * @param {string} url - API endpoint
 * @param {Object} data - Request body
 * @param {Object} config - Axios config (optional)
 * @returns {Promise} Response data
 */
export async function apiPost(url, data, config = {}) {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Generic PUT request
 * @param {string} url - API endpoint
 * @param {Object} data - Request body
 * @param {Object} config - Axios config (optional)
 * @returns {Promise} Response data
 */
export async function apiPut(url, data, config = {}) {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Generic DELETE request
 * @param {string} url - API endpoint
 * @param {Object} config - Axios config (optional)
 * @returns {Promise} Response data
 */
export async function apiDelete(url, config = {}) {
  try {
    const response = await apiClient.delete(url, config);
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
}

export default apiClient;

