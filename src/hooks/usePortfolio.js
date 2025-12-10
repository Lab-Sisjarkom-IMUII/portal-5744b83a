import { useState, useEffect } from "react";
import { getPortfolioById } from "../services/portfolioService";
import { getDummyPortfolioById } from "../data/dummyData";
import { USE_DUMMY_DATA } from "../config/config";

/**
 * usePortfolio hook
 * Fetch single portfolio by ID
 * @param {string} portfolioId - Portfolio ID
 * @returns {Object} { portfolio, loading, error, refetch }
 */
export function usePortfolio(portfolioId) {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!portfolioId) {
      setLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);

      try {
        const portfolioData = USE_DUMMY_DATA
          ? await getDummyPortfolioById(portfolioId)
          : await getPortfolioById(portfolioId);
        setPortfolio(portfolioData);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setError(err.message || "Failed to fetch portfolio");
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [portfolioId]);

  const refetch = async () => {
    if (!portfolioId) return;

    setLoading(true);
    setError(null);

    try {
      const portfolioData = USE_DUMMY_DATA
        ? await getDummyPortfolioById(portfolioId)
        : await getPortfolioById(portfolioId);
      setPortfolio(portfolioData);
    } catch (err) {
      console.error("Failed to refetch portfolio:", err);
      setError(err.message || "Failed to fetch portfolio");
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    portfolio,
    loading,
    error,
    refetch,
  };
}

