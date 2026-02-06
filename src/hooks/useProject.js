import { useState, useEffect } from "react";
import { getProjectByIdentifier } from "../services/projectService";
import { getDummyProjectById } from "../data/dummyData";
import { USE_DUMMY_DATA } from "../config/config";

/**
 * useProject hook
 * Fetch single project by ID or name/slug
 * @param {string} identifier - Project ID or name/slug
 * @returns {Object} { project, loading, error, refetch }
 */
export function useProject(identifier) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!identifier) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      setError(null);

      try {
        const projectData = USE_DUMMY_DATA
          ? await getDummyProjectById(identifier)
          : await getProjectByIdentifier(identifier);
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
  }, [identifier]);

  const refetch = async () => {
    if (!identifier) return;

    setLoading(true);
    setError(null);

    try {
      const projectData = USE_DUMMY_DATA
        ? await getDummyProjectById(identifier)
        : await getProjectByIdentifier(identifier);
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

