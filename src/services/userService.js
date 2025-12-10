import { apiGet } from "./apiClient";
import { getProjectsByOwner } from "./projectService";
import { getPortfolios } from "./portfolioService";
import { deleteProject } from "./projectService";
import { deletePortfolio } from "./portfolioService";

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

/**
 * Get current user's projects
 * Wrapper for getProjectsByOwner
 * @param {string} userId - User ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 100)
 * @returns {Promise<Object>} Projects data with pagination
 */
export async function getCurrentUserProjects(userId, page = 1, limit = 100) {
  try {
    return await getProjectsByOwner(userId, page, limit);
  } catch (error) {
    console.error("Failed to get current user projects:", error);
    throw error;
  }
}

/**
 * Get current user's portfolios
 * Wrapper for getPortfolios
 * @param {string} userId - User ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 100)
 * @returns {Promise<Object>} Portfolios data with pagination
 */
export async function getCurrentUserPortfolios(userId, page = 1, limit = 100) {
  try {
    return await getPortfolios(userId, page, limit);
  } catch (error) {
    console.error("Failed to get current user portfolios:", error);
    throw error;
  }
}

/**
 * Delete project (re-export from projectService)
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteUserProject(projectId) {
  try {
    return await deleteProject(projectId);
  } catch (error) {
    console.error("Failed to delete user project:", error);
    throw error;
  }
}

/**
 * Delete portfolio (re-export from portfolioService)
 * @param {string} portfolioId - Portfolio ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteUserPortfolio(portfolioId) {
  try {
    return await deletePortfolio(portfolioId);
  } catch (error) {
    console.error("Failed to delete user portfolio:", error);
    throw error;
  }
}

