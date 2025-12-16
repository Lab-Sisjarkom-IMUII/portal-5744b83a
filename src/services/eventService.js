import { apiGet, apiPost, apiDelete } from "./apiClient";

const BASE_ENDPOINT = "/api/v1/events";

/**
 * Get public list of events
 * GET /api/v1/events
 * @param {Object} options
 * @param {number} [options.page=1]
 * @param {number} [options.limit=25]
 * @param {string} [options.status] - active | upcoming | ended | all
 * @returns {Promise<Object>} Events data with pagination
 */
export async function getEvents({ page = 1, limit = 25, status } = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (status && status !== "all") {
    params.set("status", status);
  }

  const response = await apiGet(`${BASE_ENDPOINT}?${params.toString()}`);

  // Backend bisa mengembalikan langsung array events atau objek dengan field events
  if (Array.isArray(response)) {
    return {
      events: response,
      total: response.length,
      page,
      limit,
    };
  }

  return {
    events: Array.isArray(response?.events) ? response.events : [],
    total: typeof response?.total === "number" ? response.total : (response?.events?.length || 0),
    page: typeof response?.page === "number" ? response.page : page,
    limit: typeof response?.limit === "number" ? response.limit : limit,
  };
}

/**
 * Get public event detail
 * GET /api/v1/events/:id
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Event data
 */
export async function getEventById(id) {
  return apiGet(`${BASE_ENDPOINT}/${id}`);
}

/**
 * Get projects registered in an event (public/user scope)
 * GET /api/v1/events/:id/projects
 * @param {string} id - Event ID
 * @returns {Promise<Array>} Projects in event
 */
export async function getEventProjects(id) {
  const response = await apiGet(`${BASE_ENDPOINT}/${id}/projects`);

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.projects)) {
    return response.projects;
  }

  return [];
}

/**
 * Get events that contain user's projects
 * GET /api/v1/events/my-events
 * @returns {Promise<Array>} Events with my_projects field
 */
export async function getMyEvents() {
  const response = await apiGet(`${BASE_ENDPOINT}/my-events`);

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.events)) {
    return response.events;
  }

  return [];
}

/**
 * Register project to event
 * POST /api/v1/events/:eventId/register
 * @param {string} eventId
 * @param {string} projectId
 * @returns {Promise<Object>}
 */
export async function registerProjectToEvent(eventId, projectId) {
  return apiPost(`${BASE_ENDPOINT}/${eventId}/register`, {
    project_id: projectId,
  });
}

/**
 * Unregister project from event
 * DELETE /api/v1/events/:eventId/projects/:projectId
 * @param {string} eventId
 * @param {string} projectId
 * @returns {Promise<Object>}
 */
export async function unregisterProjectFromEvent(eventId, projectId) {
  return apiDelete(`${BASE_ENDPOINT}/${eventId}/projects/${projectId}`);
}

