import { useState, useEffect } from "react";
import { getPortfolios } from "../services/portfolioService";
import { getDummyPortfolios } from "../data/dummyData";
import { useAuth } from "./useAuth";
import { USE_DUMMY_DATA } from "../config/config";

/**
 * usePortfolios hook
 * Fetch portfolios by current user
 * @returns {Object} { portfolios, loading, error, pagination, refetch }
 */
export function usePortfolios() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
    total: 0,
  });

  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      
      if (USE_DUMMY_DATA) {
        // Use dummy data untuk MVP
        response = await getDummyPortfolios();
      } else {
        // Use real API
        if (!user?.id) {
          setLoading(false);
          return;
        }
        response = await getPortfolios(user.id, pagination.page, pagination.limit);
      }
      
      // Handle response format
      if (response.portfolios) {
        setPortfolios(response.portfolios);
        setPagination({
          page: typeof response.page === "number" ? response.page : pagination.page,
          limit: typeof response.limit === "number" ? response.limit : pagination.limit,
          total: typeof response.total === "number"
            ? response.total
            : response.pagination?.total || response.portfolios.length || 0,
        });
      } else if (Array.isArray(response)) {
        setPortfolios(response);
        setPagination((prev) => ({
          ...prev,
          total: response.length,
        }));
      } else {
        setPortfolios([]);
        setPagination((prev) => ({ ...prev, total: 0 }));
      }
    } catch (err) {
      console.error("Failed to fetch portfolios:", err);
      setError(err.message || "Failed to fetch portfolios");
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [user?.id, pagination.page, pagination.limit]);

  const refetch = () => {
    fetchPortfolios();
  };

  const setPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(1, page),
    }));
  };

  const setLimit = (limit) => {
    if (!limit || limit <= 0) return;
    setPagination((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  return {
    portfolios,
    loading,
    error,
    pagination,
    refetch,
    setPage,
    setLimit,
  };
}
