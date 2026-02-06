import { apiGet, apiPut, apiDelete } from "./apiClient";
import { isUUID } from "../utils/slug";

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
 * Get project by name/slug
 * Uses showcase API to search projects, then filters by name
 * Similar to how dashboard filters projects by name
 * @param {string} name - Project name or slug
 * @returns {Promise<Object>} Project data (first match)
 */
export async function getProjectByName(name) {
  try {
    // Use showcase API to get all projects, then filter by name
    const response = await getShowcasedProjects(1, 100);
    
    // Handle different response formats
    let projects = [];
    if (Array.isArray(response)) {
      projects = response;
    } else if (response.projects && Array.isArray(response.projects)) {
      projects = response.projects;
    } else if (response.data && Array.isArray(response.data)) {
      projects = response.data;
    }
    
    // Normalize name for comparison (lowercase, trim)
    const normalizedName = name.toLowerCase().trim();
    const normalizedSlug = normalizedName.replace(/\s+/g, "-");
    
    // Find project by exact name match or slug match
    // Priority: exact match > slug match > partial match
    let project = projects.find((p) => {
      const projectName = (p.showcase_title || p.name || "").toLowerCase().trim();
      const projectSlug = projectName.replace(/\s+/g, "-");
      
      return projectName === normalizedName || projectSlug === normalizedSlug;
    });
    
    // If no exact match, try partial match
    if (!project) {
      project = projects.find((p) => {
        const projectName = (p.showcase_title || p.name || "").toLowerCase().trim();
        const projectSlug = projectName.replace(/\s+/g, "-");
        
        return (
          projectName.includes(normalizedName) ||
          projectSlug.includes(normalizedSlug) ||
          normalizedName.includes(projectName) ||
          normalizedSlug.includes(projectSlug)
        );
      });
    }
    
    if (!project) {
      throw new Error(`Project dengan nama "${name}" tidak ditemukan`);
    }
    
    return project;
  } catch (error) {
    console.error("Failed to get project by name:", error);
    throw error;
  }
}

/**
 * Get project by identifier (ID or name/slug)
 * Tries ID first if UUID format, otherwise tries name/slug
 * @param {string} identifier - Project ID or name/slug
 * @returns {Promise<Object>} Project data
 */
export async function getProjectByIdentifier(identifier) {
  if (!identifier) {
    throw new Error("Identifier is required");
  }

  // Check if it's UUID format (ID)
  if (isUUID(identifier)) {
    // Try as ID first
    try {
      return await getProjectById(identifier);
    } catch (error) {
      // If ID fails, try as name/slug (fallback)
      console.warn("Failed to get project by ID, trying by name:", error);
      try {
        return await getProjectByName(identifier);
      } catch (nameError) {
        // Re-throw original ID error
        throw error;
      }
    }
  } else {
    // Try as name/slug first
    try {
      return await getProjectByName(identifier);
    } catch (error) {
      // If name fails, try as ID (in case it's a non-standard ID format)
      console.warn("Failed to get project by name, trying as ID:", error);
      try {
        return await getProjectById(identifier);
      } catch (idError) {
        // Re-throw original name error
        throw error;
      }
    }
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

/**
 * Delete project
 * DELETE /api/v1/projects/:id
 * @param {string} id - Project ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteProject(id) {
  try {
    const response = await apiDelete(`${BASE_ENDPOINT}/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
}

