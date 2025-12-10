import { deleteCookie, getCookie } from "./cookie";
import { isTokenValid as checkTokenValid } from "./jwt";

/**
 * Clear authentication token
 */
export function clearAuthToken() {
  deleteCookie("imuii-token");
  
  // Clear from localStorage if exists (optional cleanup)
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("imuii-token");
  }
}

/**
 * Get authentication token
 * @returns {string|null} JWT token or null
 */
export function getAuthToken() {
  return getCookie("imuii-token");
}

/**
 * Check if token is valid
 * @param {string} token - JWT token (optional, will get from cookie if not provided)
 * @returns {boolean} True if token exists and not expired
 */
export function isTokenValid(token = null) {
  const tokenToCheck = token || getAuthToken();
  if (!tokenToCheck) return false;
  return checkTokenValid(tokenToCheck);
}

