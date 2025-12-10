import { apiGet, apiPut } from "./apiClient";

const BASE_ENDPOINT = "/api/v1/projects";

/**
 * Get projects by owner
 * GET /api/v1/projects?owner_id=xxx&page=1&limit=10
 * @param {string} ownerId - Owner ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<Object>} Projects data with pagination
 */
export async function getProjectsByOwner(ownerId, page = 1, limit = 10) {
  try {
    const params = new URLSearchParams({
      owner_id: ownerId,
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await apiGet(`${BASE_ENDPOINT}?${params.toString()}`);
    return response;
  } catch (error) {
    console.error("Failed to get projects by owner:", error);
    throw error;
  }
}

/**
 * Get project by ID
 * GET /api/v1/projects/:id
 * @param {string} id - Project ID
 * @returns {Promise<Object>} Project data
 */
export async function getProjectById(id) {
  try {
    const project = await apiGet(`${BASE_ENDPOINT}/${id}`);
    return project;
  } catch (error) {
    console.error("Failed to get project by ID:", error);
    throw error;
  }
}

/**
 * Update project
 * PUT /api/v1/projects/:id
 * @param {string} id - Project ID
 * @param {Object} data - Update data
 * @returns {Promise<Object>} Updated project data
 */
export async function updateProject(id, data) {
  try {
    // Validate data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data format");
    }
    
    const updatedProject = await apiPut(`${BASE_ENDPOINT}/${id}`, data);
    return updatedProject;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
}

/**
 * Get all showcased projects (public endpoint)
 * GET /api/v1/showcase/projects?page=1&limit=100
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 100)
 * @returns {Promise<Object>} Projects data with pagination
 */
export async function getShowcasedProjects(page = 1, limit = 100) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await apiGet(`/api/v1/showcase/projects?${params.toString()}`);
    return response;
  } catch (error) {
    console.error("Failed to get showcased projects:", error);
    throw error;
  }
}

