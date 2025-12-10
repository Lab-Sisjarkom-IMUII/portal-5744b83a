import { apiGet, apiPut, apiDelete } from "./apiClient";

const BASE_ENDPOINT = "/api/v1/portfolios";

/**
 * Get portfolios by user
 * GET /api/v1/portfolios?user_id=xxx&page=1&limit=100
 * @param {string} userId - User ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 100)
 * @returns {Promise<Object>} Portfolios data with pagination
 */
export async function getPortfolios(userId, page = 1, limit = 100) {
  try {
    const params = new URLSearchParams({
      user_id: userId,
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await apiGet(`${BASE_ENDPOINT}?${params.toString()}`);
    return response;
  } catch (error) {
    console.error("Failed to get portfolios:", error);
    throw error;
  }
}

/**
 * Get portfolio by ID
 * GET /api/v1/portfolios/:id
 * @param {string} id - Portfolio ID
 * @returns {Promise<Object>} Portfolio data
 */
export async function getPortfolioById(id) {
  try {
    const portfolio = await apiGet(`${BASE_ENDPOINT}/${id}`);
    return portfolio;
  } catch (error) {
    console.error("Failed to get portfolio by ID:", error);
    throw error;
  }
}

/**
 * Update portfolio
 * PUT /api/v1/portfolios/:id
 * @param {string} id - Portfolio ID
 * @param {Object} data - Update data
 * @returns {Promise<Object>} Updated portfolio data
 */
export async function updatePortfolio(id, data) {
  try {
    // Validate data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data format");
    }
    
    const updatedPortfolio = await apiPut(`${BASE_ENDPOINT}/${id}`, data);
    return updatedPortfolio;
  } catch (error) {
    console.error("Failed to update portfolio:", error);
    throw error;
  }
}

/**
 * Get all showcased portfolios (public endpoint)
 * GET /api/v1/showcase/portfolios?page=1&limit=100
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 100)
 * @returns {Promise<Object>} Portfolios data with pagination
 */
export async function getShowcasedPortfolios(page = 1, limit = 100) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await apiGet(`/api/v1/showcase/portfolios?${params.toString()}`);
    return response;
  } catch (error) {
    console.error("Failed to get showcased portfolios:", error);
    throw error;
  }
}

/**
 * Delete portfolio
 * DELETE /api/v1/portfolios/:id
 * @param {string} id - Portfolio ID
 * @returns {Promise<Object>} Delete response
 */
export async function deletePortfolio(id) {
  try {
    const response = await apiDelete(`${BASE_ENDPOINT}/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to delete portfolio:", error);
    throw error;
  }
}

