import { apiGet } from "./apiClient";

const BASE_ENDPOINT = "/api/v1/users";

/**
 * Verify JWT token and get user info
 * GET /api/v1/users/verify
 * @returns {Promise<Object>} User data: { authenticated: boolean, user: {...} }
 */
export async function verifyToken() {
  try {
    const response = await apiGet(`${BASE_ENDPOINT}/verify`);
    return response;
  } catch (error) {
    console.error("Token verification failed:", error);
    return {
      authenticated: false,
      user: null,
    };
  }
}

/**
 * Get user info by ID
 * GET /api/v1/users/:id
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User data
 */
export async function getUserInfo(userId) {
  try {
    const user = await apiGet(`${BASE_ENDPOINT}/${userId}`);
    return user;
  } catch (error) {
    console.error("Failed to get user info:", error);
    throw error;
  }
}

