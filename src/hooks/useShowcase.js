import { useState, useEffect, useMemo } from "react";
import { getShowcasedProjects } from "../services/projectService";
import { getShowcasedPortfolios } from "../services/portfolioService";
import { getDummyProjects, getDummyPortfolios } from "../data/dummyData";
import { USE_DUMMY_DATA } from "../config/config";

/**
 * useShowcase hook
 * Fetch all showcased projects and portfolios (public endpoint)
 * Combines and sorts by date
 * @returns {Object} { items, loading, error, refetch, projectsCount, portfoliosCount }
 */
export function useShowcase() {
  const [projects, setProjects] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [portfoliosLoading, setPortfoliosLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [portfoliosError, setPortfoliosError] = useState(null);

  // Fetch showcased projects and portfolios
  useEffect(() => {
    const fetchData = async () => {
      // Fetch projects
      setProjectsLoading(true);
      setProjectsError(null);
      try {
        let projectsData;
        if (USE_DUMMY_DATA) {
          const dummyProjects = await getDummyProjects();
          // Filter dummy data: status === 'deployed' AND is_showcased !== false
          projectsData = (dummyProjects || []).filter(
            (p) => p.status === "deployed" && (p.is_showcased !== false)
          );
        } else {
          const response = await getShowcasedProjects(1, 100);
          // Ensure projectsData is always an array
          if (Array.isArray(response)) {
            projectsData = response;
          } else if (response && Array.isArray(response.projects)) {
            projectsData = response.projects;
          } else {
            projectsData = [];
          }
        }
        // Ensure it's an array before setting
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (err) {
        console.error("Failed to fetch showcased projects:", err);
        setProjectsError(err.message || "Failed to fetch projects");
        setProjects([]);
      } finally {
        setProjectsLoading(false);
      }

      // Fetch portfolios
      setPortfoliosLoading(true);
      setPortfoliosError(null);
      try {
        let portfoliosData;
        if (USE_DUMMY_DATA) {
          const dummyPortfolios = await getDummyPortfolios();
          // Filter dummy data: status === 'deployed' AND is_showcased !== false
          portfoliosData = (dummyPortfolios || []).filter(
            (p) => p.status === "deployed" && (p.is_showcased !== false)
          );
        } else {
          const response = await getShowcasedPortfolios(1, 100);
          // Ensure portfoliosData is always an array
          if (Array.isArray(response)) {
            portfoliosData = response;
          } else if (response && Array.isArray(response.portfolios)) {
            portfoliosData = response.portfolios;
          } else {
            portfoliosData = [];
          }
        }
        // Ensure it's an array before setting
        setPortfolios(Array.isArray(portfoliosData) ? portfoliosData : []);
      } catch (err) {
        console.error("Failed to fetch showcased portfolios:", err);
        setPortfoliosError(err.message || "Failed to fetch portfolios");
        setPortfolios([]);
      } finally {
        setPortfoliosLoading(false);
      }
    };

    fetchData();
  }, []);

  // Combine and sort items
  const items = useMemo(() => {
    // Projects and portfolios are already filtered by backend (showcase endpoint)
    // Just combine and sort

    // Add type field and combine
    const projectsWithType = (projects || []).map((project) => ({
      ...project,
      type: "project",
    }));

    const portfoliosWithType = (portfolios || []).map((portfolio) => ({
      ...portfolio,
      type: "portfolio",
    }));

    // Combine arrays
    const combined = [...projectsWithType, ...portfoliosWithType];

    // Sort by date (newest first)
    combined.sort((a, b) => {
      const dateA = new Date(a.created_at || a.updated_at || 0);
      const dateB = new Date(b.created_at || b.updated_at || 0);
      return dateB - dateA; // Descending order (newest first)
    });

    return combined;
  }, [projects, portfolios]);

  // Combine loading states
  const loading = projectsLoading || portfoliosLoading;

  // Combine error states
  const error = projectsError || portfoliosError;

  // Refetch function
  const refetch = async () => {
    // Re-fetch both projects and portfolios
    setProjectsLoading(true);
    setPortfoliosLoading(true);
    
    try {
      let projectsData, portfoliosData;
      
      if (USE_DUMMY_DATA) {
        const dummyProjects = await getDummyProjects();
        projectsData = (dummyProjects || []).filter(
          (p) => p.status === "deployed" && (p.is_showcased !== false)
        );
        const dummyPortfolios = await getDummyPortfolios();
        portfoliosData = (dummyPortfolios || []).filter(
          (p) => p.status === "deployed" && (p.is_showcased !== false)
        );
      } else {
        const [projectsResponse, portfoliosResponse] = await Promise.all([
          getShowcasedProjects(1, 100),
          getShowcasedPortfolios(1, 100),
        ]);
        // Ensure projectsData is always an array
        if (Array.isArray(projectsResponse)) {
          projectsData = projectsResponse;
        } else if (projectsResponse && Array.isArray(projectsResponse.projects)) {
          projectsData = projectsResponse.projects;
        } else {
          projectsData = [];
        }
        // Ensure portfoliosData is always an array
        if (Array.isArray(portfoliosResponse)) {
          portfoliosData = portfoliosResponse;
        } else if (portfoliosResponse && Array.isArray(portfoliosResponse.portfolios)) {
          portfoliosData = portfoliosResponse.portfolios;
        } else {
          portfoliosData = [];
        }
      }
      
      setProjects(projectsData);
      setPortfolios(portfoliosData);
      setProjectsError(null);
      setPortfoliosError(null);
    } catch (err) {
      console.error("Failed to refetch showcase data:", err);
      setProjectsError(err.message || "Failed to refetch");
      setPortfoliosError(err.message || "Failed to refetch");
    } finally {
      setProjectsLoading(false);
      setPortfoliosLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    refetch,
    projectsCount: projects?.length || 0,
    portfoliosCount: portfolios?.length || 0,
  };
}

