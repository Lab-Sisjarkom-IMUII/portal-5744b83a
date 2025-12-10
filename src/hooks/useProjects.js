import { useState, useEffect } from "react";
import { getProjectsByOwner } from "../services/projectService";
import { getDummyProjects } from "../data/dummyData";
import { useAuth } from "./useAuth";
import { USE_DUMMY_DATA } from "../config/config";

/**
 * useProjects hook
 * Fetch projects by current user
 * @returns {Object} { projects, loading, error, pagination, refetch }
 */
export function useProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      
      if (USE_DUMMY_DATA) {
        // Use dummy data untuk MVP
        response = await getDummyProjects();
      } else {
        // Use real API
        if (!user?.id) {
          setLoading(false);
          return;
        }
        response = await getProjectsByOwner(user.id, pagination.page, pagination.limit);
      }
      
      // Handle response format
      if (response.projects) {
        setProjects(response.projects);
        setPagination(response.pagination || pagination);
      } else if (Array.isArray(response)) {
        setProjects(response);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(err.message || "Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user?.id, pagination.page, pagination.limit]);

  const refetch = () => {
    fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    pagination,
    refetch,
  };
}

