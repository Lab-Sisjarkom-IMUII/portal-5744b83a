import { useState, useEffect } from "react";
import { getProjectById } from "../services/projectService";
import { getDummyProjectById } from "../data/dummyData";
import { USE_DUMMY_DATA } from "../config/config";

/**
 * useProject hook
 * Fetch single project by ID
 * @param {string} projectId - Project ID
 * @returns {Object} { project, loading, error, refetch }
 */
export function useProject(projectId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      setError(null);

      try {
        const projectData = USE_DUMMY_DATA
          ? await getDummyProjectById(projectId)
          : await getProjectById(projectId);
        setProject(projectData);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Failed to fetch project");
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const refetch = async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const projectData = USE_DUMMY_DATA
        ? await getDummyProjectById(projectId)
        : await getProjectById(projectId);
      setProject(projectData);
    } catch (err) {
      console.error("Failed to refetch project:", err);
      setError(err.message || "Failed to fetch project");
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    project,
    loading,
    error,
    refetch,
  };
}

